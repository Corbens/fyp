const express = require('express')

// controller functions
const { loginUser, signupUser, addHistory, getHistory, getLeaderboard, getLessonStatus, updateLessonStatus, getRuby, toggleRuby } = require('../controllers/userController')

const router = express.Router()

// login route 
router.post('/login', loginUser)

// signup route
router.post('/signup', signupUser)

// add history route
router.post('/addhistory', addHistory)

// get history route
router.post('/gethistory', getHistory)

// get leaderboard route
router.get('/getleaderboard', getLeaderboard)

// get lessonStatus route
router.post('/getlessonstatus', getLessonStatus)

// update lessonStatus route
router.post('/updatelessonstatus', updateLessonStatus)

// get ruby route
router.post('/getruby', getRuby)

// toggle ruby route
router.post('/toggleruby', toggleRuby)

module.exports = router