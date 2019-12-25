import React from 'react';
import { Global, css } from '@emotion/core'

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
      <p>
        Edit <code>src/App.tsx</code> and save to reload.
      </p>
    </div>
  );
}

export default App;
