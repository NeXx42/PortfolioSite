import React from 'react';
import ReactDOM from 'react-dom/client';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './index.css';

import App from './Hompage/Homepage';
import Topbar from './Components/Topbar';
import ContentPage from './ContentPage/ContentPage';

import { DataFetcherEndpoint } from "./utils/DataFetcher"
import { DataFetcher_Json } from './utils/DataFetcher_Json';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const dataFetcher = new DataFetcherEndpoint(new DataFetcher_Json());

root.render(
  <React.StrictMode>
    <Topbar />
    <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Routes>
            <Route path="/" element={<App dataFetcher={dataFetcher}/>}></Route>
            <Route path="/:desiredPageId/content" Component={ContentPage}></Route>
        </Routes>
    </BrowserRouter>
  </React.StrictMode>
);