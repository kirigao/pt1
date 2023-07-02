import { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>

  )

}
const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Uint8Array(anecdotes.length))
  const [mostVotes, setMostVotes] = useState(0)
  const selectRandom = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }
  const selectNext = () => {
    if (selected == anecdotes.length - 1) {
      setSelected(0)
    }
    else {
      setSelected(selected + 1)
    }

  }
  const updatePoints = (num) => {
    const copy = [...points]
    copy[num] += 1
    setPoints(copy)
    if (copy[num] > copy[mostVotes]) {
      setMostVotes(num)
    }
    console.log("Point " + num + ": " + points[num])
  }
  return (
    <div>
      <h1>
        Anecdote of the day
      </h1>
      {anecdotes[selected]}
      <div>
        has {points[selected]} votes

      </div>

      <Button handleClick={() => updatePoints(selected)} text="vote" />
      <Button handleClick={selectNext} text="next" />
      <h1>
        Anecdote with the most votes
      </h1>
      {anecdotes[mostVotes]}
    </div>
  )
}

export default App