  import { useState } from 'react'
  import { useEffect } from 'react'
  import Persons from './components/Persons'
  import Filter from './components/Filter'
  import PersonForm from './components/PersonForm'
  import Notifications from './components/Notifications'
  import phoneBookBackEnd from './services/phoneBookBackEnd'
  import './index.css'

  const App = () => {
    // Initialise the state
    const [persons, setPersons] = useState([
      { name: 'Arto Hellas', number: '040-123456', id: 1 },
      { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
      { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
      { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
    ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState('')
    const [filteredPersons, setFilteredPersons] = useState(persons)
    const [message, setMessage] = useState({text: null, type: null})

    // Fetch data from the server
    const hook = () => {
      phoneBookBackEnd
        .getAll()
        .then(initialPerson => {
          console.log("Promise fulfilled")
          setPersons(initialPerson)
          setFilteredPersons(initialPerson)
        }).catch(error => {
          console.log("Error fetching data", error)
        })
    }
    useEffect(hook, [])
    console.log('render', persons.length, 'persons')

    // Handle the form submission
    const addPerson = (event) => {
      event.preventDefault()

      if (newName === '' || newNumber === '') {
        alert('name or number is empty');
        return;
      }

      const personExists = persons.find(person => person.name === newName)

      if (personExists) {
        if (personExists.number === newNumber) {
          alert(`${newName} is already added to phonebook`)
        return
        }

        const confirmUpdate = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
        if (!confirmUpdate) {
          return
        }

        // Update the number
        const updatedPerson = { ...personExists, number: newNumber }
        phoneBookBackEnd
        .update(updatedPerson.id, updatedPerson)
        .then(updatedPersonResponse => {
          setPersons(persons.map(person => person.id !== updatedPerson.id ? person : updatedPersonResponse))  
          setFilteredPersons(filteredPersons.map(person => person.id !== updatedPerson.id ? person : updatedPersonResponse))
          setMessage({text: `Updated ${newName}`, type: 'success'})
        }).catch(error => {
          setMessage({text: error.response.data.error, type: 'error'})
        })
    return
  }
      const personObject = {
        name: newName,
        number: newNumber,
      }
      
      phoneBookBackEnd
        .add(personObject)
        .then(returnedPerson => {
          console.log("Promise fulfilled")
          setPersons(persons.concat(personObject))
          setFilteredPersons(filteredPersons.concat(personObject))
          setNewName('')
          setNewNumber('')
          setMessage({text: `Added ${newName}`, type: 'success'})
        }).catch(error => {
          setMessage({text: error.response.data.error, type: 'error'})
        })
    
      setMessage({text: `Added ${newName}`, type: 'success'})
      setTimeout(() => {
        setMessage({text: null, type: null})
      }, 5000)
    }

    // Handle the delete button
    const removePerson = (id) => {
      const personToDelete = persons.find(person => person.id === id)
      if (window.confirm(`Delete ${personToDelete.name}?`)) {
        phoneBookBackEnd
          .remove(id)
          .then(() => {
            console.log("Promise fulfilled")
            setPersons(persons.filter(person => person.id !== id))
            setFilteredPersons(filteredPersons.filter(person => person.id !== id))
          }).catch((error) => { 
            console.log(error);
            setMessage({text: `Information of ${personToDelete.name} has already been removed from the server`, type: 'error',});
            setTimeout(() => {
              setMessage({ text: null, type: null });
            }, 5000)
            return
          })
          setMessage({ text: `Deleted ${personToDelete.name}`, type: 'success' });
          setTimeout(() => {
          setMessage({ text: null, type: null });
        }, 5000)
      }
    }
    

    const handlePersonChange = (event) => {
      setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
      setNewNumber(event.target.value)
    }

    const handleFilterChange = (event) => {
      setFilter(event.target.value)
      setFilteredPersons(persons.filter(person => person.name.toLowerCase().includes(event.target.value.toLowerCase())))
    }

    return (
      <div>
        <h2>Phonebook</h2>
          <div>
          <Notifications message={message.text} type={message.type} />
          </div>
            <Filter filter={filter} handleFilterChange={handleFilterChange} />
            <h3>Add a new</h3>
            <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handlePersonChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
            <h2>Numbers</h2>
            <Persons filteredPersons={filteredPersons} removePerson={removePerson}/>
      </div>
    )
  }

  export default App