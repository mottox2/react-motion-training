import React, { useState } from 'react'
import { motion, AnimatePresence, useInvertedScale } from 'framer-motion'
import styled from '@emotion/styled/macro'

import HeroHeader from '../00-components/HeroHeader'
import { Plus } from 'react-feather'

const mainColor = '#F57C00'

const FabWithMotion = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <HeroHeader
        title="FAB with motion"
        description="Floating action button with motion"
        color={mainColor}
      />
      <div style={{ margin: '0 auto', maxWidth: 720 }}>
        <div style={{ margin: 16 }}>
          <Button onClick={() => setOpen(!open)}>Open</Button>
        </div>
      </div>
      <FabScreen isOpen={open} toggleOpen={() => setOpen(!open)}>
        <Header>New Post</Header>
        <div style={{ padding: 16, color: '#333' }}>
          <p>
            Material
            Designにある、FABのモーションを真似したいモチベーションで作ってます。
            色々甘いですが、ちょろちょろ改善していければと思っています。
          </p>
        </div>
      </FabScreen>
    </>
  )
}

const Header = styled.div`
  background-color: #3799de;
  color: white;
  user-select: none;
  height: 58px;
  padding: 0 16px 0 66px;
  font-size: 20px;
  font-weight: bold;
  display: flex;
  align-items: center;
`

const FabScreen: React.FC<{
  isOpen: boolean
  toggleOpen: () => void
}> = ({ isOpen, toggleOpen, children }) => {
  return (
    <>
      <Fab
        transition={{ duration: 0.25 }}
        animate={
          isOpen
            ? {
                width: '100%',
                height: '100%',
                y: 20,
                x: 20,
                borderRadius: 0,
                color: '#fff'
              }
            : {
                width: 60,
                height: 60,
                y: 0,
                x: 0,
                borderRadius: 30,
                color: '#333'
              }
        }
      >
        <IconWrapper
          onClick={toggleOpen}
          animate={{
            rotate: isOpen ? 135 : 0
          }}
          style={{
            zIndex: 20,
            position: 'relative'
          }}
        >
          <Plus />
        </IconWrapper>
        <AnimatePresence>
          {isOpen && <Screen>{children}</Screen>}
        </AnimatePresence>
      </Fab>
    </>
  )
}

const Screen: React.FC = ({ children }) => {
  const inverted = useInvertedScale()
  console.log('invert', inverted)
  return (
    <motion.div
      key="screen"
      animate={{
        y: -60,
        // width: window.innerWidth,
        opacity: 1
      }}
      initial={{
        y: -60,
        // y: 0,
        // width: 60,
        opacity: 0
      }}
      exit={{
        y: -60,
        // y: 0,
        // width: window.innerWidth,
        opacity: 0,
        transition: {
          duration: 0.2
        }
      }}
      style={{
        zIndex: 10,
        ...inverted
      }}
      transition={{
        opacity: { duration: 0.3, delay: 0.2 }
      }}
    >
      {children}
    </motion.div>
  )
}

const Fab = styled(motion.div)`
  position: absolute;
  right: 20px;
  bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
  background-color: white;
`

const IconWrapper = styled(motion.div)`
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity
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

export default FabWithMotion
