const db = require('../db/db')

const Park = {
  findAll: () => {
    const sql = 'SELECT * FROM parks'

    return db
      .query(sql)
      .then(dbRes => dbRes.rows)
  },
  create: (name, image, address, parkfees = false, parklot = false, toilet = false, playground = false, bbq = false, foodcourt = false, trail = false, petfriendly = false, description) => {

    const sql = `
      INSERT INTO parks(name, image, address, parkfees, parklot, toilet, playground, bbq, foodcourt, trail, petfriendly, description)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      RETURNING *
    `
    return db
      .query(sql, [name, image, address, parkfees, parklot, toilet, playground, bbq, foodcourt, trail, petfriendly, description])
      .then(dbRes => dbRes.rows[0])
  },
  update: (id, name, image, address, parkfees = false, parklot = false, toilet = false, playground = false, bbq = false, foodcourt = false, trail = false, petfriendly = false, description) => {

    const sql = `
      UPDATE parks SET name = ($2), image = ($3), address = ($4), parkfees = ($5), parklot = ($6), toilet = ($7), playground = ($8), bbq = ($9), foodcourt = ($10), trail = ($11), petfriendly = ($12), description = ($13) WHERE id = ($1)
      RETURNING *
    `

    return db
      .query(sql, [id, name, image, address, parkfees, parklot, toilet, playground, bbq, foodcourt, trail, petfriendly, description])
      .then(dbRes => dbRes.rows[0])
  },
  delete: parkId => {
    const sql = `
      DELETE FROM parks WHERE id = $1
    `
    return db.query(sql, [parkId])
  }
}

module.exports = Park