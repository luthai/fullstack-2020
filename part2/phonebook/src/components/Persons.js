import React from 'react'

const Persons = ({ persons, filterName, deletePerson }) => {
  return (
    <ul className="no-bullets">
      {persons.filter(person => 
        person.name.toUpperCase().includes(filterName.toUpperCase())).map(p => 
        <Person key={p.name} person={p} deletePerson={deletePerson}/>
      )}
    </ul>
  )
}

const Person = ({ person, deletePerson }) => 
  <li>
    {person.name} {person.number}
    <button onClick={() => deletePerson(person.id)}>delete</button>  
  </li>

export default Persons