const request=require('request');

const geocode= (address,callback) =>{
    const url= 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiZ2FsZXgiLCJhIjoiY2sxNDAzeTB2MGMxZTNjcnEzNHI5am50NiJ9.6567oMCCyGPTU8hFuctM-g&limit=1';  
    request ({ url, json:true}, (error, {body})=>{
        if(error){
                // console.log()
                callback('There is no access to the coordinates API. Check your network connection',undefined);
        }else if(body.message){
              callback(body.message)
        }else if(body.features.length===0){
                callback('No match found for the Location entered');
    }else{
       
        
   callback(undefined, {
       latitude: body.features[0].center[0],
       longtitude: body.features[0].center[1],
       location: body.features[0].place_name
    })

    }
  })
}
module.exports=geocode