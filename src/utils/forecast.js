const request = require('request');

const forecast = (latitude,longitude,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=102c76f890f926fd9e1db70931f89a85&query='+latitude+ ',' +longitude ;
    request({url, json:true} , (error, {body}) => {
        if(error){
            callback('Opps, Unable to connect to "Weather Services"!' ,undefined);
        }
        else if(body.error){
            callback('Unable to Track the Location. Please Try Again!' ,undefined);
        }
        else{
            callback(undefined , 'in ' +body.location.name + ', The Temperature is ' +body.current.temperature + ' & there is ' +body.current.weather_descriptions[0] + ' atmosphere');
        }
    })

}

module.exports= forecast;

/*
const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/9d1465c6f3bb7a6c71944bdd8548d026/' + latitude + ',' + longitude

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. There is a ' + body.currently.precipProbability + '% chance of rain.')
        }
    })
}

module.exports = forecast
*/