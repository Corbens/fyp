const express = require('express')

// controller functions
const { loginUser, signupUser, addHistory, getHistory } = require('../controllers/userController')

const router = express.Router()

// login route 
router.post('/login', loginUser)

// signup route
router.post('/signup', signupUser)

// add history route
router.post('/addhistory', addHistory)

// get history route
router.post('/gethistory', getHistory)

module.exports = router