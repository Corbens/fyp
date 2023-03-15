require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
mongoose.set('strictQuery', false);
const userRoutes = require('./routes/userRoutes')

//express app 
const app = express()

//middleware
//not sure but think this is necessary for postman requests at least sometimes. make things have the right json format
app.use(express.json())

//displays the route path and method when a route is invoked
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// middleware to enable cors (so can avoid installing cors package). basically allows all request where the origin is our frontend.
app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', [process.env.ALLOWED_ORIGINS])
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    res.append('Access-Control-Allow-Headers', 'Content-Type')
    next()
})

//routes 
app.get('/', (req, res) => {
    res.json({msg: "Welcome to the app"})
})
app.use('/api/user', userRoutes)

//mongoose
mongoose.connect(process.env.MONGO_URI).then(() => {
    //listen for requests
    app.listen(process.env.PORT, () => {
        console.log("connected to db & listening on port", process.env.PORT)
    })
}).catch((error) => {
    console.log(error)
})


