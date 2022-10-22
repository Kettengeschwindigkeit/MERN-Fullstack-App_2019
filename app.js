const express = require('express')
const config = require('config')
const mongoose = require('mongoose')

const app = express()

const PORT = config.get('port') || 5050

async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'), { useNewUrlParser: true, useUnifiedTopology: true })
        app.listen(5050, () => console.log(`App has been started on port ${PORT}...`))
    } catch (e) {
        console.log('Server Error', e.message)
        process.exit(1)
    }
}

start()
