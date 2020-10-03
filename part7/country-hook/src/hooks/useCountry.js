import { useState, useEffect } from 'react'
import axios from 'axios'

export const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    axios
      .get(`https://restcountries.eu/rest/v2/name/${name}?fullText=true`)
      .then(response => {
        setCountry({found: true, data: response.data[0]})
      })
      .catch(error => {
        setCountry({ found: false, data: ''})
        console.log(error)
      })
  }, [name])

  return country
}