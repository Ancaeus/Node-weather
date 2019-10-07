const express=require('express');
const path= require('path')
const fs= require('fs');
const hbs=require('hbs');
//const requst=require('request');
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')






console.log(__dirname);
//define paths for Express config
const publicDirectoryPath=(path.join((__dirname),'../public'));
const publicViewsPath = (path.join((__dirname),'../templates/views'));
const partialsPath =(path.join((__dirname),'../templates/partials'));


const app = express();
const port= process.env.PORT || 3000;
//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views',publicViewsPath)
hbs.registerPartials(partialsPath)


//Setup static directory to use
app.use(express.static(publicDirectoryPath))





app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather Application',
        description: 'Weather Forcast'
    })

})

app.get('/help',(req,res)=>{

    res.render('help',{
        title:'Help Page',
        description:'This is the help page'
    })
})

app.get('/about',(req,res)=>{

    res.render('about',{
        title:'About Page!',
        description:'About me!'
    })
})
app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }else{
        console.log(req.query.search);
        res.send({
            
            products:[{
                title:'Otinanai',
                rating:'5'},
                {
                    title:'Whatever',
                    rating:'3'
                }
            ]
        })
    }


})




app.get('/weather',(req,res)=>{
    if(!req.query.address){
        res.send({
            error:'Please add an address'
        })
    }else{
        geocode(req.query.address,(error,{latitude, longtitude, location} ={})=>{
            if(error){
               return res.send({ error})
            }
    console.log(latitude,longtitude,location)
            forecast(latitude,longtitude,(error,forecastData)=>{
                if(error){
                   return  res.send({ error })

                }else{
                    res.send({
                        forecast: forecastData,
                        location,
                        address:req.query.address
                    })
                }
            })

        })
        
        
}
})

app.get('*',(req,res)=>{
  
    res.send('Page is not found 404')


})




app.listen(port,()=>{

        console.log('Server is up on port' + port)

})