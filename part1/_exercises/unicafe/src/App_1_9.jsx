import { useState } from 'react'

const Header = ({ text }) => <h1>{text}</h1>
const Button = ({ onClick, text }) => (
  <button onClick={onClick}>{text}</button>
)

const Statistics = (props) =>{
  const {good, neutral, bad} = props
  const all = good + neutral + bad
  const header = <Header text={"statistics"} />

  if(all === 0){
    return (
      <>
        {header}
        <p>No feedback given</p>
      </>
    )
  }

  const average = (good - bad) / all
  const positive = (good / all) * 100
  return (
    <>
      {header}
      <p>good: {good}</p>
      <p>neutral: {neutral}</p>
      <p>bad: {bad}</p>
      <p>all: {all}</p>
      <p>average: {average}</p>
      <p>positive: {positive}%</p>
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const good_handleClick = () => setGood(good + 1)
  const neutral_handleClick = () => setNeutral(neutral + 1)
  const bad_handleClick = () => setBad(bad + 1)
  
  return (
    <div>
      <Header text="give feedback" />
      <Button onClick={good_handleClick} text={"good"} />
      <Button onClick={neutral_handleClick} text={"neutral"} />
      <Button onClick={bad_handleClick} text={"bad"} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App