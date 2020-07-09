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

const Target = styled(motion.div)`
  background-color: red;
  width: 300px;
  height: 300px;
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
    console.log(isPinch, state.offset)
    if (isPinch) {
      scale.set(Math.max(state.offset[0] / 100, 1))
      state.event?.stopPropagation()
    }
  })
  const bind2 = useDrag((state) => {
    console.log(state)
    // if ((state.event as any).touches.length === 1)
    //   dragControl.start(state.event!)
    x.set(state.offset[0])
    y.set(state.offset[1])
  })

  const dragControl = useDragControls()

  return (
    <RemoveScroll>
      <PreventDefaultScrollBehavior />
      <Screen {...bind()}>
        <Target
          style={{ x, y, opacity, scale: scale }}
          drag={!isPinch}
          // {...bind2()}
          // onTouchStart={(event: any) => {
          // console.log(event.touches)
          // event.preventDefault()
          // return false
          // if (!isPinch) dragControl.start(event)
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
          // dragControls={dragControl}
          // dragListener={false}
          dragElastic={0.8}
          dragConstraints={{
            top: 0,
            left: 0,
            right: windowSize ? (windowSize.width - 300) / scale.get() : 0,
            bottom: windowSize ? windowSize.height - 300 : 0,
          }}
        />
      </Screen>
    </RemoveScroll>
  )
}
