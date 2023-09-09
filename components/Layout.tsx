import React, { useCallback, useState } from "react"
import { useMutation, useQuery } from "react-query"
import { useRouter } from "next/router"
import { AiOutlineLogout, AiOutlineSetting, AiOutlineFileText, AiOutlineAlert, AiOutlinePlus, AiOutlineComment, AiOutlineCode, AiOutlineRight, AiOutlineDown, AiOutlineFile, AiOutlineQuestion, AiOutlineQuestionCircle } from 'react-icons/ai'
import { signout, signOut } from "next-auth/client"
import { Anchor, AppShell, Avatar, Badge, Box, Button, Code, Grid, Group, Header, List, Menu, Modal, Navbar, NavLink, Paper, Progress, ScrollArea, Select, Space, Stack, Switch, Text, TextInput, Title } from "@mantine/core"
import Link from "next/link"
import type { ProjectServerSideProps } from "../pages/dashboard/project/[projectId]/settings"
import { modals } from "@mantine/modals"
import { useClipboard, useDisclosure } from '@mantine/hooks';
import { notifications } from "@mantine/notifications"
import { apiClient } from "../utils.client"
import { useForm } from "react-hook-form"
import { MainLayoutData } from "../service/viewData.service"
import { Head } from "./Head"
import dayjs from "dayjs"
import { usageLimitation } from "../config.common"

