import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { 
      name: 'Arto Hellas',
      number: '040-1234567'
    }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addNewContact = (event) =>{
    event.preventDefault()
    //console.log(`new name: ${newName}`)
    if(persons.some(person => person.name === newName))
    {
      alert(`${newName} is already added to the phonebook`)
      return
    }
    //console.log('Attempting to add new contact')
    setPersons(persons.concat({ name: newName, number: newNumber }))
  }

  const handleNewNameInputChange = (event) =>{
    //console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNewNumberInputChange = (event) =>{
    //console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNewContact}>
        <div>
          name: <input value={newName} onChange={handleNewNameInputChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNewNumberInputChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map(person => <p key={person.name}>{person.name} {person.number}</p>)}
      </div>
    </div>
  )
}

export default App