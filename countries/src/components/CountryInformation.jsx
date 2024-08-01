import {useState, useEffect} from 'react';  
import axios from 'axios';

const API_KEY = import.meta.env.VITE_SOME_KEY;

const CountryInformation = ({countryInformation}) => {
    const [weather, setWeather] = useState({});

    useEffect(() => {
        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?q=${(countryInformation.capital)[0]}&appid=${API_KEY}&units=metric`)
            .then((response) => {
                setWeather(response.data);
            });
    }, [countryInformation.capital]);

    return(
        <div>
            <h1>{countryInformation.name.common}</h1>
            <div>
            <strong>Capital: {countryInformation.capital}</strong>
            </div>
            <div>
            <strong>Population: {countryInformation.population}</strong>
            </div>
            <div>
            <strong>Area: {countryInformation.area} km²</strong>
            </div>
            <div>
            <strong>Currency: </strong>
            <ul>
                {Object.values(countryInformation.currencies).map((currency) => (
                    <li key={currency.name}>{currency.name} ({currency.symbol})</li>
                ))}
            </ul>
            </div>
            <div>
            <strong>Languages: </strong>
            <ul>
                {Object.values(countryInformation.languages).map((language) => (
                    <li key={language}>{language}</li>
                ))}
            </ul>
            </div>
            <img src={countryInformation.flags.png} alt="flag" style={{width: '100px'}} />
            <h2>Weather in {(countryInformation.capital)[0]}</h2>
            <p>Temperature: {weather.main?.temp} Celsius</p>
            <p>Wind: {weather.wind?.speed} m/s</p>
            <p>Description: {weather.weather?.[0].description}</p>
        </div>
    )
}

export default CountryInformation;