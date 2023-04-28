const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema

const gameSchema = new Schema({
    type: {
        type: String,
        required: true
    },
    dateTime: {
        type: String,
        default: new Date().toISOString()
    },
    score: {
        type: Number,
        required: true
    }
})

const userSchema = new Schema({ 
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    history: {
        type: [gameSchema]
    },
    experience: {
        type: Number,
        default: 0
    },
    lessons: {
        type: Array,
        default: [false, false, false]
    },
    ruby: {
        type: Boolean,
        default: true
    },
    japanese: {
        type: Boolean,
        default: false
    }

})

// static signup method
userSchema.statics.signup = async function(email, password, username) {

    if(!email || !password || !username){ 
        throw Error('All fields must be filled in')
    }

    if(email.length > 256 || password.length > 256 || username.length > 256){
        throw Error('Too many characters in one or more fields')
    }

    let validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    if(!validEmail){ // checks that the email is in the format string1@string2.string3. later make it so it supports international emails with unicode.
        // https://datatracker.ietf.org/doc/html/rfc5892 //https://stackoverflow.com/questions/2049502/what-characters-are-allowed-in-an-email-address
        throw Error('Invalid email address')
    }

    let validPassword = /^[\p{Script=Latin}\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{N}\p{P}]+$/u.test(password)
    if(!validPassword){ // checks if the password contains any non-allowed characters
        throw Error('Invalid characters in password')
    }

    let validUsername = /^[\p{Script=Latin}\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{N}\p{P}]+$/u.test(username)
    if(!validUsername){ // checks if the username contains any non-allowed characters
        throw Error('Invalid characters in username')
    }

    const exists = await this.findOne({ email })
    
    if (exists) { 
        throw Error('Email has already been taken')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ email, password: hash, username })

    return user
} 

userSchema.statics.login = async function(email, password) {

    if(!email || !password){ 
        throw Error('All fields must be filled in')
    }

    const user = await this.findOne({ email })
    
    if (!user) { 
        throw Error('Invalid login details')
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match) {
        throw Error('Invalid login details')
    }

    return user
}

userSchema.statics.addGame = async function(email, type, score) {
    const res = await this.updateOne({email: email}, {"$push": {"history": {"$each": [{type: type, score: score}], "$position": 0 }}, "$inc": { "experience": score }})
    return res

}

userSchema.statics.getGames = async function(email) {
    const user = await this.findOne({ email })
    return user.history
    
}

userSchema.statics.getLeaderboard = async function() {
    let leaderboard = []
    for await (const user of this.find()) {
        leaderboard.push({ email: user.email, username: user.username, experience: user.experience })
    }
    leaderboard.sort((a, b) => b.experience - a.experience)
    return leaderboard
}

userSchema.statics.getLessonStatus = async function(email) {
    const user = await this.findOne({ email })
    return user.lessons
}

userSchema.statics.updateLessonStatus = async function(email, lesson) {
    const user = await this.findOne({ email })
    
    user.lessons[Number(lesson)] = !user.lessons[Number(lesson)]
    await user.save()

    return ("Successfully updated")
}

userSchema.statics.getRuby = async function(email) {
    const user = await this.findOne({ email })
    return user.ruby

}

userSchema.statics.toggleRuby = async function(email) {
    const user = await this.findOne({ email })
    user.ruby = !user.ruby
    await user.save()

    return ("Successfully updated")
}

userSchema.statics.getJapanese = async function(email) {
    const user = await this.findOne({ email })
    return user.japanese
}

userSchema.statics.toggleJapanese = async function(email) {
    const user = await this.findOne({ email })
    user.japanese = !user.japanese
    await user.save()

    return ("Successfully updated")
}



module.exports = mongoose.model('User', userSchema)