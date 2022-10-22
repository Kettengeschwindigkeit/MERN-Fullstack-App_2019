const express = require('express')
const config = require('config')

const app = express()

const PORT = config.get('port') || 5050

app.listen(5050, () => console.log(`App has been started on port ${PORT}...`))
