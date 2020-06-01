import React, { useState } from 'react'
import './App.css'

const Person = ({ person }) => 
  <li>{person.name}</li>

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ])
  const [ newName, setNewName ] = useState('')

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul class="no-bullets">
        {persons.map(person => 
          <Person person={person} />
        )}
      </ul>
    </div>
  )
}

export default App