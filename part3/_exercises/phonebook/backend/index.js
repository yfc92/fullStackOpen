const express = require('express')
const morgan = require('morgan')
const app = express()

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

// morgan.token('body', function logBody(req){
//   //Note that non-post return value needs to be a string with space instead of '', or else morgan will print -
//   const retVal = req.method === 'POST' ? JSON.stringify(req.body) : " "
//   console.log('tokenized body:', retVal, "is method post?", req.method === 'POST')
//   return retVal
// })
// app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

morgan.token('body', function logBody(req){
  return req.method === 'POST' ? JSON.stringify(req.body) : ''
})

// needed to convert request bodies to json directly. 
// Note that this doesn't provide a json body to morgan
app.use(express.json())

app.use(morgan((tokens, req, res) =>{
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    tokens['body'](req,res)
  ].join(' ')
}))
app.use(express.static('dist'))

app.get('/api/persons', (request, response) =>{
    response.send(persons)
})

app.get('/info', (request, response) =>{
  const phonebookInfo = `<p>Phonebook has info for ${persons.length} people</p>`
  const currentTime = `<p>${new Date().toString()}</p>`
  response.send(`<div>
    ${phonebookInfo}
    ${currentTime}
    </div`)
})

app.get('/api/persons/:id', (request, response) =>{
  const id = request.params.id
  const person = persons.find(person => person.id === id)
  if(person)
  {
    response.send(person)
  }
  else{
    response.statusMessage = `No contact found for ${id}`
    response.status(404).end()
  }
})

app.delete('/api/persons/:id',(request, response) =>{
  const id = request.params.id
  persons = persons.filter(person => person.id !== id)
  response.status(204).end()
})

app.post('/api/persons', (request, response) =>{
  const sendError = (response, errorMessage) =>{
    response.status(400).json({
      error: errorMessage
    })
  }

  const generateID = () =>{
    const newID = String(Math.floor(Math.random() * 1000))
    if(persons.find(person => person.id === newID)){
      console.log(`generated id ${newID} exists. generating a new one.`)
      return generateID()
    }
    return newID
  }

  const body = request.body

  if(!body.name){
    return sendError(response, 'name is missing')
  }

  if(!body.number){
    return sendError(response, 'number is missing')
  }

  if(persons.find(person => person.name === body.name)){
    return sendError(response, 'name must be unique')
  }

  const newContact = {
    id: generateID(),
    name: body.name,
    number: body.number,
  }
  persons = persons.concat(newContact)
  response.json(newContact)
})

const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`Server for Phonebook is running on port ${PORT}`)
