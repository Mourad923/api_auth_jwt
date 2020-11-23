const express = require('express')
const app = express()
const dotenv = require('dotenv')

const authRoute = require('./routes/auth')
const postRoute = require('./routes/posts')
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

dotenv.config()


//middleware
app.use(express.json())

//Route Middlewares
app.use('/api/user', authRoute)
app.use('/api/posts', postRoute)




app.listen(3000, () => console.log('Server up and runiing'))