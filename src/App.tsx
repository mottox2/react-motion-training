import React from 'react'
import { Global, css } from '@emotion/core'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import AccordionPage from './01-accordion'
import ViewPager from './02-viewPager'
import ItemLink from './00-components/ItemLink'
import Stack from './00-components/Stack'
import { AnimatePresence } from 'framer-motion'

const routes = [
  {
    name: 'Accordion',
    path: '/accordion',
    component: () => (
      <Stack>
        <AccordionPage />
      </Stack>
    )
  },
  {
    name: 'ViewPager',
    path: '/view-pager',
    component: () => (
      <Stack>
        <ViewPager />
      </Stack>
    )
  }
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
            <AnimatePresence exitBeforeEnter initial={false}>
              <Switch location={location} key={location.pathname}>
                {routes.map(route => (
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
                      <Stack state={state}>
                        <ListPage />
                      </Stack>
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
    <ul>
      {routes.map(route => (
        <li key={route.path}>
          <ItemLink to={route.path}>{route.name}</ItemLink>
        </li>
      ))}
    </ul>
  )
}

export default App
