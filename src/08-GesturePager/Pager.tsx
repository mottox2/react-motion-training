import React, { useState, useEffect, useMemo, useRef } from 'react'
import styled from '@emotion/styled/macro'
import { Global } from '@emotion/core'
import { RemoveScroll } from 'react-remove-scroll'
import { useGesture } from 'react-use-gesture'

const Container = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  overflow: hidden;
`

const Pan = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
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
  /* overflow-y: auto; */
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

const duration = 200

const PageView = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  padding: 8px 12px;
  z-index: 10;
  background-color: white;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  min-width: 40px;
  text-align: center;
`

const inRange = (value: number, max: number) => {
  return value > 0 ? Math.min(value, max) : Math.max(value, -1 * max)
}

export const Pager = ({ pages }: any) => {
  const [current, setCurrent] = useState(0)
  const [zoom, setZoom] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const windowSize = useWindowSize()
  const ref = useRef<HTMLDivElement>(null)
  const zoomRef = useRef<HTMLDivElement>(null)
  const panRef = useRef<HTMLDivElement>(null)
  const isFirstPage = current === 0
  const isLastPage = current === pages.length - 1
  const tapCount = useRef(0)

  useEffect(() => {
    setZoom(1)
    setPosition({ x: 0, y: 0 })
    zoomRef.current!.style.transform = 'scale(1)'
    panRef.current!.style.transform = 'translate3d(0, 0, 0)'
  }, [current])

  const bind = useGesture(
    {
      onDrag: (state) => {
        if (state.tap) {
          tapCount.current = tapCount.current + 1
          // リセットするタイミングで1のままならシングルタップとして認識してよさそう。
          setTimeout(() => (tapCount.current = 0), 200)
          if (tapCount.current > 1) {
            const nextZoom = zoom === 1 ? 2 : 1
            zoomRef.current!.style.transition = 'all .08s'
            panRef.current!.style.transition = 'all .08s'
            zoomRef.current!.style.transform = `scale(${nextZoom})`
            panRef.current!.style.transform = 'translate3d(0, 0, 0)'
            setTimeout(() => {
              panRef.current!.style.transition = ''
              zoomRef.current!.style.transition = ''
            }, 150)
            setZoom(nextZoom)
            setPosition({ x: 0, y: 0 })
          }
          return
        }
        if (!ref.current) return
        // 2本目の指が検出されたタイミングでドラッグ操作を強制停止
        if (state.event?.constructor.name === 'TouchEvent') {
          const touchEvent = state.event as React.TouchEvent
          if (touchEvent.touches.length > 1 && state.cancel) state.cancel()
        }

        if (zoom > 1) {
          if (!panRef.current) return
          const { x, y } = position
          const [dx, dy] = state.movement
          const maxX = (windowSize!.width * (zoom - 1)) / zoom / 2
          const maxY = (windowSize!.height * (zoom - 1)) / zoom / 2
          const nextX = inRange(x + dx / zoom, maxX)
          const nextY = inRange(y + dy / zoom, maxY)
          console.log({ dx: x + dx, maxX, nextX, maxY, zoom })
          return (panRef.current.style.transform = `translate3d(${nextX}px, ${nextY}px, 0)`)
        }
        console.log('drag', state.swipe, state.movement, state.direction, state)
        const [dx, dy] = state.movement
        ref.current.style.transform = `translateX(${dx}px)`
      },
      onDragEnd: (state) => {
        if (state.tap) return
        if (!ref.current) return
        if (zoom > 1) {
          const { x, y } = position
          const [dx, dy] = state.movement
          const [vx, vy] = state.vxvy
          const maxX = (windowSize!.width * (zoom - 1)) / zoom / 2
          const maxY = (windowSize!.height * (zoom - 1)) / zoom / 2
          const nextX = inRange(x + dx / zoom + vx * 20, maxX)
          const nextY = inRange(y + dy / zoom + vy * 20, maxY)
          panRef.current!.style.transform = `translate3d(${nextX}px, ${nextY}px, 0)`
          panRef.current!.style.transition = 'all .1s'
          setTimeout(() => {
            panRef.current!.style.transition = ''
          }, 300)
          return setPosition({ x: nextX, y: nextY })
        }

        const dx = state.movement[0]
        let next = current
        let translateX = 0
        if (dx < -100 && !isLastPage) {
          next = current + 1
          translateX = windowSize!.width * -1
        } else if (dx > 100 && !isFirstPage) {
          next = current - 1
          translateX = windowSize!.width
        }

        ref.current!.style.transform = `translateX(${translateX}px)`
        ref.current!.style.transition = 'all .2s'

        setTimeout(() => {
          ref.current!.style.transform = `translateX(0px)`
          ref.current!.style.transition = 'all 0s'
          setCurrent((current) => next)
        }, duration)
      },
      onPinch: (state) => {
        if (!zoomRef.current) return
        const { x, y } = position
        const [_zoom, _] = state.movement
        const nextZoom = Math.min(Math.max(1, zoom + _zoom / 100), 3)
        const maxX = (windowSize!.width * (nextZoom - 1)) / nextZoom / 2
        const maxY = (windowSize!.height * (nextZoom - 1)) / nextZoom / 2
        const nextX = inRange(x, maxX)
        const nextY = inRange(y, maxY)
        panRef.current!.style.transform = `translate3d(${nextX}px, ${nextY}px, 0)`
        zoomRef.current!.style.transform = `scale(${nextZoom})`
      },
      onPinchEnd: (state) => {
        const [_zoom, _] = state.movement
        const { x, y } = position
        const nextZoom = Math.min(Math.max(1, zoom + _zoom / 100), 3)
        const maxX = (windowSize!.width * (nextZoom - 1)) / nextZoom / 2
        const maxY = (windowSize!.height * (nextZoom - 1)) / nextZoom / 2
        const nextX = inRange(x, maxX)
        const nextY = inRange(y, maxY)
        panRef.current!.style.transform = `translate3d(${nextX}px, ${nextY}px, 0)`
        setPosition({ x: nextX, y: nextY })
        setZoom(nextZoom)
      },
      onMouseDown: (e) => {
        e.preventDefault()
      },
    },
    {
      drag: zoom === 1 ? { lockDirection: true, axis: 'x' } : {},
    }
  )

  return (
    <RemoveScroll>
      {/* <PreventDefaultScrollBehavior /> */}
      <PageView>
        {current} {Math.round(zoom * 100)}%
      </PageView>
      <Container {...bind()}>
        <div
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
          }}
          ref={ref}
        >
          {useMemo(() => {
            return [-1, 1].map((index) => {
              const pageIndex = current + index
              const page = pages[pageIndex]
              if (!page) return null
              if (index === -1)
                return <PrevPage key={pageIndex}>{page()}</PrevPage>
              else if (index === 0) return <CurrentPage>{page()}</CurrentPage>
              else if (index === 1)
                return <NextPage key={pageIndex}>{page()}</NextPage>
              return page()
            })
          }, [pages, current])}
          {pages[current] && (
            <CurrentPage ref={zoomRef}>
              <Pan ref={panRef}>
                <Scrollable>{pages[current]()}</Scrollable>
              </Pan>
            </CurrentPage>
          )}
        </div>
      </Container>
    </RemoveScroll>
  )
}

const Scrollable = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  overflow-y: auto;
`
