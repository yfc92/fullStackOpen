import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchFilter, setSearchFilter] = useState('')

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

  const handleSearchFilterInputChange = (event) =>{
    setSearchFilter(event.target.value)
  }
  
  return (
     <div>
      <h2>Phonebook</h2>
      <Filter 
        value={searchFilter} 
        onChange={handleSearchFilterInputChange} />

      <h3>Add a new</h3>
      <PersonForm 
        newName={newName}
        onNewNameInputChange={handleNewNameInputChange}
        newNumber={newNumber}
        onNewNumberInputChange={handleNewNumberInputChange}
        onSubmit={addNewContact}
      />

      <h3>Numbers</h3>
      <Persons persons={persons} searchFilter={searchFilter} />
    </div>
  )
}

export default App