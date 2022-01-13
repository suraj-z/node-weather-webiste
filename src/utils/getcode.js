const request = require('request');
const getcode=(address , callback)=>{
    const geocodeURL= 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+(address)+'.json?access_token=pk.eyJ1Ijoic3VyYWpzeiIsImEiOiJja3k5eDY5bnAwYXBsMm9wbnNjYTFjZmliIn0.J7YP6NN8vzswWRiSAKkGgA';
    request({url:geocodeURL , json:true} , (error, {body}) =>{
            if(error){
                callback('Opps.., Unable to load "Weather Services". ' ,undefined);
            }
            else if(body.features.length === 0){
                callback('Unable to Track The Location. Please enter valid Inputs!' ,undefined)
            }
            else{ callback(undefined, {
                latitude : body.features[0].center[1],
                longitude : body.features[0].center[0],
                location : body.features[0].place_name,
                })
                
            }
    })
    
}

module.exports= getcode;