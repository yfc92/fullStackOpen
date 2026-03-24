require('dotenv').config()
const express = require('express')
const app = express()
const Note = require('./models/note')

app.use(express.json())
app.use(express.static('dist'))

const requestLogger = (request, response, next) =>{
  console.log('Method', request.method)
  console.log('Path', request.path)
  console.log('Body', request.body)
  console.log('---')
  next()
}

app.use(requestLogger)

app.get('/', (request, response) =>{
    response.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (request, response) =>{
    // response.json(notes)
    Note.find({})
        .then(notes =>{
          response.json(notes)
        })
})

app.get('/api/notes/:id', (request, response) => {
  const id = request.params.id
  
  Note.findById(id).then(note =>{
    response.json(note)
  })

  // const note = notes.find(note => note.id === id)
  
  // if(note){
  //   response.json(note)  
  // }
  // else{
  //   response.statusMessage = `Note with ${id} does not exist`
  //   response.status(404).end()
  // }
})

app.delete('/api/notes/:id', (request, response) =>{
    const id = request.params.id
    notes = notes.filter(note => note.id !== id)
    response.status(204).end()
})

app.post('/api/notes', (request, response) => {
  const body = request.body

  if (!body.content) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }

  const note = new Note({
    content: body.content,
    important: body.important || false
  })

  note.save().then(savedNote =>{
    response.json(savedNote)
  })

  // const note = {
  //   content: body.content,
  //   important: body.important || false,
  //   id: generateId(),
  // }

  // notes = notes.concat(note)

  // response.json(note)
})

const unknownEndpoint = (request, response) =>{
  response.status(404).send({error: 'unknown endpoint'})
}
app.use(unknownEndpoint)

const PORT = process.env.PORT
app.listen(PORT)
console.log(`Server running on port ${PORT}`)