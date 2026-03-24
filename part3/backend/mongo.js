const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

// const url = `mongodb+srv://yaochen92_db_user:${password}@cluster0.2ttxfy2.mongodb.net/?appName=Cluster0`
const url = `mongodb+srv://yaochen92_db_user:${password}@cluster0.2ttxfy2.mongodb.net/noteApp?appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url, { family: 4 })

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

// const note = new Note({
//   content: 'HTML is easy',
//   important: true,
// })


// note.save().then(result => {
//   console.log('note saved!')
//   mongoose.connection.close()
// })

Note.find({important:true}).then(result =>{
    result.forEach(note =>{
        console.log(note)
    })
    mongoose.connection.close()
})
