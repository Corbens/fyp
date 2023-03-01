const Vocabulary = require('../models/vocabularyModel')

// status codes: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status

// get vocabulary deck
const getDeck = async (req, res) => {
    const { deckTitle } = req.body

    let retrievedDeck
    let e
    try {
        retrievedDeck = await Vocabulary.getDeck(deckTitle)
    } catch (error){
        e = error 
    }

    if(retrievedDeck){
        res.status(200).json({deck: retrievedDeck})
    }else{
        res.status(400).json({error: e.message})
    }
}

// get vocabulary decks in an array
const getDecks = async (req, res) => {
    const { data } = req.body

    let returnDecks = []
    for(let deck in data){
        if(data[deck]){
            try {
                const retrievedDeck = await Vocabulary.getDeck(deck)

                returnDecks.push(retrievedDeck)
            } catch {
                // if a deck title is not found yet is set to true, it will just said the decks without that deck
            }
        }

    }
    if(returnDecks.length === 0){ //if no decks are received send an error
        res.status(400).json({error: "no decks match request"})
    }else{
        res.status(200).json({"decks": returnDecks})
    }

}

// create new vocabulary deck
const createDeck = async (req, res) => {
    const {deckTitle, contents} = req.body

    try {
        const deck = await Vocabulary.createDeck(deckTitle, contents)
        res.status(200).json({deck})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// update vocabulary deck
const updateDeck = async (req, res) => {
    const { deckTitle, vocabSet } = req.body

    try {
        await Vocabulary.updateDeck(deckTitle, vocabSet)
        res.status(200).json({"msg": "successfully updated deck"})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = { getDeck, getDecks, createDeck, updateDeck }