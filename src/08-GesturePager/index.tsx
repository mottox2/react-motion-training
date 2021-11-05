import React from 'react'
import styled from "@emotion/styled";

import { Pager } from './Pager'

const Page = styled.div`
  background-color: red;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`

const Image = styled.img`
  pointer-events: none;
  user-select: none;
`

// * ページ変更する範囲をwindowのサイズから決定するやつ
// * 画像のアスペクト比を考慮したドラッグ領域の設定
// * リサイズすする

const colors = ['red', 'orange', 'blue']

export const GesturePager = () => {
  const pages = [
    () => {
      return (
        <div style={{ height: '110vh', backgroundColor: 'f5f5f5' }}>
          {' '}
          <p>Hello スクロールできる画面</p>
        </div>
      )
    },
    ...[1, 2, 3].map((i) => () => (
      <Page key={i} style={{ backgroundColor: colors[i - 1] }}>
        <Image
          src={`https://dummyimage.com/600x400/060b40/fff&text=page${i}`}
        />
      </Page>
    )),
  ]
  return <Pager pages={pages} />
}
