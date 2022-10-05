const db = require('../db/db')

const Park = {
  findAll: () => {
    const sql = 'SELECT * FROM parks'

    return db
      .query(sql)
      .then(dbRes => dbRes.rows)
  },
  create: (name, image, description) => {
    const sql = `
      INSERT INTO parks(name, image, description)
      VALUES ($1, $2, $3)
      RETURNING *
    `
    return db
      .query(sql, [name, image, description])
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