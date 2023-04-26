const User = require('../models/userModel')
const Srs = require('../models/srsModel')
const jwt = require('jsonwebtoken')

// status codes: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status

// _id is what mongo calls it
const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '2d' })
}

const loginUser = async (req, res) => {
    const {email, password} = req.body

    try {
        const user = await User.login(email, password)
        const username = user.username
        const ruby = user.ruby

        const token = createToken(user._id)
        
        res.status(200).json({email, token, username, ruby})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const signupUser = async (req, res) => {
    const {email, password, username} = req.body

    try {
        const user = await User.signup(email, password, username)
        await Srs.createSrs(email)
        const ruby = true

        const token = createToken(user._id)
        
        res.status(201).json({email, token, username, ruby})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const addHistory = async (req, res) => {
    const {email, type, score} = req.body

    try {
        const game = await User.addGame(email, type, score)
        res.status(200).json({"game": game})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const getHistory = async (req, res) => {
    const { email } = req.body

    try { 
        const history = await User.getGames(email)
        res.status(200).json({"history": history})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const getLeaderboard = async (req, res) => {
    try { 
        const leaderboard = await User.getLeaderboard()
        res.status(200).json({"leaderboard": leaderboard})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const getLessonStatus = async (req, res) => {
    const { email } = req.body
    try {
        const lessonStatus = await User.getLessonStatus(email)
        res.status(200).json({"lessonStatus": lessonStatus})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const updateLessonStatus = async (req, res) => {
    const { email, lesson } = req.body

    try {
        const result = await User.updateLessonStatus(email, lesson)
        res.status(200).json({result})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const getRuby = async (req, res) => {
    const { email } = req.body

    try {
        const ruby = await User.getRuby(email)
        res.status(200).json({"ruby": ruby})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const toggleRuby = async(req, res) => {
    const { email } = req.body

    try {
        const result = await User.toggleRuby(email)
        res.status(200).json({result})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = { loginUser, signupUser, addHistory, getHistory, getLeaderboard, getLessonStatus, updateLessonStatus, getRuby, toggleRuby }