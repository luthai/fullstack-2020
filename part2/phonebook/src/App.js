import React, { useState } from 'react'
import './App.css'


const Filter = ({ text, value, onChange }) => {
  return (
    <form>
      <div>
        {text} 
        <input 
          value={value}
          onChange={onChange}
        />
      </div>
    </form>
  )
}

const PersonForm = ({ onSubmit, newName, onNameChange,
  newNumber, onNumberChange }) => {
  return (
    <form onSubmit={onSubmit}>
      <PersonInput 
        text="name:"
        value={newName}
        onChange={onNameChange}
      />
      <PersonInput 
        text="number:"
        value={newNumber}
        onChange={onNumberChange}
      />
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const PersonInput = ({ text, value, onChange }) => {
  return (
    <div>
      {text} 
      <input 
        value={value}
        onChange={onChange}
      />
    </div>
  )
}

const Persons = ({ persons, filterName }) => {
  return (
    <ul className="no-bullets">
      {persons.filter(person => 
        person.name.toUpperCase().includes(filterName.toUpperCase())).map(p => 
        <Person key={p.name} person={p} />
      )}
    </ul>
  )
}

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
      <Filter
        text="filter shown with"
        value={filterName}
        onChange={handleFilterNameChange}
      />
      <h3>Add a new</h3>
      <PersonForm 
        onSubmit={addPerson}
        newName={newName}
        onNameChange={handleNameChange}
        newNumber={newNumber}
        onNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons
        persons={persons}
        filterName={filterName}
      />
    </div>
  )
}

export default App