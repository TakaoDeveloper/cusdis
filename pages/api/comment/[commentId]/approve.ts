import { NextApiRequest, NextApiResponse } from 'next'
import { UsageLabel, usageLimitation } from '../../../../config.common'
import { AuthService } from '../../../../service/auth.service'
import { CommentService } from '../../../../service/comment.service'
import { SubscriptionService } from '../../../../service/subscription.service'
import { UsageService } from '../../../../service/usage.service'
import { getSession } from '../../../../utils.server'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const commentService = new CommentService(req)
  const authService = new AuthService(req, res)
  const usageService = new UsageService(req)
  const session = await getSession(req)

  const subscriptionService = new SubscriptionService()

  if (req.method === 'POST') {
    const commentId = req.query.commentId as string

    // only project owner can approve
    const project = await commentService.getProject(commentId)
    if (!(await authService.projectOwnerGuard(project))) {
      return
    }

    // check usage
    if (!await subscriptionService.approveCommentValidate(session.uid)) {
      res.status(402).json({
        error:
          `無料プランのコメント承認数が上限に達しました（${usageLimitation['approve_comment']}/月）。より多くのコメントを承認するには、Proプランにアップグレードしてください。`,
      })
      return
    }

    await commentService.approve(commentId)
    await usageService.incr(UsageLabel.ApproveComment)

    res.json({
      message: 'success',
    })
  }
}
