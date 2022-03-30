const inquirer = require("inquirer");
var today = new Date();
const request = require('request')
const dotenv = require('dotenv').config()
var axios = require('axios');
const readline = require('readline');
const colors = require('colors');
const { Console } = require("console");
const weather_url = `https://api.openweathermap.org/data/2.5/weather?q=Nashville&units=imperial&appid=${process.env.WEATHER_KEY}`
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

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
        console.log("Good mourning, It is currently " + date + ", Its " + temp + " Degrees outside.");
    }

    rl.question('What could I help you with? '.blue, value => {
        const Location = value.slice(16)
        const location2 = value.slice(33)
        var config = {
            method: 'get',
            url: `https://maps.googleapis.com/maps/api/distancematrix/json?origins=4710+dakota+ave&destinations=${Location}&units=imperial&key=${process.env.MAPS_KEY}`,
            headers: {}
        };
        var config2 = {
            method: 'get',
            url: `https://maps.googleapis.com/maps/api/distancematrix/json?origins=4710+dakota+ave&destinations=${location2}&units=imperial&key=${process.env.MAPS_KEY}`,
            headers: {}
        };

        axios(config)
            .then(function(response) {
                var a = (JSON.stringify(response.data.rows));
                const Length = a.slice(35, 41);
                const Time = a.slice(79, 94);

                if (value.startsWith('How far away is ')) {
                    console.log(Location + ' is '.green + Length + ' Away.'.green)
                }
                rl.close()
            });
        axios(config2)
            .then(function(response) {
                var a = (JSON.stringify(response.data.rows));
                const Length = a.slice(35, 41);
                const Time = a.slice(79, 94);

                if (value.startsWith('How long would it take to get to ')) {
                    console.log(location2 + ' is '.green + Time + ' Away.'.green)
                    rl.close()
                };
            })

        if (value === 'Good Mourning') {
            console.log("Good mourning, It is currently ".green + date + " And ".green + temp + " Degrees outside!".green);
        } else if (value === 'Hows the weather') {
            console.log('Right now it is '.green + temp + ' Degrees outside but it feels like '.green + data.main.feels_like);
        } else if (value.startsWith('Test')) {
            console.log(Test)
        } else if (value.startsWith('How far away is')) {
            return
        } else if (value.startsWith('How long would it take to get to ')) {
            return
        } else if (value.startsWith('Hey', 'Hi')) {
            console.log('Hello Wolfgang, I am here and ready to help you.'.green)
        } else {
            console.log(Responses[Response]);
        }
        rl.close()
    });
})
