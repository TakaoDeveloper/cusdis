import React from 'react'
import { signIn } from 'next-auth/client'
import { useRouter } from 'next/router'
import { Footer } from '../components/Footer'
import { Head } from '../components/Head'
import { getSession, resolvedConfig, sentry } from '../utils.server'
import { GetServerSideProps, Redirect } from 'next'
import axios from 'axios'
import { UserSession } from '../service'
import NextHead from 'next/head'
import { Button, Container, Group, Stack, Text, Title, Box, Anchor, Grid, Center, Image, List, Badge, Flex } from '@mantine/core'
import { AiOutlineArrowRight, AiOutlineRight } from 'react-icons/ai'
import { usageLimitation } from '../config.common'

type Props = {
  session: UserSession
}

type Contributer = {
  MemberId: string,
  createdAt: string,
  role: string,
  profile: string
  image: string,
  name: string,
  website?: string
}

const integrations = [
  {
    label: 'Vanilla JS',
    image: '/images/vanilla.png',
    imageWidth: 48,
    link: ''
  },
  {
    label: 'Vue',
    image: '/images/vue.png',
    imageWidth: 48,
    link: 'https://github.com/evillt/vue-cusdis'
  },
  {
    label: 'React',
    image: '/images/react.png',
    imageWidth: 80,
    link: 'https://github.com/Cusdis/sdk/tree/master/packages/react-cusdis'
  },
  {
    label: 'Svelte',
    image: '/images/svelte.svg',
    imageWidth: 96,
    link: '#'
  },
  {
    label: 'Docsify',
    image: '/images/docsify.svg',
    imageWidth: 48,
    link: '/doc#/integration/docsify'
  },
  {
    label: 'Hexo',
    image: '/images/hexo.svg',
    imageWidth: 48,
    link: 'http://blog.cusdis.com/integate-cusdis-in-hexo/'
  }
]

