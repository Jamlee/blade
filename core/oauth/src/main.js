require('dotenv').config()

const express = require('express')
const app = express()
const http = require('http')
const https = require('https')
const passport = require('./passport')
const oauth2orize = require('oauth2orize')
const oauth2Server = oauth2orize.createServer()
const bodyParser = require('body-parser')
const router = require('./router')
const port = process.env.PORT

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.listen(port, 
  () => console.log(`app listening on port ${port}!`))