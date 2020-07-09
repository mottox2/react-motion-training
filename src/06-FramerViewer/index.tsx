import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled/macro'
import { Global } from '@emotion/core'
import { RemoveScroll } from 'react-remove-scroll'
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  useViewportScroll,
  useDragControls,
  PanInfo,
} from 'framer-motion'
import { usePinch, useDrag } from 'react-use-gesture'
import { ZoomIn } from 'react-feather'

const Screen = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Image = styled.div`
  background-color: #3799de;
  color: white;
  height: 400px;
  width: 300px;
  font-size: 20px;
  font-weight: bold;
  position: absolute;
  align-items: center;
  background-image: url(https://www.freedom.co.jp/kurashi/wordpress/wp-content/uploads/2018/12/484_02_02.jpg);
  background-size: cover;
  background-position: -80px center;
`

const Target = styled(motion.img)`
  background-color: red;
  background-size: cover;
`

const PreventDefaultScrollBehavior = () => {
  return (
    <Global
      // https://developers.google.com/web/updates/2017/11/overscroll-behavior
      styles={{
        body: {
          overscrollBehaviorY: 'none',
        },
      }}
    />
  )
}

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<{
    width: number
    height: number
  }>()
  useEffect(() => {
    setWindowSize({
      height: window.innerHeight,
      width: window.innerWidth,
    })
  }, [])

  return windowSize
}

export const FramerViewer = () => {
  const windowSize = useWindowSize()
  const scale = useMotionValue(1)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  // const { scrollYProgress: x } = useViewportScroll()
  const [isPinch, setPinch] = useState(false)
  const input = [-200, 0, windowSize?.width ?? 300]
  const output = [0, 1, 0]
  const opacity = useTransform(x, input, output)
  const bind = usePinch((state) => {
    if (state.first) setPinch(true)
    if (state.last) {
      console.log('end pinch ')
      setPinch(false)
    }
    // console.log(isPinch, state.offset)
    if (isPinch) {
      const nextScale = Math.max(state.offset[0] / 100, 1)
      scale.set(nextScale, true)
      const maxX = ((windowSize?.width || 0) * (nextScale - 1)) / 2
      if (Math.abs(x.get()) > maxX) {
        // NOTE: not work?
        const currentX = x.get()
        const newX = currentX > 0 ? maxX : -1 * maxX
        console.log('invalid set newX', currentX, newX)
        x.set(newX, true)
      }
    }
  })

  // scale.onChange((latest) => {
  //   console.log('new scale', latest)
  //   const maxX = ((windowSize?.width || 0) * (latest - 1)) / 2
  //   if (Math.abs(x.get()) > maxX) {
  //     const currentX = x.get()
  //     const newX = currentX > 0 ? maxX : -1 * maxX
  //     console.log('invalid set newX', currentX, newX)
  //     x.set(newX, true)
  //   }
  // })
  const bind2 = useDrag((state) => {
    console.log(state)
    x.set(state.offset[0])
    y.set(state.offset[1])
  })

  return (
    <RemoveScroll>
      <PreventDefaultScrollBehavior />
      <Screen {...bind()}>
        <Target
          src="https://images.unsplash.com/photo-1593642532009-6ba71e22f468?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
          style={{ x, y, scale }}
          // drag={!isPinch}
          {...bind2()}
          // onTouchStart={(event: any) => {
          // console.log(event.touches)
          // event.preventDefault()
          // return false
          // }}
          // onDragStart={(event: any) => {
          //   console.log(event)
          //   event.preventDefault()
          // }}
          // onDrag={(event: TouchEvent, info: PanInfo) => {
          //   console.log(event, info)
          // }}
          // onPan={(event: any) => {
          //   console.log('pan', event)
          //   // event.preventDefault()
          // }}
          dragElastic={0.2}
          dragConstraints={
            !windowSize
              ? { top: 0, left: 0, right: 0, bottom: 0 }
              : {
                  top: 0,
                  left: Math.min(
                    0,
                    (-1 * (windowSize.width * (scale.get() - 1))) / 2
                  ),
                  right: Math.max(
                    0,
                    (windowSize.width * (scale.get() - 1)) / 2
                  ),
                  bottom: 0,
                }
          }
        />
      </Screen>
    </RemoveScroll>
  )
}
