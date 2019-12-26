import React from 'react'
import { Global, css } from '@emotion/core'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import AccordionPage from './01-accordion'
import ViewPager from './02-viewPager'
import ItemLink from './00-components/ItemLink'

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
        <Switch>
          <Route path="/view-pager" component={ViewPager} />
          <Route path="/accordion" component={AccordionPage} />
          <Route path="/" component={ListPage} />
        </Switch>
      </Router>
    </div>
  )
}

const ListPage = () => {
  return (
    <ul>
      <li>
        <ItemLink to="/accordion">Accordion</ItemLink>
        <ItemLink to="/view-pager">ViewPager</ItemLink>
      </li>
    </ul>
  )
}

export default App
