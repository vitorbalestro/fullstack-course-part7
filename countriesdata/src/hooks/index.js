import { useState, useEffect } from 'react'
import getBySubstring from '../services/countries.js'

export const useCountry = (filter) => {

    const [countries, setCountries] = useState([])
    const [notFound, setNotFound] = useState(false)

    useEffect(() => {
        if(filter){
          getBySubstring(filter).then(response =>{ 
            setCountries(response)
            setNotFound(false)
          })
            .catch(error => {
              setNotFound(true)
            })
        }
      },[filter])

    return { 
        countries,
        notFound,
    }
}