import React, { useState, useEffect } from "react";

const APIKEY = "54b44eee6a978fd43b89a4694606f143";
const MAPKEY = "AIzaSyBSihlmUndb3oulieyYlVzwo7yqoyijk9M";

// External API profile, create Internal later - for user stations
const initWeather = {
    // Weather stuff. Declares and zeroes
    mainWeather: null,                              // Main weather description
    weatherDetail: null,                            // More details 
    // Visual - icons
    //icon: null,                                     // Fetch corresponding image. Download this once at start, then display
    // Temperature
    //temp: null,                                     // Add feelslike, max/min
    //pressure: null,
    //humidity: null,
    // Atmosphere
    //visibility: null,
    //wind: null,
    //clouds: null,
    // Meta data
    //country: null,
    //name: null,
    //timezone: null,
    //lon: null,
    //lat: null,
    // Sun set/rise
    //sunrise: null,
    //sunset: null,
};
// Store icons in an array of sorts? - useEffect 
// Get location, also have a user input for it, again useEffect
// Could use IP, however is invasive and wont work in development

function Weather() {
    // Maybe have one detailed and one simple version?
    const [weatherData, setWeather] = useState(initWeather);

    // Gets user location to get apropriate weather data 
    function getLocationWeather() {
        async function getWeather(CITY) {
            // const response = await fetch(`api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${APIKEY}`);
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${APIKEY}`);
            const json = await response.json();
            console.log(json);

            // Writes the received data
            setWeather({
                mainWeather: json.weather[0].main,
                weatherDetail: json.weather[0].description,
            });
        }

        // Uses longitude and latitude to work out closest city
        async function getCity(LAT, LON) {
            console.log(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${LAT},${LON}&key=${MAPKEY}`);
            const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${LAT},${LON}&key=${MAPKEY}`);
            const json = await response.json();
            console.log(json);

            let CITY = json.results[4].formatted_address;                          // Change source here should there be an issue returning wrong city
            console.log(CITY);

            var CITYFormatted = "";                                                // Init, declare
            // Format to get the first word/city
            for (let i = 0; CITY.substring(i, i + 1) !== " "; i++) {
                CITYFormatted = CITYFormatted + CITY.substring(i, i + 1);
            }
            console.log(CITYFormatted);
            getWeather(CITYFormatted);
        }

        // These are settings for the geolocator. Explanation can be found at: https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition
        var options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        };
        // Writes received values to variables
        function success(pos) {
            var crd = pos.coords;
            let LON = crd.longitude;
            console.log(LON);
            let LAT = crd.latitude;
            console.log(LAT);
            // Unsure whether this will cause issues as it's inside a callback function, Either way - calls to work out nearest city
            getCity(LAT, LON);
        }
        // Error handler
        function error(err) {
            alert(`ERROR(${err.code}): ${err.message}`);
        }
        // Gets co-ordinates 
        navigator.geolocation.getCurrentPosition(success, error, options);         // Gets longitude and latitude
    }

    useEffect(() => {
        getLocationWeather();                                                      // Gets weather based on user location
        // Also, get icons here
        // This should be called by a button too
        // getWeather();                                                           // Gets weather
    }, [])

    return (
        <div className="weatherMain">
            <h2>Weather Data</h2>
            <h3>{`Main: ${weatherData.mainWeather}`}</h3>
            <h3>{`Description: ${weatherData.weatherDetail}`}</h3>
        </div>
    );
}

export default Weather;