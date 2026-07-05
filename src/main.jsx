import React, { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter, Routes, Route } from 'react-router-dom'
import './index.css'

const Home = lazy(() => import('./pages/Home.jsx'))
const Suite = lazy(() => import('./pages/Suite.jsx'))

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <Suspense fallback={<div style={{minHeight:'100svh',background:'#0a0812'}} />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/suite" element={<Suite />} />
        </Routes>
      </Suspense>
    </HashRouter>
  </React.StrictMode>
)
