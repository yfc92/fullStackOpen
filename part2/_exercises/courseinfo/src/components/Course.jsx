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

export default Course