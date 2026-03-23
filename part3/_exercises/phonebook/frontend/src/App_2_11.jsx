import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchFilter, setSearchFilter] = useState('')


  const url = "http://localhost:3001/persons"
  const hook = () =>{
    axios
      .get(url)
      .then(response =>{
        // console.log(response.data)
        setPersons(response.data)
      })
  }

  ///only run alongside first render
  useEffect(hook, [])
  // console.log('rendering app with persons', persons.length)

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