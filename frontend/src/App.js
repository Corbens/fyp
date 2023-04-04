import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'

import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import DragDrop from './pages/DragDrop'
import Flashcards from './pages/Flashcards'
import Kanji from './pages/Kanji'
import Placeholder from './pages/Placeholder'
import Navbar from './components/Navbar'

import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL

function App() {
  const { user } = useAuthContext()

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
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
              path="/placeholder"
              element={user ? <div className="pagesIn"><Placeholder /></div> : <Navigate to="/" />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
