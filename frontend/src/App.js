import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'

import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Lessons from './pages/Lessons'
import DragDrop from './pages/DragDrop'
import Flashcards from './pages/Flashcards'
import Kanji from './pages/Kanji'
import Forums from './pages/Forums'
import Navbar from './components/Navbar'

import LessonHiragana from './pages/LessonHiragana'

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
              path="/lessons"
              element={user ? <div className="pagesIn"><Lessons /></div> : <Navigate to="/" />}>
            </Route>
            <Route
                path="/lessons/hiragana"
                element={user ? <div className="pagesIn"><LessonHiragana /></div> : <Navigate to="/" />}
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
      </BrowserRouter>
    </div>
  );
}

export default App;
