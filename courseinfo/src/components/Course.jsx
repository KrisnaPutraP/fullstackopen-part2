const Header = ({ course }) => <h2>{course}</h2>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => {
    return (
        <div>
            {parts.map(part => <Part key={part.id} part={part} />)}
        </div>
    )
}
  

const Total = ({ parts }) => {
    const sum = parts.reduce((acc, part) => acc + part.exercises, 0)
    return (
        <strong>total of {sum} exercises</strong>
    )
}

const Course = ({ course }) => {
    const { name, parts } = course
    return (
        <div>
        <Header course={name} />
        <Content parts={parts} />
        <Total parts={parts} />
        </div>
    )
}

export default Course