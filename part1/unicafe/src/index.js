import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Button = ( {onClick, text}) => (
  <button onClick={onClick}>{text}</button>
)

const Statistics = (props) => {
  if ((props.good + props.neutral + props.bad) === 0) {
    return (
      <div>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>
    )
  }

  return (
    <div>
      <h1>statistics</h1>
      <Statistic text="good" value={props.good} />
      <Statistic text="neutral" value={props.neutral} />
      <Statistic text="bad" value={props.bad} /> 
      <Statistic text="all" value={props.good + props.neutral + props.bad} />
      <Statistic text="average" value={(props.good + (props.neutral * 0) + (props.bad * -1)) / 
        (props.good + props.neutral + props.bad)} />
      <Statistic text="positive" value={(props.good / (props.good + props.neutral + props.bad)) * 100} />
    </div>
  )
}

const Statistic = (props) => 
  <div>
    <p>{props.text} {props.value}</p>
  </div>


const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }
  
  const handleBadClick = () => {
    setBad(bad + 1)
  }
  
  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleGoodClick} text="good" />
      <Button onClick={handleNeutralClick} text="neutral" />
      <Button onClick={handleBadClick} text="bad" />      
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))