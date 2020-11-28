import React from 'react'
import { useQuery } from '@apollo/client'
import { ALL_AUTHORS } from './queries'

const App = () => {
  const result = useQuery(ALL_AUTHORS)

  if (result.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      {result.data.allAuthors.map(a => a.name).join(', ')}
    </div>
  )
}

export default App
