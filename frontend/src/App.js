import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuthContext } from './hooks/useAuthContext'
import axios from "axios"

import Fab from '@mui/material/Fab'
import SettingsIcon from '@mui/icons-material/Settings'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Modal from '@mui/material/Modal'

import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Lessons from './pages/Lessons'
import DragDrop from './pages/DragDrop'
import Flashcards from './pages/Flashcards'
import Kanji from './pages/Kanji'
import Forums from './pages/Forums'
import Navbar from './components/Navbar'
import Extra from './components/extra/Extra'

axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL

function App() {
  const { user } = useAuthContext()
  const [showExtra, setShowExtra] = useState(false)

  const theme = createTheme({
    palette: {
      primary: {
        // main: "#8f6dff"
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
              <Route
                path="/lessons"
                element={user ? <div className="pagesIn"><Lessons /></div> : <Navigate to="/" />}
              />
              <Route
                path="/dragdrop"
                element={user ? <div className="pagesIn"><DragDrop /></div> : <Navigate to="/" />}
              />
              <Route
                path="/flashcards"
                element={user ? <div className="pagesIn"><Flashcards /></div> : <Navigate to="/" />}
              />
              <Route
                path="/kanji"
                element={user ? <div className="pagesIn"><Kanji /></div> : <Navigate to="/" />}
              />
              <Route
                path="/forums"
                element={user ? <div className="pagesIn"><Forums /></div> : <Navigate to="/" />}
              />
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
