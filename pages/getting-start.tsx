import { Box, Container, Stack, Title, Text, Button, TextInput, Image } from "@mantine/core"
import { notifications } from "@mantine/notifications"
import router from "next/router"
import React from "react"
import { useMutation } from "react-query"
import { Head } from "../components/Head"
import { ProjectService } from "../service/project.service"
import { apiClient } from "../utils.client"
import { getSession } from "../utils.server"

export const createProject = async (body: { title: string }) => {
  const res = await apiClient.post("/projects", {
    title: body.title,
  })
  return res.data
}

function GettingStart() {
  const createProjectMutation = useMutation(createProject)
  const titleInputRef = React.useRef<HTMLInputElement>(null)


  async function onClickCreateProject() {
    if (!titleInputRef.current.value) {
      return
    }

    await createProjectMutation.mutate(
      {
        title: titleInputRef.current.value,
      },
      {
        onSuccess(data) {
          notifications.show({
            title: "プロジェクトが作成されました",
            message: "ダッシュボードへのリダイレクトしています",
            color: 'green'
          })
          router.push(`/dashboard/project/${data.data.id}`, null, {
            shallow: true,
          })
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
      }
    )
  }

  return (
    <>
      <Head title="新しいサイトを追加 - Cusdis" />
      <Container mt={120}>

        <Stack>
          <Image width={48} src="/images/artworks/logo-256.png" mb="16">
          </Image>
          <Stack spacing={4}>
            <Title order={2} weight={500}>
              新しいサイトを作りましょう
            </Title>
            <Text color="gray">
              あなたのサイトに名前をつければ、Cusdisを使い始めることができます。
            </Text>
          </Stack>

          <Stack spacing={8}>
            <Text>
              サイト名
            </Text>
            <TextInput placeholder="私の個人的なブログ" ref={titleInputRef} />
          </Stack>

          <Box>
            <Button onClick={_ => void onClickCreateProject()} loading={createProjectMutation.isLoading} color="blue">作成</Button>
          </Box>
        </Stack>
      </Container>
    </>
  )
}

export async function getServerSideProps(ctx) {

  const session = await getSession(ctx.req)

  if (!session) {
    return {
      redirect: {
        destination: '/api/auth/signin',
        permanent: false
      }
    }
  }

  // const projectService = new ProjectService(ctx.req)

  // const defaultProject = await projectService.getFirstProject(session.uid, {
  //   select: {
  //     id: true
  //   }
  // })

  // if (defaultProject) {
  //   // redirect to project dashboard
  //   return {
  //     redirect: {
  //       destination: `/dashboard/project/${defaultProject.id}`,
  //       permanent: false
  //     }
  //   }
  // }

  return {
    props: {

    }
  }
}

export default GettingStart