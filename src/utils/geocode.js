const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoic291bXlhZGVlcDEzOTciLCJhIjoiY2t1c2RoM3dyMDk2NTJ3bHR3bHNiZDE1NiJ9.3vn3lrgeI1-AbgfYvIV3jw'

    // request({url: url, json:true},(error, response) => {
    //     if(error){
    //         callback('Unable to connect to location services')
    //     }else if (response.body.features.length === 0){
    //         callback('Unable to find coordinates. Please try with different search place')
    //     }else{
    //         callback(undefined,{
    //             latitude: response.body.features[0].center[1],
    //             longitude: response.body.features[0].center[0],
    //             location: response.body.features[0].place_name
    //         })
    //     } 
    // })

    request({url, json:true},(error, {body}) => {
        //console.log(response)
        if(error){
           // console.log(error)
            callback('Unable to connect to location services')
        }else if (body.features.length === 0){
            callback('Unable to find coordinates. Please try with different search place')
        }else{
            callback(undefined,{
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        } 
    })
}

module.exports = geocode