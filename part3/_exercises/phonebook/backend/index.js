require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
const Contact = require('./models/contact')

morgan.token('body', function logBody(req){
  return (req.method === 'POST' || req.method === 'PUT')
        ? JSON.stringify(req.body) : ''
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
    //response.send(persons)
    
    Contact.find({})
    .then(contacts =>{
      response.send(contacts)
    })

})

// app.get('/info', (request, response) =>{
//   const phonebookInfo = `<p>Phonebook has info for ${persons.length} people</p>`
//   const currentTime = `<p>${new Date().toString()}</p>`
//   response.send(`<div>
//     ${phonebookInfo}
//     ${currentTime}
//     </div`)
// })

app.get('/api/persons/:id', (request, response, next) =>{
  const id = request.params.id
  
  Contact.findById(id)
         .then(match =>{
          response.send(match)
         })
         .catch(error => next(error))
})

app.delete('/api/persons/:id',(request, response, next) =>{
  const id = request.params.id
  Contact.findByIdAndDelete(id)
         .then(result =>{
          response.status(204).end()
         })
         .catch(error => next(error))
  // persons = persons.filter(person => person.id !== id)
  // response.status(204).end()
})

app.post('/api/persons', (request, response, next) =>{
  const sendError = (response, errorMessage) =>{
    response.status(400).json({
      error: errorMessage
    })
  }

  const {name, number} = request.body
  
  const newContact = new Contact({
    name: name,
    number: number
  })
  newContact.save()
            .then(result =>{
              response.json(result)
            })
            .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) =>{
  const {name, number} = request.body
  Contact
    .findById(request.params.id)
    .then(contact =>{
      if(!contact)
      {
        return response.status(404).end()
      }
      contact.name = name
      contact.number = number
      return contact.save()
            .then(updateResult =>{
              response.json(updateResult)
            })
    })
    .catch(error => next(error))
})

const errorHandler = (error, request, response, next) =>{
  console.error(error.message, "Error Name:", error.name)

  if(error.name === 'CastError'){
    return response.status(400).send({error:'malformatted id'})
  } else if (error.name === 'ValidationError'){
    return response.status(400).json({error:error.message})
  }

  next(error)
}

// this has to be the last loaded middleware, also all the routes should be registered before this!
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT)
console.log(`Server for Phonebook is running on port ${PORT}`)
