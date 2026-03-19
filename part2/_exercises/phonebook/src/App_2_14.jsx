import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personServices from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchFilter, setSearchFilter] = useState('')

  const hook = () =>{
    personServices
    .getAll()
    .then(initPersons =>{
        setPersons(initPersons)
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

    const newPerson = { name: newName, number: newNumber }
    personServices
      .add(newPerson)
      .then(response =>{
        setPersons(persons.concat(response))
      })
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

  const deletePerson = (id) => {
    personServices
    .remove(id)
    .then(response => {
      setPersons(persons.filter(person => person.id !== id))
    })
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
      <Persons 
        persons={persons} 
        searchFilter={searchFilter}
        deletePerson={deletePerson} 
      />
    </div>
  )
}

export default App