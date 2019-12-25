import React from 'react'
import { Global, css } from '@emotion/core'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import AccordionPage from './01-accordion'

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
        <Link to="/accordion">Accordion</Link>
      </li>
    </ul>
  )
}

export default App
