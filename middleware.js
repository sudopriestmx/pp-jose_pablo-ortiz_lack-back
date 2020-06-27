const { STATUS_CODES } = require('http')

module.exports = {
  handleError,
  notFound,
  handleValidationError
}


function handleError (err, req, res, next) {
  console.error(err)
  if (res.headersSent) return next(err)

  const statusCode = err.statusCode || 500
  const errorMessage = STATUS_CODES[statusCode] || 'Internal Error'
  res.status(statusCode).json({ error: errorMessage })
}

function notFound (req, res) {
  res.status(404).json({ error: 'Not Found' })
}

function handleValidationError (err, req, res, next) {
  if (err.name !== 'ValidationError') return next(err)

  res.status(400).json({ error: err._message, errorDetails: err.errors })
}