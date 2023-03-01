import { useState, useEffect } from 'react'
import getWeatherReport from '../services/weather.js'


const DisplayCountryInfo = ({ country }) => {

    const lat = country.capitalInfo.latlng[0].toString()
    const lng = country.capitalInfo.latlng[1].toString()
   
   
    const [weatherInfo, setWeatherInfo] = useState(null)
    let temperature
    let wind
    let icon
    let imgUrl

    useEffect(() => {
            getWeatherReport(lat,lng).then(response=>setWeatherInfo(response))
        },[lat,lng])
        
   
    if(weatherInfo){
        temperature = (weatherInfo.main.temp - 273.15).toFixed(1)
        wind = (weatherInfo.wind.speed).toFixed(2)
        icon = (weatherInfo.weather[0].icon)
        imgUrl = ` http://openweathermap.org/img/wn/${icon}@2x.png`
   
    }
  
    const languagesMap = country.languages
    const languages = Object.values(languagesMap)
    
    const capital = country.capital
    const weatherHeader = `Weather in ${capital}`
    
    
    return (
            
        <div>
            <h1>{country.name.common}</h1>
            <div>capital {country.capital}</div>
            <div>area {country.area}</div>
            <h2>languages:</h2>
            <ul>
                {languages.map(lang => <li key={country.name.common+lang}>{lang}</li>)}
            </ul>
            <div style={{fontSize: 150}}>{country.flag}</div>
            <h2>{weatherHeader}</h2>
            <p>temperature {temperature} Celsius</p>
            <img src={imgUrl} alt='not found'/>
            <p>wind {wind} m/s</p>
        </div>
    )
}

const DisplayCountries = ({ countries, filter, notFound }) => {
    const [showSingleCountry, setShowSingleCountry] = useState(false)
    const [countryToShow, setCountryToShow] = useState(null)

    const CountryLine = ({ country }) => {
       
        return (
            <div>
                {country.name.common} &nbsp;
                <button onClick={()=>{
                    setShowSingleCountry(true)
                    setCountryToShow(country)
                }}>show</button>
            </div>
        )
    }

    

    useEffect(()=>{
        setShowSingleCountry(false)
        setCountryToShow(null)
    },[filter])

    if(notFound){
        return (
            <p>No matches</p>
        )
    }
    if(countries.length === 0 || filter === ''){
        return (
            <p></p>
        )
    }
    if(countries.length > 10){ 
        return (
            <p>'Too many matches, please specify another filter</p>
        )
    }
    if(countries.length === 1){
        
        return (
            <DisplayCountryInfo country={countries[0]} />
        )
    }
    if(showSingleCountry){
        return(
            <DisplayCountryInfo country={countryToShow} />
        )
    }
    return(
        <div>
            {countries.map(entry => <CountryLine key={entry.name.common} country={entry} />)}
        </div>
    )
}

export default DisplayCountries;