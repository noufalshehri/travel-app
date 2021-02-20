// Require Express to run server and routes
const express = require('express')
//Middleware
// configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser')
// Cors for cross origin allowance
const cors = require('cors')
//require window.fetch to Node.js
const fetch = require('node-fetch')
// Start up an instance of app
const app = express()
//to create environment variables 
const dotenv = require('dotenv')
dotenv.config()
//use all of the required packages
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static('dist'))

//get request 
app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

//APIs variables
// Geonames 
const GeonamesURL = 'http://api.geonames.org/searchJSON?q=';
const GeonamesKey = process.env.GEONAMES_KEY;

// Weatherbit 
const weatherbitURL = 'https://api.weatherbit.io/v2.0/forecast/daily?';
const weatherbitKey = process.env.WEATHERBIT_KEY;

// Pixabay 
const pixabayURL = 'https://pixabay.com/api/?';
const pixabayKey = process.env.PIXABAY_KEY;


//post request
app.post('/add', async (req, res) => {
    //user destination
    let destination = req.body.destination;
    //fetch from Geonames API in English 
    let response = await fetch(`${GeonamesURL}${destination}&username=${GeonamesKey}`)
    let data = await response.json()
    let lng = data.geonames[0].lng;
    let lat = data.geonames[0].lat;
    let countryName = data.geonames[0].countryName;
    //fetch from Geonames API in Arabic
    response = await fetch(`http://api.geonames.org/searchJSON?lang=ar&q=${destination}&username=${GeonamesKey}`)
    data = await response.json()
    let countryNameAr = data.geonames[0].countryName;
    //fetch from weatherbit API in English
    response = await fetch(`${weatherbitURL}&lat=${lat}&lon=${lng}&days=16&key=${weatherbitKey}`)
    data = await response.json()
    let temp = data.data[0].temp
    let description = data.data[0].weather.description
    //fetch from weatherbit API in Arabic
    response = await fetch(`${weatherbitURL}&lang=ar&lat=${lat}&lon=${lng}&days=16&key=${weatherbitKey}`)
    data = await response.json()
    let descriptionAr = data.data[0].weather.description
    //fetch from pixabay API
    response = await fetch(`${pixabayURL}key=${pixabayKey}&q=${destination}&image_type=photo&safesearch=true`)
    data = await response.json()
    let image = data.hits[0].largeImageURL;
    //send all the data to the client side
    const projectData = {
        temp: temp,
        description: description,
        descriptionAr: descriptionAr,
        countryName: countryName,
        countryNameAr: countryNameAr,
        image: image
    }
    res.send(projectData)
})

//to be imported by the server and tested by jest
module.exports = app;
