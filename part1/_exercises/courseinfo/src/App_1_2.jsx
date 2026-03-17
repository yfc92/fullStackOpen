const Header = (props) => {
  return <h1>{props.course}</h1>
}

const Part = (props) => {
  return (
    <>
      <p>{props.partName} {props.exerciseCount}</p>
    </>
  )
}

const Content = (props) => {
  return (
  <>
    { 
      props.parts.map(part => 
        <Part key={part.name} partName={part.name} exerciseCount={part.count} />
      )
    }
  </>
  )
}

const Total = (props) =>{
  return (
    <p>
      Number of exercises {props.count}
    </p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14
  const parts = [
    {
      name: part1,
      count: exercises1
    },
    {
      name: part2,
      count: exercises2
    },
    {
      name: part3,
      count: exercises3
    }
  ]
  return (
    <>
      <Header course={course} />
      <Content parts={parts} />
      <Total count={exercises1 + exercises2 + exercises3} />
    </>
  )
}

export default App