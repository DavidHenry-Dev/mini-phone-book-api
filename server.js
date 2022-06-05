const express = require('express')
const app = express()

let phoneBook = [
    { 
        "id": 1,
        "name": "Arto Hellas", 
        "number": "040-123456"
      },
      { 
        "id": 2,
        "name": "Ada Lovelace", 
        "number": "39-44-5323523"
      },
      { 
        "id": 3,
        "name": "Dan Abramov", 
        "number": "12-43-234345"
      },
      { 
        "id": 4,
        "name": "Mary Poppendieck", 
        "number": "39-23-6423122"
      }
]

app.get('/', (request, response) => {
    response.sendFile(__dirname + '/index.html')
  })

app.get('/api/persons', (request, response) => {
  response.json(phoneBook)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = phoneBook.find(person => person.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
    
  })

app.get('/info', (request, response) => {
    const date = new Date()
    response.send(`Phonebook has info for ${phoneBook.length} people.<br/><br/>${date}`)
   
    
  })

  app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    phoneBook = phoneBook.filter(person => person.id !== id)
  
    response.status(204).end()

  })

const PORT = 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})