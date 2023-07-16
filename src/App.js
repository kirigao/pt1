import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import numberService from './services/numbers'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilterValue, setNewFilterValue] = useState('')
  const [newFilter, setNewFilter] = useState(persons)
  const [newErrorMessage, setNewErrorMessage] = useState(null)
  const [success, setSuccess] = useState(false)


  useEffect(() => {
    console.log('effect')
    numberService.getAll().then(initialNumbers => {
      console.log('promise fulfilled')
      setPersons(initialNumbers)
      setNewFilter(initialNumbers.filter(person => person.name.toLowerCase().includes(newFilterValue.toLowerCase())))
    })
  }, [])
  console.log('render', persons.length, 'notes')

  const addNumber = (event) => {
    event.preventDefault()
    console.log(
      'button clicked', event.target
    )
    console.log(persons)
    if (persons.some(person => person.name === newName)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const personObject = {
          name: newName,
          number: newNumber,
          id: persons.find(person => person.name === newName).id
        }
        numberService.update(personObject.id, personObject).then(returnedNumber => {
          const newPersons = persons.map(person => person.id != personObject.id ? person : personObject)
          setPersons(newPersons)
          setNewFilter(newPersons.filter(person => person.name.toLowerCase().includes(newFilterValue.toLowerCase())))
          setSuccess(true)
          setNewErrorMessage(`Updated ${newName}`)
          setTimeout(() => {
            setNewErrorMessage(null)
          }, 5000)
        })
      }

    }
    else {
      const personObject = {
        name: newName,
        number: newNumber
      }
      numberService.create(personObject).then(returnedNumber => {
        const newPersons = persons.concat(returnedNumber)
        setPersons(newPersons)
        setNewFilter(newPersons.filter(person => person.name.toLowerCase().includes(newFilterValue.toLowerCase())))
        setSuccess(true)
        setNewErrorMessage(`Added ${newName}`)
        setTimeout(() => {
          setNewErrorMessage(null)
        }, 5000)
      })
    }

    setNewName('')
    setNewNumber('')
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewFilterValue(event.target.value)
    setNewFilter(persons.filter(person => person.name.toLowerCase().includes(event.target.value.toLowerCase())))
  }
  const handleDeleteNumber = (id) => {
    const deletedNumber = persons.find(person => person.id === id).name
    if (window.confirm(`Delete ${deletedNumber}?`)) {
      numberService.remove(id).then(() => {
        const newPersons = persons.filter(person => person.id != id)
        setPersons(newPersons)
        setNewFilter(newPersons.filter(person => person.name.toLowerCase().includes(newFilterValue.toLowerCase())))
      }).catch(error => {
        setSuccess(false)
        setNewErrorMessage(`Information of  ${deletedNumber} has already been removed from server`)
        setTimeout(() => {
          setNewErrorMessage(null)
        }, 5000)
      })
    }
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={newErrorMessage} success={success} />
      <Filter newFilterValue={newFilterValue} handleFilterChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm addNumber={addNumber} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons newFilter={newFilter} persons={persons} handleClick={handleDeleteNumber} />
    </div >
  )

}


export default App