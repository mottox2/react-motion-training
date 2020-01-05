import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styled from '@emotion/styled/macro'
import { RemoveScroll } from 'react-remove-scroll'
import Portal from '../00-components/Portal'

import HeroHeader from '../00-components/HeroHeader'
import { Global, css } from '@emotion/core'

const mainColor = '#00796B'

const DetailPage = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Global
        styles={css`
          html,
          body {
            height: 100%;
          }
        `}
      />
      <HeroHeader
        title="BottomSheet"
        description="Material Design Sheet"
        color={mainColor}
      />
      <div style={{ margin: 16 }}>
        <Button onClick={() => setOpen(true)}>Open</Button>
      </div>
      <BottomSheet
        isOpen={open}
        requestClose={() => {
          console.log('wil close')
          setOpen(false)
        }}
      >
        <div style={{ paddingTop: 8, paddingBottom: 8 }}>
          <Row>Share</Row>
          <Row>Get link</Row>
          <Row>Edit name</Row>
          <Row>Other Apps</Row>
        </div>
      </BottomSheet>
    </>
  )
}

const Row = styled.div`
  padding: 16px 16px;
`

const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity
}

const BottomSheet: React.FC<{
  isOpen: boolean
  requestClose: () => void
}> = ({ isOpen, children, requestClose }) => {
  console.log(isOpen)
  return (
    <Portal>
      <RemoveScroll enabled={isOpen}>
        <AnimatePresence initial={true}>
          {isOpen && (
            <Overlay
              initial={{
                opacity: 0
              }}
              animate={{
                opacity: 1
              }}
              exit={{
                opacity: 0
              }}
              transition={{
                opacity: { duration: 0.2 }
              }}
              onClick={() => requestClose()}
              key="overlay"
            />
          )}
          {isOpen && (
            <Container
              key="sheet"
              drag="y"
              dragConstraints={{
                top: 0,
                bottom: 0
              }}
              initial={{
                y: '100%',
                opacity: 0
              }}
              animate={{
                y: 0,
                opacity: 1
              }}
              exit={{
                y: '100%',
                opacity: 0
              }}
              transition={{
                y: { type: 'spring', stiffness: 300, damping: 200 },
                opacity: { duration: 0.2 }
              }}
              onDragEnd={(e, info) => {
                const { offset, velocity } = info
                const swipe = swipePower(offset.y, velocity.y)
                console.log(swipe)
                if (swipe > 50000) {
                  requestClose()
                }
              }}
            >
              {children}
            </Container>
          )}
        </AnimatePresence>
      </RemoveScroll>
    </Portal>
  )
}

const Button = styled.button`
  display: block;
  background-color: ${mainColor};
  color: white;
  border: none;
  width: 100%;
  font-size: 16px;
  padding: 12px;
`

const Container = styled(motion.div)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fafafa;
`

const Overlay = styled(motion.div)`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.5);
`

export default DetailPage
