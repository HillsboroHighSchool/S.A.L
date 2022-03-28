const request = require('request')
const dotenv = require('dotenv').config()
const url = process.env.MAPS_API

request(url, (error, response, body) => {
    const data = JSON.parse(body)
    const Output = JSON.parse((JSON.stringify(data.routes)))
    console.log(Output)
})