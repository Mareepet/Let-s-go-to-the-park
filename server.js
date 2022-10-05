const express = require('express')
const app = express()
const PORT = process.env.PORT || 3001;

const logger = require('./middlewares/logger')
const sessions = require('./middlewares/sessions')

const parksController = require('./controllers/parks_controller')
const usersController = require('./controllers/users_controller')
const sessionsController = require('./controllers/sessions_controller')

app.listen(PORT,
  () => console.log(`server listening to port ${PORT}`)
)

app.use(logger)

app.use(express.static('client'))

app.use(express.json())

app.use(sessions)

app.use('/api/parks', parksController)
app.use('/api/users', usersController)
app.use('/api/sessions', sessionsController)