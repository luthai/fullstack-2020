import React, { useState, useEffect } from 'react'
import './App.css'
import personService from './services/persons'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Notification from './components/Notification'
import ErrorNotification from './components/ErrorNotification'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterName, setFilterName ] = useState('')
  const [ message, setMessage ] = useState(null)
  const [ errorMessage, setErrorMessage ] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPerson => {
        setPersons(initialPerson)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    if (newName === '')
      return null
    
    let found = persons.find(person => person.name === newName)
    if(found === undefined) {
      if (newNumber === '') {
        window.alert(`Please enter a number.`)
        return null    
      }
        
      const personObject = {
        name: newName,
        number: newNumber
      }
  
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setMessage(`Added ${returnedPerson.name}`)
        })
        .catch(error => {
          const errorMessage = error.response.data
          setErrorMessage(errorMessage.error)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
      
      setTimeout(() => {
        setMessage(null)
      }, 5000) 
    } else {
      if ((newNumber === '') || (found.number === newNumber)) {
        window.alert(`${newName} is already added to phonebook`)
        return null
      } else {
        let confirm = window.confirm(`${newName} is already added to phonebook, 
          replace the old number with a new one?`)
        if (confirm) {
          const personObject = {
            name: newName,
            number: newNumber
          }

          personService
            .update(found.id, personObject)
            .then(returnedPerson => {
              setPersons(persons.map(person => person.id !== found.id ? person : returnedPerson))
            })
            .catch(error => {
              if (error.response.status === 400) {
                const errorMessage = error.response.data
                setErrorMessage(errorMessage.error)
              } else if (error.response.status === 404) {
                setErrorMessage(`${found.name} was already removed from server.`)
              }
              setTimeout(() => {
                setErrorMessage(null)
              }, 5000)
              setPersons(persons.filter(person => person.id !== found.id))
            })
        }
      }     
    }
  }

  const deletePerson = (id) => {
    const personName = persons.find(person => person.id === id).name
    if (window.confirm(`Delete ${personName}?`)) {
      personService
        .deletePerson(id)
        .then(returnedPerson => {
          setPersons(returnedPerson)
        })
        .catch(error => {
          setErrorMessage(`${personName} was already removed from server.`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          setPersons(persons.filter(person => person.id !== id))
        })
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
      <Notification message={message} />
      <ErrorNotification errorMessage={errorMessage} />
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
        deletePerson={deletePerson}
      />
    </div>
  )
}

export default App