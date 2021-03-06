const {exec} = require('child_process')
const express = require('express')
const path = require('path')
require('dotenv').config()
const port = 3000

exec('webpack --config ./webpack.config.js', {}, console.log)

const app = express()

app.use(express.static(path.join(__dirname, './src')))
app.use('/dist' , express.static(path.join(__dirname, './dist')))
app.get('/token', (req, res) => {
	res.send(process.env.TOKEN)
})

app.listen(port, () => {console.log(`http://localhost:${port}`)})