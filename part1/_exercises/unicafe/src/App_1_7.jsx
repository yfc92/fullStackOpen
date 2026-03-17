import { useState } from 'react'

const Header = ({ text }) => <h1>{text}</h1>
const Button = ({ onClick, text }) => (
  <button onClick={onClick}>{text}</button>
)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const good_handleClick = () => setGood(good + 1)
  const neutral_handleClick = () => setNeutral(neutral + 1)
  const bad_handleClick = () => setBad(bad + 1)

  const all = good + neutral + bad
  const average = all !== 0 ? (good - bad) / all : 0
  const positive =  all !== 0 ? (good / all) * 100 : 0

  
  return (
    <div>
      <Header text="give feedback" />
      <Button onClick={good_handleClick} text={"good"} />
      <Button onClick={neutral_handleClick} text={"neutral"} />
      <Button onClick={bad_handleClick} text={"bad"} />
      <Header text={"statistics"} />
      <p>good: {good}</p>
      <p>neutral: {neutral}</p>
      <p>bad: {bad}</p>
      <p>all: {all}</p>
      <p>average: {average}</p>
      <p>positive: {positive}%</p>
    </div>
  )
}

export default App