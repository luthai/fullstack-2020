import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './app.css'


const FindCountry = ({ filterName, countries, findCountry}) => {
  if (filterName.length === '')
    return null

  let filterCountries = countries.filter(country => 
    country.name.toUpperCase().includes(filterName.toLocaleUpperCase()))
    
  if (filterCountries.length > 10)
    return <div>Too many matches, specify another filter.</div>
  else if (filterCountries.length === 1)
    return <DisplayCountry country={filterCountries[0]} />
  else {
    return (  
      <ul className="no-bullets">
      {filterCountries.map(country => 
        <li key={country.name}>
          {country.name}
          <button className="button" onClick={() => findCountry(country)}>show</button>
        </li>  
      )}
    </ul> 
    )
  }
}
    
const DisplayCountry = (props) => {
  if (Array.isArray(props.country)) 
    return null
  
  return (
    <div>
      <h1>{props.country.name}</h1>
      <div>
        capital {props.country.capital}
        <br></br>
        population {props.country.population}
      </div>
      <div>
        <h2>Languages</h2>
        <ul>
          {props.country.languages.map(language => 
            <li key={language.name}>{language.name}</li>
          )}
        </ul>
        <img 
          src={props.country.flag} 
          alt={props.country.name} 
          width="96" height="96" /> 
        </div>
    </div>
  )
}

const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ selectedCountry, setSelectedCountry ] = useState([])
  const [ filterName, setFilterName ] = useState('')

  const hook = () => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }

  useEffect(hook, [])
  
  const handleFilterName = (event) => {
    setFilterName(event.target.value)
    setSelectedCountry(null)
  }

  const findCountry = (country) => {
    setSelectedCountry(country)
  }  

  return (
    <div>
      <form>
        find countries
        <input 
          value={filterName}
          onChange={handleFilterName} 
        />
      </form>
      {(selectedCountry === null)
        ? <FindCountry 
            filterName={filterName} 
            countries={countries} 
            findCountry={findCountry} 
          />  
        : <DisplayCountry country={selectedCountry} />
      }
    </div>
  )
}

export default App