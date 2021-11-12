import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AuthPage from './pages/Auth'
import HomePage from './pages/Home'
import OAuthPage from './pages/OAuth'

const App = (): React.ReactElement => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/oauth" element={<OAuthPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
