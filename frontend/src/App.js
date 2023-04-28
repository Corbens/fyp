import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useState } from 'react'
import axios from "axios"

import { createTheme, ThemeProvider } from '@mui/material/styles'
import SettingsIcon from '@mui/icons-material/Settings'
import Fab from '@mui/material/Fab'
import Modal from '@mui/material/Modal'

import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Lessons from './pages/Lessons'
import DragDrop from './pages/DragDrop'
import Flashcards from './pages/Flashcards'
import Kanji from './pages/Kanji'
import Navbar from './components/Navbar'
import Extra from './components/extra/Extra'
import { useAuthContext } from './hooks/useAuthContext'

axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL

function App() {
  const { user } = useAuthContext()
  const [showExtra, setShowExtra] = useState(false)

  const theme = createTheme({
    palette: {
      primary: {
        main: "#333333"
      },
      secondary: {
        main: "#b9a4ff"
      }
    }
  })

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <ThemeProvider theme={theme}>
          <div className="pages">
            <Routes>
              <Route
                path="/"
                element={user ? <div className="pagesIn"><Home /></div> : <Navigate to="/login" />}
              />
              <Route
                path="/login"
                element={!user ? <Login /> : <Navigate to="/" />}
              />
              <Route
                path="/signup"
                element={!user ? <Signup /> : <Navigate to="/" />}
              />
              {["/lessons", "/習い事"].map((path, index) => {
                return (
                  <Route path={path} 
                  element={user ? <div className="pagesIn"><Lessons /></div> : <Navigate to="/" />}
                  key={index}
                  />
                )
              })}
              {["/dragdrop", "/ドラッグ＆ドロップ"].map((path, index) => {
                return (
                  <Route path={path} 
                  element={user ? <div className="pagesIn"><DragDrop /></div> : <Navigate to="/" />}
                  key={index}
                  />
                )
              })}
              {["/flashcards", "/フラッシュカード"].map((path, index) => {
                return (
                  <Route path={path} 
                  element={user ? <div className="pagesIn"><Flashcards /></div> : <Navigate to="/" />}
                  key={index}
                  />
                )
              })}
              {["/kanji", "/漢字のゲーム"].map((path, index) => {
                return (
                  <Route path={path} 
                  element={user ? <div className="pagesIn"><Kanji /></div> : <Navigate to="/" />}
                  key={index}
                  />
                )
              })}
            </Routes>
          </div>
        </ThemeProvider>
      </BrowserRouter>
        {user && 
          <ThemeProvider theme={theme}>
            <div className='fab'><Fab onClick={() => setShowExtra(true)} color="secondary" sx={{border: "2px solid black"}}><SettingsIcon/></Fab></div>
            <Modal open={showExtra} onClose={() => setShowExtra(false)}><Extra/></Modal>
          </ThemeProvider>}
      </div>
  );
}

export default App
