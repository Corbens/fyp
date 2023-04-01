const Srs = require('../models/srsModel')

const createSrs = async (req, res) => {
    const { email } = req.body

    try {
        const srs = await Srs.createSrs(email)
        res.status(200).json({srs})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const getSrs = async (req, res) => {
    const { email } = req.body

    try {
        const srs = await Srs.getSrs(email)
        res.status(200).json({srs})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const toggleSrs = async (req, res) => {
    const { email, values } = req.body

    try {
        const result = await Srs.toggleSrs(email, values)
        res.status(200).json({result})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const updateSrs = async (req, res) => {
    const { email, srs } = req.body

    try {
        const result = await Srs.updateSrs(email, srs)
        res.status(200).json({result})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = { createSrs, getSrs, toggleSrs, updateSrs }