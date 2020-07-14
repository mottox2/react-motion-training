import React, { useState, useEffect, createRef } from 'react'
import styled from '@emotion/styled/macro'
import { Global } from '@emotion/core'
import { RemoveScroll } from 'react-remove-scroll'
import { useGesture } from 'react-use-gesture'

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

export const GestureView = () => {
  const [moving, setMoving] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const windowSize = useWindowSize()
  const ref = createRef<HTMLImageElement>()
  const bind = useGesture({
    onWheel: (state) => {
      console.log('wheel', state.offset)
      const [_, _zoom] = state.offset
      const zoom = Math.min(Math.max(0.1, 1 + _zoom / 100), 5)
      ref.current!.style.transform = `scale(${zoom})`
    },
    onDrag: (state) => {
      if (moving) return
      console.log('drag', position, state.offset)
      const { x, y } = position
      const [dx, dy] = state.movement
      ref.current!.style.top = `${y + dy}px`
      ref.current!.style.left = `${x + dx}px`
    },
    onDragEnd: (state) => {
      if (moving) return
      console.log('dragEnd', state)
      const { x, y } = position
      const [dx, dy] = state.movement
      const [vx, vy] = state.vxvy

      ref.current!.style.transition = 'all .2s'
      const goalX = x + dx + vx * 20
      const goalY = y + dy + vy * 20
      ref.current!.style.top = `${goalY}px`
      ref.current!.style.left = `${goalX}px`
      setMoving(true)
      setPosition({ x: goalX, y: goalY })
      console.log(position, state.movement, state.vxvy, { goalX, goalY })
      window.setTimeout(() => {
        setMoving(false)
      }, 200)
    },
    onPinch: (state) => {
      console.log('pinch', state.offset)
      const [_zoom, _] = state.offset
      const zoom = Math.min(Math.max(0.1, 1 + _zoom / 100), 5)
      ref.current!.style.transform = `scale(${zoom})`
    },
    onMouseDown: (e) => {
      e.preventDefault()
    },
  })

  useEffect(() => {
    if (!moving) if (ref.current) ref.current!.style.transition = ''
  }, [moving, ref])

  return (
    <RemoveScroll>
      <PreventDefaultScrollBehavior />
      <Screen {...bind()}>
        <img
          ref={ref}
          alt="hello"
          style={{ position: 'relative' }}
          src="https://images.unsplash.com/photo-1593642532009-6ba71e22f468?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
        />
      </Screen>
    </RemoveScroll>
  )
}
