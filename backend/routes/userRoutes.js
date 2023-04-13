const express = require('express')

// controller functions
const { loginUser, signupUser, addHistory, getHistory, getLeaderboard, getLessonStatus, updateLessonStatus } = require('../controllers/userController')

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

module.exports = router