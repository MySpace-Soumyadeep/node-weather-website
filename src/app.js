const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require('./utils/geoCode')
const forecast = require('./utils/forecast')

// console.log(__dirname)
// console.log(path.join(__dirname, "../public"))

const app =express()

//define paths for express config
const publicPath = path.join(__dirname, "../public")
const viewPath = path.join(__dirname,"../templates/views")
const partialsPath = path.join(__dirname,"../templates/partials")

//set up handlebars engine and view location
app.set('view engine','hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

//set up static directory to serve
app.use(express.static(publicPath))

//HOME PAGE
app.get('', (req,res) => {
    res.render('index', {
        title:'Weather',
        name: 'Soumyadeep'
    })
})

//ABOUT PAGE
app.get('/about', (req,res) => {
    res.render('about',{
        title:'About me',
        name: 'Soumyadeep'
})
})

//HELP PAGE
app.get('/help', (req,res) => {
    res.render('help',{
        title:'Help',
        helpText: 'These should be helpful.',
        name: 'Soumyadeep'
})
})

app.get('/weather', (req,res) => {

    if(!req.query.address)
    {
        return res.send({
            error: 'You must provide a location'
        })
    }

    geoCode(req.query.address,(error, {latitude, longitude, location}={}) =>{
        //console.log('Data:', data)
        if(error){
            return res.send({error})
        }
        
        forecast(latitude,longitude,(error,forecastData) => {
            if(error){
                return res.send({error})
            }
            res.send({
                location,
                forecast: forecastData
        })
        })
    })


})

app.get('/products',(req,res)=> {

    if(!req.query.search)
    {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        product:[]
    })
})

app.get('/help/*',(req,res) => {
    res.render('404Page', {
        title: '404 Page Not Found', 
        msg: 'Help article not found :(',
        name: 'Soumyadeep'
    })
})

app.get('*',(req,res) => {
    res.render('404Page', {
        title: '404 Page Not Found',
        msg: 'Page not found :(',
        name: 'Soumyadeep'
    })
})

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})