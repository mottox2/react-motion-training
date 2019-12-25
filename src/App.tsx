import React from 'react';
import { Global, css } from '@emotion/core'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'

const App: React.FC = () => {
  return (
    <div>
      <Global styles={css`
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
            'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
            sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
      `}/>
      <Router>
        <ul>
          <li>
            <Link to='/accordion'>Accordion</Link>
            <Link to='/'>Menu</Link>
          </li>
        </ul>
        <Switch>
          <Route path='/accordion' component={DetailPage}/>
          <Route path='/' component={ListPage}/>
        </Switch>
      </Router>
    </div>
  );
}

const DetailPage = () => {
  return <div>DetailPage</div>
}

const ListPage = () => {
  return <p>ListPage</p>
}

export default App;
