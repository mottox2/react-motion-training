import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styled from '@emotion/styled/macro'

import HeroHeader from '../00-components/HeroHeader'

// https://codesandbox.io/s/framer-motion-image-gallery-pqvx3

// const colors = ['red', 'yellow', 'blue', 'purple', 'black', 'white', 'gray']
const colors: string[] = []

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0
  })
}

const swipeConfidenceThreshold = 10000
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity
}

const PagerContainer = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`

const PrevPage = styled.div`
  position: absolute;
  left: -100vw;
  background-color: #aaa;
  width: 100%;
  top: 0;
`

const NextPage = styled.div`
  position: absolute;
  right: -100vw;
  background-color: #aaa;
  width: 100%;
  top: 0;
`

const DetailPage = () => {
  const [[page, direction], setPage] = useState([0, 0])

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection])
  }

  return (
    <>
      <HeroHeader
        color="#e88a15"
        title="ViewPager"
        description="Theme: swipe pager"
      />
      <PagerContainer>
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={page}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 200 },
              opacity: { duration: 0.2 }
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, info) => {
              console.log(info)
              const { offset, velocity } = info
              const swipe = swipePower(offset.x, velocity.x)

              if (swipe < -swipeConfidenceThreshold) {
                console.log('next', direction)
                paginate(1)
              } else if (swipe > swipeConfidenceThreshold) {
                console.log('prev', direction)
                paginate(-1)
              }
            }}
            style={{
              padding: '60px 30px',
              backgroundColor: colors[page] || '#f5f5f5',
              position: 'absolute',
              top: 0,
              width: '100vw'
            }}
          >
            {/* <PrevPage>card{page - 1}</PrevPage> */}
            <div>Page{page}</div>
            {/* <NextPage>card{page + 1}</NextPage> */}
          </motion.div>
        </AnimatePresence>
      </PagerContainer>
    </>
  )
}

export default DetailPage
