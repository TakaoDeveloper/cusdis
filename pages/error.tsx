import { Text } from '@mantine/core'

export enum ErrorCode {
  INVALID_TOKEN = 'INVALID_TOKEN'
}

function ErrorPage({
  errorCode
}: {
  errorCode: ErrorCode | null
}) {

  const info = (() => {
    switch (errorCode) {
      case ErrorCode.INVALID_TOKEN:
        return <Text>無効なトークン</Text>
      default:
        return <Text>問題が発生しました</Text>
    }
  })()

  return (
    <>
      {info}
    </>
  )
}

export async function getServerSideProps(ctx) {
  return {
    props: {
      errorCode: ctx.query.code || null
    }
  }
}

export default ErrorPage