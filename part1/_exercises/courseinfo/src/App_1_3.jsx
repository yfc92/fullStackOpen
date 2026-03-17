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
  return (
  <>
    <Part key={props.part1.name} partName={props.part1.name} exercises={props.part1.exercises} />
    <Part key={props.part2.name} partName={props.part2.name} exercises={props.part2.exercises} />
    <Part key={props.part3.name} partName={props.part3.name} exercises={props.part3.exercises} />
  </>
  )
}

const Total = (props) =>{
  console.log("Total", props)
  return (
    <p>
      Number of exercises {props.count}
    </p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <>
      <Header course={course} />
      <Content part1={part1} part2={part2} part3={part3} />
      <Total count={part1.exercises + part2.exercises + part3.exercises} />
    </>
  )
}

export default App