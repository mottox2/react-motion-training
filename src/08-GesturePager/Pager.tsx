import React, { useState, useEffect, createRef, useMemo } from 'react'
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

const Page = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
`

const PrevPage = styled(Page)`
  left: -100%;
`
const CurrentPage = styled(Page)`
  left: 0;
`
const NextPage = styled(Page)`
  left: 100%;
`

export const Pager = ({ pages }: any) => {
  const [current, setCurrent] = useState(0)
  const [moving, setMoving] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const windowSize = useWindowSize()
  const ref = createRef<HTMLDivElement>()
  const bind = useGesture(
    {
      onDrag: (state) => {
        if (state.tap) return // tap
        console.log('drag', state.swipe, state.movement, state.direction, state)
        const [dx, dy] = state.movement
        ref.current!.style.transform = `translateX(${dx}px)`
      },
      onDragEnd: (state) => {
        const dx = state.movement[0]
        console.log(dx)
        if (dx < -100) {
          ref.current!.style.transform = `translateX(${
            windowSize!.width * -1
          }px)`
          ref.current!.style.transition = 'all .1s'

          setTimeout(() => {
            ref.current!.style.transform = `translateX(0px)`
            ref.current!.style.transition = 'all 0s'
            setCurrent((current) => current + 1)
          }, 100)
        } else if (dx > 100) {
          ref.current!.style.transform = `translateX(${windowSize!.width}px)`
          ref.current!.style.transition = 'all .1s'

          setTimeout(() => {
            ref.current!.style.transform = `translateX(0px)`
            ref.current!.style.transition = 'all 0s'
            setCurrent((current) => current - 1)
          }, 100)
        } else {
          ref.current!.style.transform = `translateX(0px)`
          ref.current!.style.transition = 'all .1s'
          setTimeout(() => {
            ref.current!.style.transform = `translateX(0px)`
            ref.current!.style.transition = 'all 0s'
          }, 100)
        }
      },
      onMouseDown: (e) => {
        e.preventDefault()
      },
    },
    {
      drag: {
        lockDirection: true,
      },
    }
  )

  return (
    <RemoveScroll>
      <PreventDefaultScrollBehavior />
      <Screen ref={ref} {...bind()}>
        {current}
        {useMemo(() => {
          return [-1, 0, 1].map((index) => {
            const pageIndex = current + index
            const page = pages[pageIndex]
            console.log(page)
            if (!page) return null
            if (index === -1) return <PrevPage>{page()}</PrevPage>
            else if (index === 0) return <CurrentPage>{page()}</CurrentPage>
            else if (index === 1) return <NextPage>{page()}</NextPage>
            return page()
          })
        }, [pages, current])}
      </Screen>
    </RemoveScroll>
  )
}
