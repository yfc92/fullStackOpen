const Header = (props) => {
  console.log("Header", props)
  return <h1>{props.course}</h1>
}

const Part = (props) => {
  console.log("Part", props)
  return (
    <>
      <p>{props.partName} {props.exercises}</p>
    </>
  )
}

const Content = (props) => {
  console.log("Content", props)
  const part1 = props.parts[0]
  const part2 = props.parts[1]
  const part3 = props.parts[2]
  return (
  <>
    <Part key={part1.name} partName={part1.name} exercises={part1.exercises} />
    <Part key={part2.name} partName={part2.name} exercises={part2.exercises} />
    <Part key={part3.name} partName={part3.name} exercises={part3.exercises} />
  </>
  )
}

const Total = (props) =>{
  console.log("Total", props)
  const count = props.parts.reduce((sum, part) => sum + part.exercises, 0)
  return (
    <p>
      Number of exercises {count}
    </p>
  )
}

const App = () => {
  const course = 'Half Stack application development'

  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </>
  )
}

export default App