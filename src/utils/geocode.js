const request = require('postman-request')

const geocode = (adress, callback) => {
    const url = 'http://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(adress) +'.json?access_token=pk.eyJ1IjoibGVvbmVsZ2w4NiIsImEiOiJja3pyaHc1dXQwMXRtMndvZHhmODJvZ3QzIn0.urVn9bCG7mCQ-5RdgbTBEA&limit=1'
    console.log(url)
    request({url, json: true}, (error, {body} = {}) => {
        if (error){
            callback('Can\'t connect to geolocation server', undefined)
        } else if (body.features.length===0) {
            callback('Address can\'t be found. try another search', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
        
    })
}

module.exports = geocode