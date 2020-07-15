import React, { useState, useEffect, createRef } from 'react'
import styled from '@emotion/styled/macro'

import { Pager } from './Pager'

const Page = styled.div`
  background-color: red;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`

// * ズーム状態を判別するやつ
// * ページの内部を画像に変えて操作感の確認
// * ページ変更する範囲をwindowのサイズから決定するやつ
// * ページングの範囲を指定するやつ

const colors = ['red', 'orange', 'blue']

export const GesturePager = () => {
  const pages = [
    () => {
      return (
        <div style={{ height: '110vh', backgroundColor: 'f5f5f5' }}>
          {' '}
          <p>Hello world</p>
        </div>
      )
    },
    ...[1, 2, 3].map((i) => () => (
      <Page key={i} style={{ backgroundColor: colors[i - 1] }}>
        <img src={`https://dummyimage.com/600x400/060b40/fff&text=page${i}`} />
      </Page>
    )),
  ]
  return <Pager pages={pages} />
}
