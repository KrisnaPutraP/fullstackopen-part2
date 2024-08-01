const Person = ({ name, number, id, removePerson }) => {
  return (
    <div className='list'>
      {name} {number}
      <button onClick={() => removePerson(id)} className="deletion">delete</button>
    </div>
  )
}

const Persons = ({filteredPersons, removePerson}) => {
  return (
    <div>
      {filteredPersons.map(person => 
        <Person key = {person.name} id={person.id} name={person.name} number={person.number} removePerson={removePerson}/>
      )}
    </div>
  )
}
export default Persons