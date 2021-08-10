require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/videos', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', (error) =>
  console.log('Database Connection Successfully Established')
)

app.use(express.json())

const videoRouter = require('./routes/videos')
app.use('/videos', videoRouter)

app.listen(PORT, () =>
  console.log(
    `Server Started Successfully... App Listening on http://localhost:${PORT}`
  )
)
