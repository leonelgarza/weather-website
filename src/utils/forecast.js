const request = require('postman-request')

const forecast = (latitude, longitude, unit, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=2ebf3370940729ffafaccfaa863ec9c5&query='+ latitude + ',' + longitude + '&units=' + unit
    const units = (unit === 'm')? "C" : "F"
    request({url, json: true}, (error, {body} = {}) => {
        if (error){
            callback('Can\'t connect to weather forecast server', undefined, undefined)
        } else if (body.error) {
            callback('Can\'t find the weather forecast. try another search', undefined, undefined)
        } else {
            callback(undefined, 'It is currently '+ body.current.weather_descriptions + ', the temperature is '+ body.current.temperature + '°'+ units +', and it feels like ' + body.current.feelslike + '°' + units + ' and the humidity is ' + body.current.humidity + '%', body.current.weather_icons)
            }
    })
}

module.exports = forecast