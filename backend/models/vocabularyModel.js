const mongoose = require('mongoose')

const Schema = mongoose.Schema

var contentsSchema = new Schema({
    en: {
        type: String
    },
    ja: {
        type: String
    }
})

const vocabularySchema = new Schema({
    deckTitle: {
        type: String,
        required: true,
        unique: true
    },
    contents: [contentsSchema]
})

vocabularySchema.statics.createDeck = async function(deckTitle, contents){

    // check that a deck with such a title does not already exists
    const exists = await this.findOne({ deckTitle })
    if(exists){
        throw Error('Deck with that title already exists')
    }

    // create the new deck
    const deck = await this.create({deckTitle, contents})
    if(!deck){
        throw Error('Error creating deck')
    }

    return deck
}


vocabularySchema.statics.getDeck = async function(deckTitle){

    // retrieve the deck
    const deck = await this.findOne({ deckTitle })
    if (!deck){
        throw Error('Deck not found')
    }

    return deck

}

vocabularySchema.statics.updateDeck = async function(deckTitle, vocabSet){

    await this.updateOne(
        {deckTitle: deckTitle},
        { $push: { contents: {
            $each:  vocabSet 
        } } }
    )

}

module.exports = mongoose.model('Vocabulary', vocabularySchema)