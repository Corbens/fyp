const express = require('express')

// controller functions 
const { getDeck, getDecks, createDeck, updateDeck } = require('../controllers/vocabularyController')

const router = express.Router()

// getDeck route
router.get('/getDeck', getDeck)

// getDecks route
router.post('/getDecks', getDecks)

// createDeck route
router.post('/createDeck', createDeck)

// updateDeck route
router.post('/updateDeck', updateDeck)


module.exports = router