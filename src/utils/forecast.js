const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=2ebf3370940729ffafaccfaa863ec9c5&query='+ latitude + ',' + longitude 
    request({url, json: true}, (error, {body} = {}) => {
        if (error){
            callback('No se puede conectar a servidor de pronostico del tiempo', undefined)
        } else if (body.error) {
            callback('No se puede encontrar el pronostico del tiempo. Intente otra busqueda' + url, undefined)
        } else {
            callback(undefined, 'Actualmente se encuentra '+ body.current.weather_descriptions + ' y la temperatura es de '+ body.current.temperature + '°C al exterior y se siente ' + body.current.feelslike + '°C')
            }
    })
}

module.exports = forecast