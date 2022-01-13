const express = require('express');
const hbs=require('hbs');
const path=require('path');


const geocode=require('./utils/getcode');
const forecast=require('./utils/forecast')

const app = express()


//paths for express configurations
const publicdirectorypath=path.join(__dirname, '../public');
const viewspath=path.join(__dirname , '../templates/views');
const partialpath=path.join(__dirname , '../templates/partials');


//for handlers engine and views path
app.set('view engine' , 'hbs');
app.set('views' , viewspath)
hbs.registerPartials(partialpath);


//set up static directory sever
app.use(express.static(publicdirectorypath));

app.get('' , (req,res)  => {
    res.render('index' , {
        title : 'Weather Forecasting App.' ,
        owner : 'Suraj Zurange',
        about_us : 'Use this site for weather updates'
    });
})

app.get('/about' , (req,res)  => {
    res.render('about' , {
        title : 'About' ,
        // owner : 'Suraj Zurange',
        about_us : 'Use this site for weather updates'
    });
})

app.get('/help' , (req,res) =>{
    res.render('help' , {
        title : 'Help' ,
        // owner : 'Suraj Zurange',
        help : 'Use this site for weather updates'
    })
})

app.get('/weather' , (req,res) => {
    if(!req.query.address){
       return res.send({
           Error : 'Please enter Address'
    })
}

geocode(req.query.address , (error, {latitude, longitude, location} = {}) =>{
    if(error){
        return res.send({error })
    }
    forecast(latitude,longitude, (error, forecastData) =>{
        if(error){
            return res.send({error})
        }
        res.send ({
            forecast: forecastData,
            location,
            address: req.query.address
        })

    })
})
    // res.send({
    //         location : req.query.address
    // })
})


app.get('*' , (req,res) =>{
    res.render('404' , {
        title : '404- Not Found.' ,
        owner : 'The Page you are looking for doesnt exist or an other error occured.',
        errormessage : 'Go to Home Page'
    })
})


app.get('/help/*' , (req,res) =>{
    res.render('404' , {
        title : '404- Not Found.' ,
        owner : 'The Page you are looking for help section doesnt exist or an other error occured.',
        errormessage : 'Go to Home Page'
    })
})







// app.get('', (req, res) => {
//     res.send('Hello! You are on Home Page');
// })
// app.get('/career', (req, res) => {
//     res.send('Hello! You are on Career Page');
// });
// app.get('/documentation', (req, res) => {
//     res.send('Hello! You are on Documentation Page');
// });0
// app.get('/object', (req, res) => {
//     res.send([{name:'suraj'},
//     { age : 22}])
// });
app.listen(3000, () => {
    console.log('hello Expresss');
})