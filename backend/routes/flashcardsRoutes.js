const express = require('express')

// controller functions
const { createDeck, getDecks, editDeck, deleteDeck } = require('../controllers/flashcardsController')

const router = express.Router()

// create deck route
router.post('/createDeck', createDeck)

// get decks route
router.post('/getDecks', getDecks)

// edit decks route
router.post('/editDeck', editDeck)

// delete decks route
router.post('/deleteDeck', deleteDeck)

module.exports = router
