import React from 'react'

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

export default PersonForm