import React, { useState, useEffect, createRef } from 'react'
import styled from '@emotion/styled/macro'

import { Pager } from './Pager'

const Page = styled.div`
  background-color: red;
  height: 100%;
`

const colors = ['red', 'orange', 'blue']

export const GesturePager = () => {
  const pages = [1, 2, 3].map((i) => () => (
    <Page key={i} style={{ backgroundColor: colors[i - 1] }}>
      page{i}
    </Page>
  ))
  return <Pager pages={pages} />
}
