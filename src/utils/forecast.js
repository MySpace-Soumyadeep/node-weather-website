const request = require('request')

const forecast = (latitude,longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=5c316ed21c08dd8aeba2eb5d06f8cd07&query='+latitude+','+longitude

    // request({url: url, json:true},(error, response) => {
    //     if(error){
    //         callback('Unable to connect to weather service')
    //     }else if (response.body.error){
    //         callback('Unable to find location')
    //     }else{
    //         callback(undefined,{
    //             temperature: response.body.current.temperature,
    //             feelsLike: response.body.current.feelslike
    //         })
    //     }
    // })
    request({url, json:true},(error, {body}) => {
        if(error){
            callback('Unable to connect to weather service')
        }else if (body.error){
            callback('Unable to find location')
        }else{
            callback(undefined, {
                temperature: body.current.temperature,
                feelsLike: body.current.feelslike
            })
        }
    })
}

module.exports = forecast