function IndexPage({ session }: Props) {
  const router = useRouter()

  const StartButton = session ? (
    <Button
      rightIcon={<AiOutlineArrowRight />}
      onClick={() => router.push('/dashboard')}
      color="gray.700"
    >
      ダッシュボード
    </Button>
  ) : (
    <Button
      onClick={() =>
        signIn(null, { callbackUrl: `${location.origin}/dashboard` })
      }
    >
      無料で始める
    </Button>
  )

  return (
    <Box className="">
      <Head title="Cusdis - 軽量で、プライバシー重視の、オープンソースコメントシステム" />
      <NextHead>
        {/* <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&display=swap" rel="stylesheet" /> */}
      </NextHead>
      <Container mt={120}>
        <Stack spacing={48}>
          <Stack>
            <Box component='h1' sx={theme => ({
              lineHeight: 1.1,
              fontSize: 62,
              fontWeight: 800,
              margin: 0
            })}>
              <Text variant={'gradient'} gradient={{ from: "blue", to: "cyan" }} component="span" inherit>軽量で、プライバシー重視の、オープンソースの</Text>コメントシステム
              {/* <Text>for your blog</Text> */}
            </Box>
            <Text color="gray">
              <strong>Cusdis</strong> はオープンソースで、軽量(~5KB)でプライバシー重視の <strong>Discusの代替ツール</strong> 使い方はとても簡単で、既存のウェブサイトと統合することができます。私たちはあなたとあなたのユーザーを追跡しません。
            </Text>
          </Stack>
          <Center>
            <Stack mt={12}>
              <Group spacing={24}>
                {StartButton}

                <Button variant={'outline'} component='a' target={'_blank'} href="/doc">
                ドキュメント
                </Button>

                <Anchor href="#pricing" weight={500}>価格</Anchor>

                {/* <Anchor weight={500}>Pricing</Anchor> */}
              </Group>
            </Stack>
          </Center>

          <Stack mt={24}>
            <Image src="/images/intro-dashboard-2.png" />
          </Stack>

          <Title order={1} my={96} align='center'>特徴</Title>

          <Grid gutter={64}>
            <Grid.Col span={6}>
              <Stack>
                <Image src="/images/intro-widget.png" w="100%" />
                <Stack spacing={8}>
                  <Title order={4}>
                  軽量
                  </Title>
                  <Text>
                  ウェブサイトに埋め込むJavaScript SDKはわずか5KBです。 i18n、ダークモードを内蔵しています。
                  </Text>
                </Stack>
              </Stack>
            </Grid.Col>

            <Grid.Col span={6}>
              <Stack>
                <Image src="/images/intro-email.png" w="100%" />
                <Stack spacing={8}>
                  <Title order={4}>
                    メール通知
                  </Title>
                  <Text>
                    新しいコメントが投稿されるとメールで通知され、クイック承認ができます。
                  </Text>
                </Stack>
              </Stack>
            </Grid.Col>

            <Grid.Col span={6}>
              <Stack>
                <Image src="/images/intro-approval.png" w="100%" />
                <Stack spacing={8}>
                  <Title order={4}>
                    クイック承認
                  </Title>
                  <Text>
                    通知メールとウェブフックには、ダッシュボードにログインせずに新しいコメントを承認/返信するためのリンクが短時間で表示されます。すべての作業はモバイルで行えます。
                  </Text>
                </Stack>
              </Stack>
            </Grid.Col>

            <Grid.Col span={6}>
              <Stack>
                <Image src="/images/intro-bot.png" w="100%" />
                <Stack spacing={8}>
                  <Title order={4}>
                    Webhook
                  </Title>
                  <Text>
                  Webhook URLを設定することで、ウェブサイトに新着コメントがあった際にトリガーされます。
                  </Text>
                  <Anchor href="/doc#/advanced/webhook" sx={{
                    textDecoration: 'underline'
                  }}>Webhookの使い方</Anchor>
                </Stack>
              </Stack>
            </Grid.Col>

          </Grid>
        </Stack>
      </Container>

      <Box>
        <Title id="pricing" order={1} align='center' my={96}>価格</Title>
        <Flex
          gap="lg"
          justify={'center'}
        >
          <Stack sx={{
            border: '1px solid #eee',
            padding: 24,
            borderRadius: 12
          }} >
            <Title order={3}>自己ホスト</Title>
            <Box>
              <Badge>無料</Badge>
            </Box>
            <List listStyleType={'none'} sx={{
            }} size="sm">
              <List.Item>すべての機能。しかし、あなた自身のサーバーとデータベース上でホストしています。</List.Item>
            </List>
            <Button component="a" href="/doc" target={'_blank'}>ドキュメント</Button>
          </Stack>

          <Stack sx={{
            border: '1px solid #eee',
            padding: 24,
            borderRadius: 12
          }}>
            <Title order={3}>クラウド</Title>
            <Box>
              <Badge>無料</Badge>
            </Box>
            <List sx={{
            }} size="sm">
              <List.Item>{usageLimitation['create_site']} サイト</List.Item>
              <List.Item>{usageLimitation['approve_comment']} 承認コメント／月</List.Item>
              <List.Item>{usageLimitation['quick_approve']} クイック承認／月</List.Item>
            </List>
            <Button component="a" href="/dashboard" target={'_blank'}>無料で始める</Button>
          </Stack>

          <Stack sx={{
            border: '1px solid #eee',
            padding: 24,
            borderRadius: 12
          }}>
            <Title order={3}>クラウドプロ</Title>
            <Box>
              <Badge>5ドル／月</Badge>
            </Box>
            <List sx={{
            }} size="sm">
              <List.Item>サイト数無制限</List.Item>
              <List.Item>承認コメント無制限</List.Item>
              <List.Item>クイック承認無制限</List.Item>
            </List>
            <Button component="a" href="/dashboard" target={'_blank'}>無料で始める</Button>
          </Stack>
        </Flex>
      </Box>

      <Box my={96}>
        <Footer maxWidth="3xl" />
      </Box>
    </Box>
  )
}

export const getServerSideProps: GetServerSideProps<Props> | Redirect = async (ctx) => {
  const session = await getSession(ctx.req)

  if (!resolvedConfig.isHosted && !session) {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false,
      }
    }
  }

  let contributers = [] as Contributer[]

  return {
    props: {
      session,
    },
  }
}

export default IndexPage
