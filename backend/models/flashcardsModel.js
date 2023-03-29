const mongoose = require('mongoose')

const Schema = mongoose.Schema

const flashcardsSchema = new Schema({ 
    email: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true
    },
    contents: {
        type: Array,
        required: true
    }

})

flashcardsSchema.statics.createDeck = async function(email, title, contents) {

    if(!email){
        throw Error('Verification Error: Try logging out and back in')
    }
    if(!title){ 
        throw Error('Deck must have a name')
    }

    const exists = await this.findOne({ email: email, title: title })
    if (exists) { 
        throw Error('You already have a deck with this name')
    }
    
    if (!contents || contents.length === 0) { 
        throw Error('Deck must have at least one card')
    }

    const flashcards = await this.create({ email, title, contents })
    return flashcards
}

flashcardsSchema.statics.getDecks = async function(email) {

    if(!email){
        throw Error('Verification Error: Try logging out and back in')
    }

    const all = await this.find({ email: email }).exec()
    if(all){
        return all
    }else{
        return null
    }
}

flashcardsSchema.statics.editDeck = async function(email, title, contents) {

    if(!email || !title){
        throw Error('Error editing deck. Try again later.')
    }

    if(contents.length === 0){
        throw Error('Deck must have at least one card')
    }
    let deck = await this.updateOne({ email: email, title: title }, { contents: contents });
    return deck

}

flashcardsSchema.statics.deleteDeck = async function(email, title) {
    if(!email || !title){
        throw Error('Error deleting deck. Try again later.')
    }

    let deck = await this.findOneAndDelete({ email: email, title: title })
    return deck
}
module.exports = mongoose.model('Flashcards', flashcardsSchema)