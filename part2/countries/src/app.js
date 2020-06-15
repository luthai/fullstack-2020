import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './app.css'


const FindCountry = ({ countries, filterName, filterCountries }) => {
  if (filterName === '')
    return null
  
  if (filterCountries.length > 10)
    return (<div>Too many matches, specify another filter.</div>)
  else if (filterCountries.length === 1)
    return null
  else {
    return (  
      <ul className="no-bullets">
          {filterCountries.map(country => <List key={country.name} value={country.name} />)}
      </ul>
    )
  } 
}

const List = ({ value }) => {
  return (
    <li>{value}</li>
  )
}

const DisplayCountry = ({ filterCountries }) => {
  if (filterCountries.length !== 1)
    return null

  return (
    <div>
      <h1>{filterCountries[0].name}</h1>
      <div>
        capital {filterCountries[0].capital}
        <br></br>
        population {filterCountries[0].population}
      </div>
      <div>
        <h2>Languages</h2>
        <ul>
          {filterCountries[0].languages.map(language => 
            <List key={language.name} value={language.name} />
          )}
        </ul>
        <img src={filterCountries[0].flag} alt={filterCountries[0].name} width="96" height="96" /> 
      </div>
    </div>     
  )
}

const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ filterName, setFilterName ] = useState('')

  const hook = () => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }

  useEffect(hook, [])

  let filterCountries = countries.filter(country => 
    country.name.toUpperCase().includes(filterName.toLocaleUpperCase()))
  
  const handleFilterName = (event) => {
    setFilterName(event.target.value)
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
      <FindCountry 
        countries={countries} 
        filterName={filterName} 
        filterCountries={filterCountries}
      />
      <DisplayCountry filterCountries={filterCountries} />
    </div>
  )
}

export default App