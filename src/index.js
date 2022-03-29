const inquirer = require("inquirer");
var today = new Date();
const request = require('request')
const dotenv = require('dotenv').config()
var axios = require('axios');
const readline=require('readline');
const weather_url = `https://api.openweathermap.org/data/2.5/weather?q=Nashville&units=imperial&appid=${process.env.WEATHER_KEY}`
var config = {
    method: 'get',
    url: `https://maps.googleapis.com/maps/api/distancematrix/json?origins=4710+dakota+ave&destinations=${process.argv[2]}&units=imperial&key=${process.env.MAPS_KEY}`,
    headers: {}
};

var date = (today.getMonth() + 1) + '/' + today.getDate() + '/' + today.getFullYear();

const Responses = [
    "Im not certain of what you mean by that, Please elaborate.",
    "I couldnt understand what you tried to say please add context.",
    "Im not currently equipped to handle this task.",
    "That doesnt quite work yet.",
    "Please refrain from that command, its not ready yet."
];

const Response = Math.floor(Math.random() * Responses.length);

request(weather_url, (error, response, body) => {
    const data = JSON.parse(body)
    const temp = data.main.temp

    if (today.getHours() < 12) {
        console.log("Good mourning, It is currently " + date + " And " + temp + " Degrees outside!");
    }
    axios(config)
        .then(function(response) {
            var a = (JSON.stringify(response.data.rows));
            const Directions = a.slice(35, 41);

            inquirer
                .prompt([{
                    name: "channels",
                    message: "What could I help you with?",
                    choices: [{ name: "Investigation Discovery", value: 0 }, { name: "CNN", value: 1 }, { name: "Fox News", value: 2 }, { name: "TLC", value: 3 }]
                }])
                .then((responses) => {
                    if (responses.channels === 'Good Mourning') {
                        console.log("Good mourning, It is currently " + date + " And " + temp + " Degrees outside!");
                    } else if (responses.channels === 'Hows the weather') {
                        console.log('Right now it is ' + temp + ' Degrees outside but it feels like ' + data.main.feels_like + ' The skys are mostly ' + data.weather.main);
                    } else if (responses.channels.startsWith('How far away is')) {
                        console.log(process.argv);
                    } else {
                        console.log(Responses[Response]);
                    }
                });
        })
})
