
function logger(req, res, next) {
  console.log(`${new Date()} ${req.method} ${req.path}`)

  // console.log(req)
  // next() calls the next function in middleware to run
  next()
}

module.exports = logger
