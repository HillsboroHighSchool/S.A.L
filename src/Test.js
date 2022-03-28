const fetch = require('node-fetch')
const util = require('util')

fetch('https://maps.googleapis.com/maps/api/directions/json?origin=4710+Dakota+ave&destination=3812+Hillsboro+pike&key=AIzaSyCbwuhNvOJQrYWnLRF6WjzJeOcnhYYfpZA')
    .then(res => res.json()) // the .json() method parses the JSON response into a JS object literal
    .then(data => console.log(util.inspect(data.routes.inspect, true, 10)));