var axios = require('axios');

var config = {
    method: 'get',
    url: `https://maps.googleapis.com/maps/api/distancematrix/json?origins=4710+dakota+ave&destinations=${process.argv[2]}&units=imperial&key=AIzaSyCbwuhNvOJQrYWnLRF6WjzJeOcnhYYfpZA`,
    headers: {}
};

axios(config)
    .then(function(response) {
        var a = (JSON.stringify(response.data.rows));
        const Directions = a.slice(79, 94);
        console.log(Directions)
    })
    .catch(function(error) {
        console.log(error);
    });
