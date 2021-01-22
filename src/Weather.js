import React, { useState, useEffect } from "react";

const APIKEY = "54b44eee6a978fd43b89a4694606f143";
const MAPKEY = "AIzaSyBSihlmUndb3oulieyYlVzwo7yqoyijk9M";

// External API profile, create Internal later - for user stations
const initWeather = {
    // Weather stuff. Declares and zeroes
    main: null,                             // Main weather description
    description: null,                      // More details 
    // Visual - icons   
    icon: null,                             // Fetch corresponding image. Download this once at start, then display
    // Temperature
    temp: null,                             // Add feelslike, max/min
    pressure: null,
    humidity: null,
    // Atmosphere
    visibility: null,
    wind: null,
    clouds: null,
    // Meta data
    country: null,
    name: null,
    timezone: null,
    lon: null,
    lat: null,
    // Sun set/rise
    sunrise: null,
    sunset: null,
};
// Store icons in an array of sorts? - useEffect 
// Get location, also have a user input for it, again useEffect
// Could use IP, however is invasive and wont work in development


// Gets user location to get apropriate weather data 
/*
function getLocation() {
    // Uses longitude and latitude to work out closest city
    
    async function getCity() {
        const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${LAT},${LON}&key=${MAPKEY}`);
        const json = await response.json();
    }
   
    // Gets lonitude and latitude
    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };
    function success(pos) {
        var crd = pos.coords;
        const LON = crd.longitude;
        const LAT = crd.latitude;
    }
    function error(err) {
        alert(`ERROR(${err.code}): ${err.message}`);
    }
    navigator.geolocation.getCurrentPosition(success, error, options);

    getCity();
}
*/
function Weather() {
    const [weatherData, setWeather] = useState(initWeather);

    useEffect(() => {
        // Get icons
        getLocation();                                  // Gets user location
        // This should be called by a button too
        getWeather();                                   // Gets weather
    }, [])

    // Maybe have one detailed and one simple version?
    async function getWeather() {
        // const response = await fetch(`api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${APIKEY}`);
        const response = await fetch(`api.openweathermap.org/data/2.5/weather?q=Stockholm&appid=${APIKEY}`);
        const json = await response.json();

        // Writes the received data
        setWeather({
            main: json.main,
            description: json.description,
        });
    }

    return (
        <div className="weatherMain">
            <h2>Weather Data</h2>
            <h3>{`Main: ${weatherData.main}`}</h3>
            <h3>{`Description: ${weatherData.description}`}</h3>
        </div>
    );
}

export default Weather;