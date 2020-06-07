import React, { useState } from 'react'
import './App.css'

const Person = ({ person }) => 
  <li>{person.name} {person.number}</li>

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ filterName, setFilterName] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    let nameExist = false
    persons.forEach(function(person) {
      if (person.name === newName) {
        window.alert(`${newName} is already added to phonebook`)
        nameExist = true
      }
    })
    
    if (newName === '') {
      nameExist = true
    }
    
    if (nameExist === false) {
      const personObject = {
        name: newName,
        number: newNumber
      }
  
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterNameChange = (event) => {
    setFilterName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          filter shown with
          <input 
            value={filterName}
            onChange={handleFilterNameChange}
          />
        </div>
      </form>
      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: 
          <input 
            value={newName}
            onChange={handleNameChange}
          />
        </div>
        <div>
          number:
          <input
            value={newNumber}
            onChange={handleNumberChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul className="no-bullets">
        {persons.filter(person => 
          person.name.toUpperCase().includes(filterName.toUpperCase())).map(p => 
          <Person key={p.name} person={p} />
        )}
      </ul>
    </div>
  )
}

export default App