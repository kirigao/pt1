const Persons = (props) => {
  const del = props.handleClick
  return (
    <div>
      {props.newFilter.map(person => <div key={[person.id]}>{person.name} {person.number} <button onClick={() => del(person.id)}>delete</button></div>)}
    </div>
  )
}
export default Persons