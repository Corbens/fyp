const mongoose = require('mongoose')

const Schema = mongoose.Schema

const decks = [
    {title: "Countries",
    enabled: false,
    srs: [{level: 0, date: null},{level: 0, date: null},{level: 0, date: null},{level: 0, date: null},{level: 0, date: null},{level: 0, date: null},{level: 0, date: null},{level: 0, date: null},{level: 0, date: null}]},
    {title: "Food",
    enabled: false,
    srs: [{level: 0, date: null},{level: 0, date: null},{level: 0, date: null},{level: 0, date: null},{level: 0, date: null},{level: 0, date: null},{level: 0, date: null},{level: 0, date: null}]},
    {title: "Numbers",
    enabled: false,
    srs: [{level: 0, date: null},{level: 0, date: null},{level: 0, date: null},{level: 0, date: null},{level: 0, date: null},{level: 0, date: null},{level: 0, date: null},{level: 0, date: null},{level: 0, date: null},{level: 0, date: null}]},
    {title: "Kana",
    enabled: false,
    srs: [{level: 0, date: null},{level: 0, date: null},{level: 0, date: null},{level: 0, date: null},{level: 0, date: null},{level: 0, date: null},{level: 0, date: null},{level: 0, date: null},{level: 0, date: null},{level: 0, date: null},{level: 0, date: null},{level: 0, date: null},{level: 0, date: null},{level: 0, date: null},{level: 0, date: null},{level: 0, date: null},{level: 0, date: null},{level: 0, date: null},{level: 0, date: null},{level: 0, date: null},{level: 0, date: null},{level: 0, date: null},{level: 0, date: null},{level: 0, date: null},{level: 0, date: null},{level: 0, date: null},{level: 0, date: null},{level: 0, date: null},{level: 0, date: null},{level: 0, date: null},{level: 0, date: null},{level: 0, date: null},{level: 0, date: null},{level: 0, date: null},{level: 0, date: null},{level: 0, date: null},{level: 0, date: null},{level: 0, date: null},{level: 0, date: null},{level: 0, date: null},{level: 0, date: null},{level: 0, date: null},{level: 0, date: null},{level: 0, date: null},{level: 0, date: null},{level: 0, date: null}]},
]

const srsDeckSchema = new Schema({
    title: {
        type: String
    },
    enabled: {
        type: Boolean
    },
    srs: {
        type: Array
    }
})

const srsSchema = new Schema({ 
    email: {
        type: String,
        required: true,
    },
    decks: {
        type: [srsDeckSchema]
    }

})

srsSchema.statics.createSrs = async function(email) {

    // make sure this is run when a new user is created on signup, so for each user there is an associated SRS entry

    if(!email){
        throw Error('No user to associate SRS with')
    }

    const exists = await this.findOne({ email })
    
    if (exists) { 
        throw Error('SRS has already been initialised')
    }

    const srsEntry = await this.create({ email, decks })
    return srsEntry
}

srsSchema.statics.getSrs = async function(email){
    
    if(!email){
        throw Error('No user to get SRS for')
    }

    const srs = await this.findOne({ email })
    if (!srs) {
        throw Error('No SRS found matching email')
    }

    return srs
}

srsSchema.statics.toggleSrs = async function(email, values){

    if(!email){
        throw Error('Need User Email to Update')
    }
    if(!values){
        throw Error('Need Enable/Disable Array')
    }

    if(values.length !== 4){
        throw Error('Incorrect Number of Values')
    }

    const srs = await this.findOne({ email })
    if(!srs) {
        throw Error('No SRS found matching email')
    }

    for(x in srs.decks){
        srs.decks[x].enabled = values[x]
    }
    await srs.save()

    return ("Successfully updated")
}

srsSchema.statics.updateSrs = async function(email, newSrs){
    if(!email){
        throw Error('Need User Email to Update')
    }
    if(!newSrs){
        throw Error('No SRS Values to Update')
    }
    const srs = await this.findOne({ email })
    if(!srs) {
        throw Error('No SRS found matching email')
    }
    for(let newDeck in newSrs){ // loop through each deck which contains a card to be updated
        if(newSrs[newDeck].length !== 0){ // check the deck actually has a card to be updated
            for(let deck in srs.decks){ // loop through each deck in the srs database
                if(srs.decks[deck].title === newSrs[newDeck][0].deck){ // check if the deck in the srs database is the same as the deck to be updated
                    for(let card in newSrs[newDeck]){ // loop through each card that is to be updated, getting it's position in the srs database
                        let updateNum = newSrs[newDeck][card].num
                        srs.decks[deck].srs[updateNum].level = newSrs[newDeck][card].level
                        srs.decks[deck].srs[updateNum].date = newSrs[newDeck][card].nextReview
                    }
                }
            }
        }
    }
    srs.markModified('decks')
    await srs.save()

    return ("Successfully updated")

}

srsSchema.statics.resetSrs = async function(email, values){
    if(!email){
        throw Error('Need User Email to Reset')
    }
    if(!values){
        throw Error('Need Reset Array')
    }

    if(values.length !== 4){ // maybe instead of four have it the deck (object above) .length so it is more adaptable and less hard-coded.
        throw Error('Incorrect Number of Values')
    }

    const srs = await this.findOne({ email })
    if(!srs) {
        throw Error('No SRS found matching email')
    }

    for(deck in srs.decks){
        if(values[deck]){
            let enabled = srs.decks[deck].enabled
            srs.decks[deck] = decks[deck]
            srs.decks[deck].enabled = enabled
        }
    }
    await srs.save()

    return ("Successfully updated")

}

module.exports = mongoose.model('Srs', srsSchema)