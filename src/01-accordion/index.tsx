import React, { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import styled from '@emotion/styled/macro'
import { Link } from 'react-router-dom'

const List = styled.ul`
  padding: 20px;
  font-size: 24px;
`

const DetailPage = () => {
  return (
    <List>
      <Accodion label="AA">aaaaaaaa</Accodion>
      <Accodion label="BB">cold</Accodion>
      <Link to="/">Back</Link>
    </List>
  )
}

const transition = {
  duration: 0.2
}

const AccodionButton = styled.button`
  padding: 10px;
  cursor: pointer;
  border: 1px solid #aaa;
`

const Container = styled.div`
  margin-bottom: 20px;
`

const Accodion: React.FC<{
  label: string
}> = ({ label, children }) => {
  const [isOpen, setOpen] = useState(false)
  const toggle = useCallback(() => setOpen(!isOpen), [isOpen])

  return (
    <Container>
      <AccodionButton onClick={toggle}>{label}</AccodionButton>
      <motion.div
        variants={{
          open: { opacity: 1, height: 'auto', transition },
          closed: { opacity: 0, height: 0, transition }
        }}
        initial="closed"
        animate={isOpen ? 'open' : 'closed'}
        style={{
          // height: 0の文字が選択できてしまうためにコンテンツのpointer-eventsを無効にする
          pointerEvents: isOpen ? 'auto' : 'none'
        }}
      >
        {children}
      </motion.div>
    </Container>
  )
}

export default DetailPage
