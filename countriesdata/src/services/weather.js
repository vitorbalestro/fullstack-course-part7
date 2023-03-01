import axios from "axios"

const api_key = process.env.REACT_APP_API_KEY

function getWeatherReport(lat,lng){
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${api_key}`
    const request = axios.get(url)
    return request.then(response=>response.data)
}

export default getWeatherReport;