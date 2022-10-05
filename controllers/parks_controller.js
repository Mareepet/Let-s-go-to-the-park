const express = require('express')
const router = express.Router() 

const Park = require('../models/park')

router.get('/', (req, res) => {
  Park
    .findAll()
    .then(parks => res.json(parks))
    })

router.post('/', (req, res) => {
  const { name, image, description } = req.body
    
  Park
    .create(name, image, description)
    .then(park => res.json(park))
})

router.delete('/:id', (req, res) => {
  const parkId = req.params.id
    
  Park
    .delete(parkId)
    .then(() => res.json({ message: 'park successfully deleted' }))
})

module.exports = router