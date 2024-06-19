const bodyParser = require('body-parser')
const express = require('express')

const db = require('./src/database/db.js')
db.sync()

const responseMiddleware = require('./src/middlewares/response.middleware.js')

const authRoute = require('./src/routes/auth.route.js')
const noteRoute = require('./src/routes/note.route.js')

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(responseMiddleware)

app.use('/v1/auth', authRoute)
app.use('/v1/note', noteRoute)

app.get('/', (req, res) => {
    res.status(200).send('hey hey')
})

const port = process.env.PORT || 8080
app.listen(port, () => {
    console.log(`app running on port: ${port}`)
})