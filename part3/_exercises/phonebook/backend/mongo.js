const mongoose = require('mongoose')

const dbAppName = 'phonebook'
if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const isAdding = process.argv.length === 5
const isGettingList = process.argv.length === 3

const url = `mongodb+srv://yaochen92_db_user:${password}@cluster0.2ttxfy2.mongodb.net/${dbAppName}?appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url, { family: 4 })

const contactSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Contact = mongoose.model('Contact', contactSchema)

if(isAdding){
  const newPerson = new Contact({
    name: process.argv[3],
    number: process.argv[4]
  })
  newPerson.save().then(result =>{
    console.log(`added ${newPerson.name} number ${newPerson.number} to phonebook`)
    mongoose.connection.close()
  })
}

if(isGettingList){
  Contact.find({}).then(result =>{
    console.log('phonebook:')
    result.forEach(contact => {
      console.log(`${contact.name} ${contact.number}`)
    });
    mongoose.connection.close()
  })
}