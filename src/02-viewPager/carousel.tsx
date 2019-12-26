import React, { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import styled from '@emotion/styled/macro'

import HeroHeader from '../00-components/HeroHeader'

const Items = styled(motion.ul)`
  padding: 20px 16px;
  font-size: 16px;
  margin: auto;
  white-space: nowrap;
`

const ItemsContainer = styled.div`
  overflow: hidden;
`

const DetailPage = () => {
  return (
    <>
      <HeroHeader
        color="#e88a15"
        title="ViewPager"
        description="Theme: swipe pager"
      />
      <ItemsContainer>
        <Items
          drag="x"
          dragConstraints={{ left: -200 * 4, right: 0 }}
          onDragEnd={(event, info) => {
            console.log(info)
          }}
        >
          <Item label="このサイトはなんのサイトですか？">
            Reactで要素を動かすサンプル集です。
            <br />
            国内でReactを利用する際に、動きに気を使っている人が少ない気がしているので作っています。
          </Item>
          <Item label="Reactでやる意味は？">
            国外でも使われているライブラリだからです。
            <br />
            今後PWAの流れになった時に、できる表現を増やしたい気持ちもあります。
          </Item>
          <Item label="Reactでやる意味は？">
            国外でも使われているライブラリだからです。
            <br />
            今後PWAの流れになった時に、できる表現を増やしたい気持ちもあります。
          </Item>
          <Item label="Reactでやる意味は？">
            国外でも使われているライブラリだからです。
            <br />
            今後PWAの流れになった時に、できる表現を増やしたい気持ちもあります。
          </Item>
          <Item label="Reactでやる意味は？">
            国外でも使われているライブラリだからです。
            <br />
            今後PWAの流れになった時に、できる表現を増やしたい気持ちもあります。
          </Item>
          <Item label="Reactでやる意味は？">
            国外でも使われているライブラリだからです。
            <br />
            今後PWAの流れになった時に、できる表現を増やしたい気持ちもあります。
          </Item>
        </Items>
      </ItemsContainer>
    </>
  )
}

const Container = styled.div`
  width: calc(100vw - 32px);
  padding: 16px;
  display: inline-block;
  background-color: #ffeedc;
  border-radius: 4px;
  margin-right: 16px;
  white-space: normal;
`

const Item: React.FC<{
  label: string
}> = ({ label, children }) => {
  return <Container>{children}</Container>
}

export default DetailPage
