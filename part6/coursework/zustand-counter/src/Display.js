import { useCounter } from './store'

const Display = () => {

  const counter = useCounter()

  return (
    <div>{counter}</div>
  )
}