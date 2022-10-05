const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')

// models
const User = require('../models/user')

router.get('/', (req, res) => {
  if (req.session.userId) {
    User
      .findById(req.session.userId)
      .then(userName => res.json(userName))
  } else {
    res.json({ error: 'no one logged in' })
  }
})

router.post('/', (req, res) => {
  const { email, password } = req.body

  User
    .findByEmail(email)
    .then(user => {
      if (email == '' || password == '') {
        res.status(400).json({ error: 'email and/or password cannot be blank'})
      } else {
        const isValidPassword = bcrypt.compareSync(password, user.password_digest)

        if (user && isValidPassword) {
          // log the user in
          req.session.userId = user.id
          res.json(user.email)
        }
      }
    })
})

module.exports = router