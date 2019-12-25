import React, { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import styled from '@emotion/styled/macro'
import { ChevronDown } from 'react-feather'

import HeroHeader from '../00-components/HeroHeader'

const AccordionList = styled.ul`
  padding: 20px 16px;
  font-size: 16px;
  max-width: 720px;
  margin: auto;
`

const DetailPage = () => {
  return (
    <>
      <HeroHeader
        title="Accordion"
        description="Theme: Q&amp;A"
        color="#3799de"
      />
      <AccordionList>
        <Accodion label="このサイトはなんのサイトですか？">
          Reactで要素を動かすサンプル集です。
          <br />
          国内でReactを利用する際に、動きに気を使っている人が少ない気がしているので作っています。
        </Accodion>
        <Accodion label="Reactでやる意味は？">
          国外でも使われているライブラリだからです。
          <br />
          今後PWAの流れになった時に、できる表現を増やしたい気持ちもあります。
        </Accodion>
      </AccordionList>
    </>
  )
}

const transition = {
  duration: 0.2
}

const AccodionButton = styled(motion.button)`
  padding: 16px 16px;
  margin: 0 -16px;
  cursor: pointer;
  display: block;
  border: none;
  font-size: 20px;
  width: calc(100% + 32px);
  text-align: left;
  transition: 0.1s background-color ease-in;
  user-select: none;
  background: transparent;
  position: relative;
`

const Container = styled.div`
  border-bottom: 1px solid #eee;
  margin-right: -16px;
  padding-right: 16px;
`

const Contents = styled.div`
  padding: 8px 0 20px;
`

const Icon = styled(ChevronDown)`
  position: absolute;
  right: 16px;
  top: ${16 + 15 - 12}px;
`

const Accodion: React.FC<{
  label: string
}> = ({ label, children }) => {
  const [isOpen, setOpen] = useState(false)
  const toggle = useCallback(() => setOpen(!isOpen), [isOpen])

  return (
    <Container>
      <AccodionButton whileTap={{ scale: 0.98 }} onClick={toggle}>
        {label}
        <Icon
          size={24}
          color="#999"
          style={{
            transition: 'transform .15s',
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)'
          }}
        />
      </AccodionButton>
      <motion.div
        variants={{
          open: { opacity: 1, height: 'auto', scale: 1, transition },
          closed: { opacity: 0, height: 0, transition }
        }}
        initial="closed"
        animate={isOpen ? 'open' : 'closed'}
        style={{
          overflow: 'hidden',
          // height: 0の文字が選択できてしまうためにコンテンツのpointer-eventsを無効にする
          pointerEvents: isOpen ? 'auto' : 'none',
          // safariでコンテンツを選択させないための対応
          WebkitUserSelect: isOpen ? 'auto' : 'none'
        }}
      >
        <Contents>{children}</Contents>
      </motion.div>
    </Container>
  )
}

export default DetailPage
