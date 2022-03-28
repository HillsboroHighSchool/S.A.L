const request = require('request')
const dotenv = require('dotenv').config()
const url = process.env.WEATHER_API

request(url, (error, response, body) => {
    const data = JSON.parse(body)
    console.log(data.main.temp)
})