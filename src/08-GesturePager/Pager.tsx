import React, { useMemo } from 'react'
import styled from "@emotion/styled";
import { RemoveScroll } from 'react-remove-scroll'

import { usePager } from './usePager'

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

const Scrollable = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  overflow-y: auto;
`

export const Pager: React.FC<{
  pages: (() => JSX.Element)[]
}> = ({ pages }) => {
  const { bind, ref, zoomRef, panRef, current, zoom } = usePager({ pages })

  return (
    <RemoveScroll>
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
