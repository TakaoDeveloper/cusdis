import { Container, Stack, Title, Text, Divider, Textarea, Box, Button, Anchor } from "@mantine/core"
import { notifications } from "@mantine/notifications"
import { Comment, Page, Project } from "@prisma/client"
import { useRouter } from "next/router"
import React from "react"
import { useMutation } from "react-query"
import { Head } from "../../components/Head"
import { CommentService } from "../../service/comment.service"
import { SecretKey, TokenService } from "../../service/token.service"
import { apiClient } from "../../utils.client"
import { prisma } from "../../utils.server"
import { ErrorCode } from "../error"

const approveComment = async ({ token }) => {
  const res = await apiClient.post(`/open/approve?token=${token}`)
  return res.data
}

const appendReply = async ({ replyContent, token }) => {
  const res = await apiClient.post(`/open/approve?token=${token}`, {
    replyContent
  })
  return res.data
}

function ApprovePage(props: {
  comment: Comment & {
    page: Page & {
      project: Project
    }
  }
}) {

  const router = useRouter()

  const [replyContent, setReplyContent] = React.useState('')

  const appendReplyMutation = useMutation(appendReply, {
    onSuccess() {
      notifications.show({
        title: '成功',
        message: '返信を追加しました',
        color: 'green'
      })
      setReplyContent('')
    },
    onError(data: any) {
      const {
        error: message,
        status: statusCode
      } = data.response.data

      notifications.show({
        title: "エラー",
        message,
        color: 'yellow'
      })
    }
  })
  const approveCommentMutation = useMutation(approveComment, {
    onSuccess() {
      notifications.show({
        title: '成功',
        message: '返信を追加しました',
        color: 'green'
      })

      location.reload()
    },
    onError(data: any) {
      const {
        error: message,
        status: statusCode
      } = data.response.data

      notifications.show({
        title: "エラー",
        message,
        color: 'yellow'
      })
    }
  })

  return (
    <>
      <Head title="新しいコメント - Cusdis" />
      <Container mt={12} my={12}>
        <Stack>
          <Title mb={12}>
            Cusdis
          </Title>

          <Stack spacing={4}>
            <Text><strong>{props.comment.page.project.title}</strong> の <Anchor weight={'bold'} target="_blank" href={props.comment.page.url}>{props.comment.page.title || props.comment.page.slug}</Anchor>ページに新しいコメントが投稿されました</Text>
            <Text>送信者: <strong>{props.comment.by_nickname}</strong> ({props.comment.by_email || 'Email not provided'})</Text>
            <Text sx={theme =>({
              whiteSpace: 'pre-wrap',
              backgroundColor: theme.colors.gray[0],
              padding: theme.spacing.md
            })} component='pre' w="full" size="sm">{props.comment.content}</Text>
          </Stack>

          <Box>
            {
              props.comment.approved ? <Button disabled>承認</Button> : <Button onClick={_ => {
                approveCommentMutation.mutate({
                  token: router.query.token as string
                })
              }} loading={approveCommentMutation.isLoading} color="telegram">
                承認
              </Button>
            }
          </Box>

          <Divider my={24} />

          <Stack>
            <Textarea placeholder="あなたのコメント" value={replyContent} onChange={e => setReplyContent(e.target.value)}></Textarea>
            <Text size="sm" color="gray">* コメントへの返信を追加すると、コメントは自動的に承認されます。</Text>

            <Button onClick={_ => {
              appendReplyMutation.mutate({
                token: router.query.token as string,
                replyContent
              })
            }} loading={appendReplyMutation.isLoading} mt={4}>返信を追加する</Button>
          </Stack>

        </Stack>


      </Container>
    </>
  )
}

function redirectError(code: ErrorCode) {
  return {
    redirect: {
      destination: `/error?code=${code}`,
      permanent: false
    }
  }
}

export async function getServerSideProps(ctx) {

  const tokenService = new TokenService()
  const commentService = new CommentService(ctx.req)

  const { token } = ctx.query

  if (!token) {
    return redirectError(ErrorCode.INVALID_TOKEN)
  }

  let commentId

  try {
    commentId = tokenService.validate(token, SecretKey.ApproveComment).commentId
  } catch (e) {
    return redirectError(ErrorCode.INVALID_TOKEN)
  }

  const comment = await prisma.comment.findUnique({
    where: {
      id: commentId
    },
    select: {
      by_nickname: true,
      by_email: true,
      content: true,
      approved: true,
      page: {
        select: {
          title: true,
          slug: true,
          url: true,
          project: {
            select: {
              title: true
            }
          }
        }
      }
    }
  })

  return {
    props: {
      comment
    }
  }
}

export default ApprovePage