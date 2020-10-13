import React from 'react'
import styled from '@emotion/styled/macro'
import ViewPager from './ViewPager'

import HeroHeader from '../00-components/HeroHeader'

const PagerContainer = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`

const Page = styled.div`
  width: 100%;
`

const DetailPage = () => {
  return (
    <>
      <HeroHeader
        color="#e88a15"
        title="ViewPager"
        description="Theme: swipe pager"
      />
      <PagerContainer>
        <ViewPager>
          <Page>aaaaaaa</Page>
          <Page>bbb</Page>
          <Page>cccccc</Page>
          <Page>ddddddd</Page>
        </ViewPager>
      </PagerContainer>
    </>
  )
}

export default DetailPage
