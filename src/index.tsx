import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import App from './Homepage';
import Topbar from './Components/Topbar';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Topbar />
    <App />
  </React.StrictMode>
);