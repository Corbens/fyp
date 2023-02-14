const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

// static signup method
userSchema.statics.signup = async function(email, password) {

    const exists = await this.findOne({ email })
    
    if (exists) { 
        throw Error('Email has already been taken')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ email, password: hash })

    return user
} 

// static login method
userSchema.statics.login = async function(email, password) {

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

module.exports = mongoose.model('User', userSchema)