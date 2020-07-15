import React, {
  useState,
  useEffect,
  createRef,
  useMemo,
  useCallback,
} from 'react'
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
  overflow-y: auto;
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

export const Pager = ({ pages }: any) => {
  const [current, setCurrent] = useState(0)
  const [zoom, setZoom] = useState(1)
  const windowSize = useWindowSize()
  const ref = createRef<HTMLDivElement>()
  const zoomRef = createRef<HTMLDivElement>()
  const bind = useGesture(
    {
      onDrag: (state) => {
        if (!ref.current || state.tap) return // tap
        // 2本目の指が検出されたタイミングでドラッグ操作を強制停止
        if (state.event?.constructor.name === 'TouchEvent') {
          const touchEvent = state.event as React.TouchEvent
          if (touchEvent.touches.length > 1 && state.cancel) state.cancel()
        }
        console.log('drag', state.swipe, state.movement, state.direction, state)
        const [dx, dy] = state.movement
        ref.current.style.transform = `translateX(${dx}px)`
      },
      onDragEnd: (state) => {
        if (!ref.current) return
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
          }, duration)
        } else if (dx > 100) {
          ref.current!.style.transform = `translateX(${windowSize!.width}px)`
          ref.current!.style.transition = 'all .1s'

          setTimeout(() => {
            ref.current!.style.transform = `translateX(0px)`
            ref.current!.style.transition = 'all 0s'
            setCurrent((current) => current - 1)
          }, duration)
        } else {
          ref.current!.style.transform = `translateX(0px)`
          ref.current!.style.transition = 'all .1s'
          setTimeout(() => {
            ref.current!.style.transform = `translateX(0px)`
            ref.current!.style.transition = 'all 0s'
          }, duration)
        }
      },
      onPinch: (state) => {
        if (!zoomRef.current) return
        const [_zoom, _] = state.offset
        const zoom = Math.min(Math.max(1, 1 + _zoom / 100), 5)
        zoomRef.current!.style.transform = `scale(${zoom})`
      },
      onPinchEnd: (state) => {
        const [_zoom, _] = state.offset
        const zoom = Math.min(Math.max(1, 1 + _zoom / 100), 5)
        setTimeout(() => {
          setZoom(zoom)
        }, duration)
      },
      onMouseDown: (e) => {
        e.preventDefault()
      },
    },
    {
      drag: {
        lockDirection: true,
        axis: 'x',
      },
    }
  )

  return (
    <div>
      <RemoveScroll allowPinchZoom={true}>
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
                console.log(page)
                if (!page) return null
                if (index === -1) return <PrevPage>{page()}</PrevPage>
                else if (index === 0) return <CurrentPage>{page()}</CurrentPage>
                else if (index === 1) return <NextPage>{page()}</NextPage>
                return page()
              })
            }, [pages, current])}
            {pages[current] && (
              <CurrentPage ref={zoomRef}>{pages[current]()}</CurrentPage>
            )}
          </div>
        </Container>
      </RemoveScroll>
    </div>
  )
}
