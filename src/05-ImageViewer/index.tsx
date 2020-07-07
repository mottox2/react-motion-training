import React, { useState, useEffect } from 'react'
import { useSpring, animated, config } from 'react-spring'
import * as easings from 'd3-ease'
import { useGesture } from 'react-use-gesture'
import styled from '@emotion/styled/macro'
import { Global } from '@emotion/core'
import { RemoveScroll } from 'react-remove-scroll'

const Image = styled(animated.div)`
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

const Screen = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
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

export const ImageViewer = () => {
  const windowSize = useWindowSize()

  const [{ x, y, zoom }, set] = useSpring(() => ({
    x: 0,
    y: 0,
    zoom: 1,
    easing: easings.easeCircleOut,
    config: {
      mass: 1,
      tension: 320,
      friction: 22,
    },
  }))

  const bind = useGesture(
    {
      onPinch: (state) => {
        console.log('pinch', state.offset)
        const [d, a] = state.offset
        set({ zoom: d / 100 })
      },
      onDrag: ({ previous, down, movement, offset, initial, xy, last }) => {
        console.log(xy, initial, movement, offset, last)
        set({ x: offset[0], y: offset[1], immediate: false })
        // setPosition({ x: startX + movement[0], y: startY + movement[1] })
      },
    },
    {
      pinch: {
        distanceBounds: { min: 100, max: 600 },
        rubberband: 0.2,
      },
      drag: {
        bounds: {
          top: 0,
          bottom: windowSize ? windowSize.height - 400 : 0,
          left: 0,
          right: windowSize ? windowSize.width - 300 : 0,
        },
        rubberband: 1,
      },
    }
  )

  return (
    <RemoveScroll>
      <PreventDefaultScrollBehavior />
      <Screen {...bind()}>
        <Image style={{ x, y, scale: zoom }} />
      </Screen>
    </RemoveScroll>
  )
}
