import React, { useState, useCallback, createRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import styled from '@emotion/styled'

const Container = styled(motion.div)`
  width: 100%;
`
type SliderState = [number, number]

const Tabs = styled.ul`
  border-bottom: 1px solid #eee;
  display: flex;
`

const Tab = styled.li`
  padding: 12px;
  cursor: pointer;
`

const Slides = styled.div`
  overflow: hidden;
  width: 100%;
`

const Scroller = styled(motion.div)`
  color: black;
`

const Page = styled.div`
  width: 100%;
  float: left;
  padding: 30px;
  box-sizing: border-box;
`

// const width = 600

const Slider: React.FC = ({ children }) => {
  const [[current, direction], setCurrent] = useState<SliderState>([0, 0])
  const length = Array.isArray(children) ? children.length : 0
  const containerRef = createRef<HTMLDivElement>()
  const [width, setWidth] = useState(0)

  useEffect(() => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth
      console.log(containerWidth)
      setWidth(containerWidth)
    }
  }, [])

  const paginate = useCallback(
    (newDirection: number) => {
      const next = Math.min(Math.max(0, current + newDirection), length - 1)
      console.log({ next, newDirection })
      setCurrent([next, newDirection])
    },
    [current, length]
  )

  const slideTo = useCallback((num: number) => {
    setCurrent([num, 1])
  }, [])

  const pos = current * width * -1

  console.log(width, current, pos)
  if (!children) return null
  if (!Array.isArray(children)) return null
  return (
    <Container ref={containerRef}>
      <div style={{ maxWidth: width }}>
        <Tabs>
          {children.map((_, i) => (
            <Tab
              style={{
                borderBottom: '2px solid blue',
                borderColor: current === i ? 'blue' : 'transparent',
              }}
              key={i}
              onClick={() => slideTo(i)}
            >
              Page{i}
            </Tab>
          ))}
        </Tabs>
        <Slides>
          <Scroller
            drag="x"
            dragConstraints={{
              left: pos,
              right: pos,
            }}
            dragElastic={1}
            animate={{
              x: pos,
            }}
            transition={{
              x: {
                type: 'spring',
                stiffness: 300,
                damping: 200,
              },
              opacity: { duration: 0.2 },
            }}
            onDragEnd={(e, info) => {
              const { offset, velocity } = info
              const swipe = swipePower(offset.x, velocity.x)

              if (swipe < -swipeConfidenceThreshold) {
                paginate(1)
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1)
              }
            }}
            style={{
              width: width * length,
            }}
          >
            {children.map((child, i) => {
              return (
                <Page style={{ width }} key={i}>
                  {child}
                </Page>
              )
            })}
          </Scroller>
        </Slides>
      </div>
    </Container>
  )
}
const swipeConfidenceThreshold = 10000
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity
}

export default Slider
