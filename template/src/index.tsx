import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { CogsConnectionProvider } from '@clockworkdog/cogs-client-react';

ReactDOM.render(
  <>
    <CogsConnectionProvider>
      <App />
    </CogsConnectionProvider>
  </>,
  document.getElementById('root')
);
