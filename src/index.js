const inquirer = require("inquirer");
var today = new Date();
const request = require('request')
const dotenv = require('dotenv').config()
const url = process.env.WEATHER_API


var date = (today.getMonth() + 1) + '/' + today.getDate() + '/' + today.getFullYear();

const Responses = [
    "Im not certain of what you mean by that, Please elaborate.",
    "I couldnt understand what you tried to say please add context.",
    "Im not currently equipped to handle this task.",
    "That doesnt quite work yet.",
    "Please refrain from that command, its not ready yet."
];

const Response = Math.floor(Math.random() * Responses.length);

request(url, (error, response, body) => {
    const data = JSON.parse(body)
    const temp = data.main.temp

    if (today.getHours() < 12) {
        console.log("Good mourning, It is currently " + date + " And " + temp + " Degrees outside!");
    }

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
            } else if (responses.channels === 2) {
                console.log("You are probably not very well informed");
            } else {
                console.log(Responses[Response]);
            }
        });
})