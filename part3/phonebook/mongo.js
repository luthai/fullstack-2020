const mongoose = require('mongoose')

const length = process.argv.length
if (!(length === 3 || length === 5)) {
  console.log('Error: wrong argument, correct usage [node mongo.js password name phonenumber]')
  process.exit(1)
}

const password = process.argv[2]

const url =
`mongodb+srv://luthai:${password}@cluster0.aexyl.mongodb.net/phonebook-app?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

if (length === 3) {
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person)
    })
    mongoose.connection.close()
  })
} else {
  const name = process.argv[3]
  const number = process.argv[4]

  const person = new Person({
    name: name,
    number: number
  })

  person.save().then(result => {
    console.log('person saved!')
    mongoose.connection.close()
  })
}

