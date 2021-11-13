import React from 'react'
import { Toaster } from 'react-hot-toast'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import GithubCorner from './components/GithubCorner'
import HomePage from './pages/Home'
import OAuthPage from './pages/OAuth'

const App = (): React.ReactElement => {
  return (
    <>
      <Toaster position="top-left" />
      <GithubCorner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/oauth" element={<OAuthPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
