import { useState } from 'react'
const Statistics = (props) => {
  if (props.good == 0 && props.neutral == 0 && props.bad == 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }
  return (
    <div>
      <table>
        <Display type="good" number={props.good} />
        <Display type="neutral" number={props.neutral} />
        <Display type="bad" number={props.bad} />
        <Display type="all" number={props.good + props.bad + props.neutral} />
        <Display type="average" number={(props.good - props.bad) / (props.good + props.bad + props.neutral)} />
        <Display type="positive" number={props.good / (props.good + props.bad + props.neutral) + " %"} />
      </table>

    </div>
  )
}
const Display = (props) => {
  return (
    <tr>
      <td>
        {props.type}
      </td>
      <td>
        {props.number}
      </td>
    </tr>
  )
}

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  return (
    <div>
      <h1>
        give feedback
      </h1>
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <h1>
        statistics
      </h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}
export default App