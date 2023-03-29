const Flashcards = require('../models/flashcardsModel')

const createDeck = async (req, res) => {
    const {email, title, contents} = req.body

    try {
        const deck = await Flashcards.createDeck(email, title, contents)
        res.status(200).json({deck})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const getDecks = async (req, res) => {
    const {email} = req.body

    try {
        const decks = await Flashcards.getDecks(email)
        res.status(200).json({decks})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const editDeck = async (req, res) => {
    const { email, title, contents } = req.body

    try {
        const deck = await Flashcards.editDeck(email, title, contents)
        res.status(200).json({deck})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const deleteDeck = async (req, res) => {
    const { email, title } = req.body

    try {
        const deck = await Flashcards.deleteDeck(email, title)
        res.status(200).json({deck})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = { createDeck, getDecks, editDeck, deleteDeck }