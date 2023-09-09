import * as React from 'react'
import NextHead from 'next/head'

export function Head(props: {
  title: string
}) {
  return (
    <>
      <NextHead>
        <meta name="title" content="Cusdis - 軽量で、プライバシー重視の、オープンソースコメントシステム" />
        <meta name="description" content="Cusdisはオープンソースで、軽量(~5KB)でプライバシー重視のDiscusの代替ツールです。使い方はとても簡単で、既存のウェブサイトと統合することができます。私たちはあなたとあなたのユーザーを追跡しません。" />
        <meta name="robots" content="noindex,nofollow" />
        <title>
          {props.title}
        </title>
      </NextHead>
    </>
  )
}