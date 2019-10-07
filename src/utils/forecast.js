const request= require('request');
const lang='en';
const units='si';

const forecast=(longtitude,latitude,callback)=>{
    const url = 'https://api.darksky.net/forecast/ea050ddffd20ca8e996cc1a49c65b254/'+longtitude+','+latitude+'?units=si&lang=en';
    
    request({ url, json:true}, (error,{body})=> {
            if(error){
                callback('Network down! no access to the API',undefined)
            } else if (body.error){
                callback(body.error,undefined)
            }else{
        callback(undefined,body.daily.data[0].summary +'The temperature is : ' + body.currently.temperature + ' with ' + body.currently.precipProbability + '% to rain');
            }
    
    })
}

module.exports=forecast