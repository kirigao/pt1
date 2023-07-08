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
  const [newFilterValue, setNewFilterValue] = useState('')
  const [newFilter, setNewFilter] = useState(persons)

  const addNumber = (event) => {
    event.preventDefault()
    console.log(
      'button clicked', event.target
    )
    console.log(persons)
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    }
    else {
      const personObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1
      }
      const newPersons = persons.concat(personObject)
      setPersons(newPersons)
      setNewFilter(newPersons.filter(person => person.name.toLowerCase().includes(newFilterValue.toLowerCase())))
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
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilterValue={newFilterValue} handleFilterChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm addNumber={addNumber} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons newFilter={newFilter} persons={persons} />
    </div >
  )
}

export default App