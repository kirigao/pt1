const Course = (props) => {
  const parts = props.course.parts
  const initialValue = 0
  return (
    <div>
      <h2>
        {props.course.name}
      </h2>
      {parts.map(part => <p key={part.id}>{part.name} {part.exercises}</p>)}
      <b>total of {parts.reduce((accumulator, currentPart) => accumulator + currentPart.exercises, initialValue)} exercises</b>
    </div>

  )

}
export default Course