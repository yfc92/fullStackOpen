const Header = ({text}) => {
  console.log("Header", text)
  return <h1>{text}</h1>
}

const Part = (props) => {
  console.log("Part", props)
  const { partName, exercises } = props
  return (
    <>
      <p>{partName} {exercises}</p>
    </>
  )
}

const Content = (props) => {
  console.log("Content", props)
  const {parts} = props
  return (
  <>
    {parts.map(part => <Part key={part.name} partName={part.name} exercises={part.exercises} />)}
  </>
  )
}

const Total = (props) =>{
  console.log("Total", props)
  const count = props.course.parts.reduce((sum, part) => sum + part.exercises, 0)
  return (
    <p>
      Number of exercises {count}
    </p>
  )
}

const Course = (props) => {
  const { course } = props
  return(
    <>
      <Header text={course.name} />
      <Content parts={course.parts} />
    </>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return <Course course={course} />
}

export default App