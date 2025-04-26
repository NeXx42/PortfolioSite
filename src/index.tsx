import React from 'react';
import ReactDOM from 'react-dom/client';

import { HashRouter , Route, Routes } from 'react-router-dom';

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
    <HashRouter>
        <Routes>
            <Route path="/" element={<App dataFetcher={dataFetcher}/>}></Route>
            <Route path="/:desiredPageId/content" element={<ContentPage dataFetcher={dataFetcher}/>}></Route>
        </Routes>
    </HashRouter >
  </React.StrictMode>
);