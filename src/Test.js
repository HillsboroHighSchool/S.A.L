const fetch = require('node-fetch')
const util = require('util')

fetch('nope')
    .then(res => res.json()) // the .json() method parses the JSON response into a JS object literal
    .then(data => console.log(util.inspect(data.routes.inspect, true, 10)));
