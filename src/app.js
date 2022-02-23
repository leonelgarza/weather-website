const path = require('path')
const express = require('express') 
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 4000

//define paths for Expressconfig
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../tampletes/views')
const partialsPath = path.join(__dirname, '../tampletes/partials')

//Setup handlersbars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directroy to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req, res)=> {
    res.render('index', {
        title: 'Weather',
        name: 'Leonel Garza'

    })
})

app.get('/about',(req, res)=> {
    res.render('about', {
        title: 'About me',
        name: 'Leonel Garza'

    })
})

app.get('/help',(req, res)=> {
    res.render('help', {
        title: 'Help page',
        name: 'Leonel Garza',
        HelpMsg: 'FAQs y ayuda'

    })
})

app.get('/weather', (req, res)=>{
    if (!req.query.address){
        return res.send({
            error: '¡Debes introduccir una dirección para la busqueda!'})
    } else {
        geocode(req.query.address,  (error, {latitude, longitude, location} = {}) => {
            if (error) {
                return res.send({
                    error})
            } else  {
            forecast(latitude, longitude, (error, forecastData) => {
                if (error){
                    return res.send({
                        error})
                } else {
                    res.send({
                        forecast: forecastData,
                        location,
                        address: req.query.address
                    })
                }
            })
            }
        })
    }
})

/* app.get('/products', (req, res)=> {
    if (!req.query.search) {
        return res.send({
            error: 'Debes introduccir una busqueda'
        })
    } 

    console.log(req.query.search)
    res.send({
        products: []
    })
}) */

app.get('/help/*', (req, res)=>{
    res.render('404', {
        title: 'ERROR 404!',
        name: 'Leonel Garza',
        ErrorMsg: 'Articulo de ayuda no encontrado'

    })
})

app.get('*', (req, res)=>{
    res.render('404', {
        title: 'ERROR 404!',
        name: 'Leonel Garza',
        ErrorMsg: 'Pagina no encontrada'

    })
})

app.listen(port, () => {
    console.log('Server is up on port '+ port + '.')
})