// From https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
function validateEmail(email) {
  if (email === '') {
    return true
  }
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

const updateUserSettings = async (params: {
  notificationEmail?: string,
  enableNewCommentNotification?: boolean,
  displayName?: string,
}) => {
  const res = await apiClient.put(`/user`, {
    displayName: params.displayName,
    notificationEmail: params.notificationEmail,
    enableNewCommentNotification: params.enableNewCommentNotification,
  })
  return res.data
}

export function MainLayout(props: {
  children?: any,
  id: 'comments' | 'settings'
  project: ProjectServerSideProps,
} & MainLayoutData) {

  const router = useRouter()
  const clipboard = useClipboard()
  const [isUserPannelOpen, { open: openUserModal, close: closeUserModal }] = useDisclosure(false);

  const userSettingsForm = useForm({
    defaultValues: {
      username: props.userInfo.name,
      displayName: props.userInfo.displayName,
      email: props.userInfo.email,
      notificationEmail: props.userInfo.notificationEmail,
    },
  })

  const downgradePlanMutation = useMutation(async () => {
    await apiClient.delete('/subscription')
  }, {
    onSuccess() {
      notifications.show({
        title: '成功',
        message: 'ダウングレードに成功しました',
        color: 'green'
      })
    },
    onError() {
      notifications.show({
        title: 'エラー',
        message: '問題が発生しました',
        color: 'red'
      })
    }
  })

  const updateNewCommentNotification = useMutation(updateUserSettings, {
    onSuccess() {
      notifications.show({
        title: '成功',
        message: 'ユーザー設定が更新されました',
        color: 'green'
      })
    },
    onError() {
      notifications.show({
        title: 'エラー',
        message: '問題が発生しました',
        color: 'red'
      })
    }
  })
  const updateUserSettingsMutation = useMutation(updateUserSettings, {
    onSuccess() {
      notifications.show({
        title: '成功',
        message: 'ユーザー設定が更新されました',
        color: 'green'
      })
    },
    onError() {
      notifications.show({
        title: 'エラー',
        message: '問題が発生しました',
        color: 'red'
      })
    }
  })

  const onClickSaveUserSettings = async () => {
    const data = userSettingsForm.getValues()
    if (!validateEmail(data.notificationEmail)) {
      notifications.show({
        title: 'メールアドレスが無効です',
        message: '有効なメールアドレスを入力してください',
        color: 'red'
      })
      return
    }
    updateUserSettingsMutation.mutate({
      displayName: data.displayName,
      notificationEmail: data.notificationEmail,
    })
  }

  const projectId = router.query.projectId as string

  // should memo
  const ProjectMenu = React.useCallback(() => {
    return <Menu>
      <Menu.Target>
        <Button size='xs' variant={'light'} rightIcon={<AiOutlineDown />}>{props.project.title}</Button>
      </Menu.Target>
      <Menu.Dropdown>
        <Link href="/getting-start" style={{ textDecoration: 'none' }}>
          <Menu.Item icon={<AiOutlinePlus />}>
            New site
          </Menu.Item>
        </Link>
        <Menu.Divider />
        <Menu.Label>
          Sites
        </Menu.Label>
        {props.projects.map(project => {
          return (
            <Menu.Item key={project.id} onClick={_ => {
              location.href = `/dashboard/project/${project.id}`
            }}>
              {project.title}
            </Menu.Item>
          )
        })}
      </Menu.Dropdown>
    </Menu>
  }, [props.project.id])

  const Menubar = React.useMemo(() => {
    const styles = {
      root: {
        borderRadius: 4
      },
      label: {
        fontWeight: 500 as any,
        color: '#343A40'
      },
      icon: {
        color: '#343A40'
      }
    }
    return (
      <Stack>
        <Stack spacing={8} p="sm">
          <Link href={`/dashboard/project/${projectId}`} style={{ textDecoration: 'none' }}>
            <NavLink active={props.id === "comments"} styles={styles} label="コメント" icon={<AiOutlineComment />}>
            </NavLink>
          </Link>
          <Link href={`/dashboard/project/${projectId}/settings`} style={{ textDecoration: 'none' }}>
            <NavLink active={props.id === 'settings'} styles={styles} label="サイト設定" icon={<AiOutlineSetting />}>
            </NavLink>
          </Link>
          <NavLink component="a" href="/doc" target={'_blank'} label="ドキュメント" icon={<AiOutlineFileText />}>
          </NavLink>
        </Stack>

      </Stack>
    )
  }, [])

  const openEmbededCodeModal = React.useCallback(() => {
    const code = `<div id="cusdis_thread"
  data-host="${location.origin}"
  data-app-id="${props.project.id}"
  data-page-id="{{ PAGE_ID }}"
  data-page-url="{{ PAGE_URL }}"
  data-page-title="{{ PAGE_TITLE }}"
></div>
<script async defer src="${location.origin}/js/cusdis.es.js"></script>
`

    modals.openConfirmModal({
      title: "埋め込みコード",
      closeOnConfirm: false,
      labels: {
        cancel: 'キャンセル',
        confirm: 'コピー'
      },
      onConfirm() {
        clipboard.copy(code)
        notifications.show({
          title: 'コピー',
          message: 'コピーされました'
        })
      },
      children: (
        <Stack>
          <Code block>
            {code}
          </Code>
          <Anchor size="sm" href="/doc#/advanced/sdk" target={'_blank'}>
            <Group spacing={4} align='center'>
              <AiOutlineQuestionCircle />
              さらに詳しく
            </Group>
          </Anchor>
        </Stack>
      )
    })
  }, [])

  const badge = React.useMemo(() => {
    if (props.subscription.isActived) {
      return <Badge color="green" size="xs">プロ</Badge>
    }

    if (!props.config.isHosted) {
      return <Badge color="gray" size="xs">OSS</Badge>
    }
    return <Badge color="green" size="xs">無料</Badge>
  }, [])

  const header = React.useMemo(() => {
    return (
      <Group mx="md" sx={{
        height: '100%',
        justifyContent: 'space-between'
      }}>
        <Group>
          <Group>
            <Title order={3} style={{ fontWeight: 'bold' }}>
              <Anchor href="/">
                Cusdis
              </Anchor>
            </Title>
            <ProjectMenu />
          </Group>
          <Group sx={{
            // height: '100%'
          }}>
            <Button leftIcon={<AiOutlineCode />} onClick={openEmbededCodeModal} size="xs" variant={'outline'}>
              埋め込みコード
            </Button>
          </Group>
        </Group>
        <Group spacing={4}>
          <Button onClick={_ => {
            openUserModal()
          }} size="xs" rightIcon={<AiOutlineRight />} variant='subtle'>{props.session.user.name} {badge}</Button>
        </Group>
      </Group>
    )
  }, [])

  const usageBoard = React.useMemo(() => {
    return (
      <>
        <Text size="sm" weight={900}>
          (per month)使用中
        </Text>
        <Stack spacing={4}>
          <Group spacing={4}>
            <Text weight={500} size="sm">サイト:</Text>
            <Text size='sm'>
              {`${props.usage.projectCount} / ${usageLimitation['create_site']}`}
            </Text>
          </Group>
          
          <Group spacing={4}>
            <Text weight={500} size="sm">承認されたコメント:</Text>
            <Text size='sm'>
              {`${props.usage.approveCommentUsage} / ${usageLimitation['approve_comment']}`}
            </Text>
          </Group>
          <Group spacing={4}>
            <Text weight={500} size="sm">クイック承認:</Text>
            <Text size='sm'>
              {`${props.usage.quickApproveUsage} / ${usageLimitation['quick_approve']}`}
            </Text>
          </Group>
        </Stack>
      </>
    )
  }, [])

  return (
    <>
      <Head title={`${props.project.title} - Cusdis`} />
      <AppShell
        fixed={false}
        navbar={<Navbar sx={{
        }} width={{
          base: 240,
        }}>
          {Menubar}
        </Navbar>}
        header={
          <Header height={48}>
            {header}
          </Header>
        }
        styles={{
          body: {
            backgroundColor: '#f5f5f5',
          },
          main: {
            overflow: 'scroll'
          }
        }}
      >
        <Modal opened={isUserPannelOpen} size="lg" onClose={closeUserModal}
          title="ユーザー設定"
        >
          <Stack>
            <Stack spacing={8}>
              <Text weight={500} size="sm">ユーザー名</Text>
              <TextInput defaultValue={props.userInfo.name} size="sm" disabled />
            </Stack>
            <Stack spacing={8}>
              <Text weight={500} size="sm">メールアドレス (ログイン用)</Text>
              <TextInput defaultValue={props.userInfo.email} size="sm" disabled />
            </Stack>
            <Stack spacing={8}>
              <Text weight={500} size="sm">メールアドレス (通知用)</Text>
              <TextInput placeholder={props.userInfo.email} {...userSettingsForm.register("notificationEmail")} size="sm" />
              <Switch defaultChecked={props.userInfo.enableNewCommentNotification} onChange={e => {
                updateNewCommentNotification.mutate({
                  enableNewCommentNotification: e.target.checked
                })
              }} label="Enable notification" />
            </Stack>
            <Stack spacing={8}>
              <Text weight={500} size="sm">表示名</Text>
              <TextInput placeholder={props.userInfo.name} {...userSettingsForm.register("displayName")} size="sm" />
            </Stack>
            {props.config.checkout.enabled && (
              <>
                {usageBoard}
                <Stack spacing={8}>
                  <Text weight={900} size="sm">サブスクリプション </Text>
                  <Grid>
                    <Grid.Col span={6}>
                      <Paper sx={theme => ({
                        border: '1px solid #eaeaea',
                        padding: theme.spacing.md
                      })}>
                        <Stack>
                          <Title order={4}>
                            無料
                          </Title>
                          <List size='sm' sx={{
                          }}>
                            <List.Item>
                              最大1サイトまで
                            </List.Item>
                            <List.Item>
                              10件のクイック承認/月
                            </List.Item>
                            <List.Item>
                              100件のコメント承認/月
                            </List.Item>
                          </List>
                          {!props.subscription.isActived || props.subscription.status === 'cancelled' ? (
                            <Button disabled size="xs">現在のプラン</Button>
                          ) : (
                            <Button size="xs" variant={'outline'} loading={downgradePlanMutation.isLoading} onClick={_ => {
                              if (window.confirm('本当にダウングレードしますか？')) {
                                downgradePlanMutation.mutate()
                              }
                            }}>ダウングレード</Button>
                          )}
                        </Stack>
                      </Paper>
                    </Grid.Col>
                    <Grid.Col span={6}>
                      <Paper sx={theme => ({
                        border: '1px solid #eaeaea',
                        padding: theme.spacing.md
                      })}>
                        <Stack>
                          <Title order={4}>
                            プロ
                          </Title>
                          <List size='sm' sx={{
                          }}>
                            <List.Item>
                              無制限のサイト
                            </List.Item>
                            <List.Item>
                              無制限のクイック承認
                            </List.Item>
                            <List.Item>
                              無制限のコメント承認
                            </List.Item>
                          </List>
                          {props.subscription.isActived ? (
                            <>
                              <Button size="xs" component="a" href={props.subscription.updatePaymentMethodUrl}>支払方法の管理</Button>
                              {props.subscription.status === 'cancelled' && (<Text size='xs' align='center'>有効期限 {dayjs(props.subscription.endAt).format('YYYY/MM/DD')}</Text>)}
                            </>
                          ) : (
                            <Button size='xs' component="a" href={`${props.config.checkout.url}?checkout[custom][user_id]=${props.session.uid}`}>アップグレード $5/月</Button>
                          )}
                        </Stack>
                      </Paper>
                    </Grid.Col>
                  </Grid>
                </Stack>
              </>
            )}
            <Button loading={updateUserSettingsMutation.isLoading} onClick={onClickSaveUserSettings}>保存</Button>
            <Button onClick={_ => signOut()} variant={'outline'} color='red'>
              ログアウト
            </Button>
          </Stack>
        </Modal>
        {props.children}
      </AppShell>
    </>
  )
}
