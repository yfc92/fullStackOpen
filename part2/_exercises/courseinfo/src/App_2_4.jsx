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
  const {parts} = props
  const count = parts.reduce((sum, part) => sum + part.exercises, 0)
  return (
    <p>
      <b>total of {count} exercises</b>
    </p>
  )
}

const Course = (props) => {
  const { course } = props
  return(
    <>
      <Header text={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  )
}

const App = () => {
 const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return(
    <>
      {courses.map(course => <Course key={course.id} course={course} />)}
    </>
  )
}

export default App