require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

const { request, response, json } = require('express')
const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static('build'))

morgan.token('body', function getBody(req) {
  if (Object.keys(req.body).length === 0 &&
    req.body.constructor === Object) 
    return ' '
  
  return JSON.stringify(req.body)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.get('/api/persons', (request, response) => {
  Person.find({}).then(person => {
    response.json(person)
  })
})

app.get('/api/persons/:id', (request, response) => {
  Person.find(request.params.id).then(person => {
    response.json(person)
  })
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  const name = request.body.name
  const number = request.body.number
  
  if (!name || !number) {
    return response.status(400).json({
      error: 'content missing'
    })
  }

  if (persons.find(person => person.name === name)) {
    return response.status(400).json({
      error: 'person already added'
    })
  }

  const person = {
    name: name,
    number: number,
    id: Math.ceil(Math.random() * (1000 - 1) + 1)
  }

  persons = persons.concat(person)

  response.json(person)
})

app.get('/info', (request, response) => {
  let info = 
  `<div>
    Phonebook has info for ${persons.length} people
    <br></br>
    ${new Date()}
  </div>`

  response.send(info)
})

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})