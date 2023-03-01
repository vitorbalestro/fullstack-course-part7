import axios from 'axios'

const baseUrl = 'https://restcountries.com/v3.1/name'

function getBySubstring(substring){

    const request = axios.get(`${baseUrl}/${substring}`)
    return request.then(response => response.data)
}

export default getBySubstring;