import React from 'react'
import { Global, css } from '@emotion/core'
import styled from '@emotion/styled'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import AccordionPage from './01-accordion'
import ViewPager from './02-viewPager'
import BottomSheet from './03-bottomSheet'
import FabWithMotion from './04-FabWithMotion'
import { ImageViewer } from './05-ImageViewer'
import { FramerViewer } from './06-FramerViewer'
import ItemLink from './00-components/ItemLink'
import Stack from './00-components/Stack'
import { AnimatePresence } from 'framer-motion'
import { GitHub } from 'react-feather'

const routes = [
  {
    name: 'Accordion',
    path: '/accordion',
    component: () => (
      <Stack>
        <AccordionPage />
      </Stack>
    ),
  },
  {
    name: 'ViewPager',
    path: '/view-pager',
    component: () => (
      <Stack>
        <ViewPager />
      </Stack>
    ),
  },
  {
    name: 'BottomSheet',
    path: '/bottom-sheet',
    component: () => (
      <Stack>
        <BottomSheet />
      </Stack>
    ),
  },
  {
    name: 'FAB with motion',
    path: '/fab-with-motion',
    component: () => (
      <Stack>
        <FabWithMotion />
      </Stack>
    ),
  },
  {
    name: 'ImageViewer',
    path: '/image-viewer',
    component: () => (
      <Stack>
        <ImageViewer />
      </Stack>
    ),
  },
  {
    name: 'FramerViewer',
    path: '/framer-viewer',
    component: () => (
      <Stack>
        <FramerViewer />
      </Stack>
    ),
  },
]

const App: React.FC = () => {
  return (
    <div>
      <Global
        styles={css`
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
              'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
              'Helvetica Neue', sans-serif;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            /* ダブルアップでの拡大禁止 */
            touch-action: manipulation;
          }
        `}
      />
      <Router>
        <Route
          render={({ location }) => (
            // <AnimatePresence exitBeforeEnter initial={false}>
            <AnimatePresence initial={false}>
              <Switch location={location} key={location.pathname}>
                {routes.map((route) => (
                  <Route
                    key={route.path}
                    path={route.path}
                    component={route.component}
                  />
                ))}
                <Route
                  path="/"
                  component={(props: any) => {
                    // const state = props.location.state
                    const state = { back: true }
                    return (
                      <div
                        style={{
                          position: 'absolute',
                          top: 0,
                          right: 0,
                          bottom: 0,
                          left: 0,
                        }}
                      >
                        <Stack state={state}>
                          <ListPage />
                        </Stack>
                      </div>
                    )
                  }}
                />
              </Switch>
            </AnimatePresence>
          )}
        />
      </Router>
    </div>
  )
}

const ListPage = () => {
  return (
    <div>
      <ul>
        {routes.map((route) => (
          <li key={route.path}>
            <ItemLink to={route.path}>{route.name}</ItemLink>
          </li>
        ))}
      </ul>
      <GitHubLink
        href="https://github.com/mottox2/react-motion-training"
        target="_blank"
        rel="noopener"
      >
        <GitHub />
        mottox2/react-motion-training
      </GitHubLink>
    </div>
  )
}

const GitHubLink = styled.a`
  display: block;
  margin: 16px auto;
  max-width: 320px;
  background-color: #f5f5f5;
  padding: 12px 16px;
  text-align: center;
  text-decoration: none;
  color: inherit;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    margin-right: 8px;
  }

  &:hover {
    background-color: #eee;
  }
`

export default App
