import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { ALL_AUTHORS, UPDATE_AUTHOR } from '../queries'
import Select from 'react-select'

const Authors = (props) => {
  const [birthyear, setBirthyear] = useState('')
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const options = []

  const result = useQuery(ALL_AUTHORS)
  
  const [ editAuthor ] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [ { query: ALL_AUTHORS }]
  })

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  const authors = result.data.allAuthors

  authors.map(a => 
    options.push({ value: a.name, label: a.name })
  )

  const updateAuthor = (event) => {
    event.preventDefault()
    
    const name = selectedAuthor.value
    editAuthor({ variables: { name, birthyear } })

    setSelectedAuthor(null)
    setBirthyear('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <h3>Set birthyear</h3>
      <form onSubmit={updateAuthor}>
        <div>
          <Select 
            defaultValue={selectedAuthor}
            onChange={setSelectedAuthor}
            options={options}
          />
        </div>
        <div>
          born 
          <input  
            value={birthyear}
            onChange={({ target }) => setBirthyear(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default Authors