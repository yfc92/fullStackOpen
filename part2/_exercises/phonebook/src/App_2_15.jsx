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

  const replaceExistingContact = (id, updatedPerson) =>{
    const confirmed = window.confirm(`${updatedPerson.name} is already 
      added to the phonebook, replace the old number with a new one?`)

    confirmed &&
      personServices
      .update(id, updatedPerson)
      .then(response =>{
        setPersons(persons.map(person => person.id === response.id ? response : person))
      })
  }

  const addNewContact = (event) =>{
    event.preventDefault()
    //console.log(`new name: ${newName}`)
    const existingIndex = persons.findIndex(person => person.name === newName)
    if(existingIndex > -1)
    {
      const existingPerson = persons[existingIndex]
      const updatedPerson = {...existingPerson, number:newNumber }
      replaceExistingContact(existingPerson.id, updatedPerson)
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