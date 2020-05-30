import React from 'react'
import ReactDOM from 'react-dom'

const Header = ({ course }) => 
  <h1>{course.name}</h1>


const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(part =>
        <p key={part.id}> 
          {part.name} {part.exercises}
        </p>
      )}
      </div>
  )
}

const Total = ({ parts }) => {
  return (
    <p><strong>
      Total of {parts.reduce((accumulator, currentValue) => 
        accumulator + currentValue.exercises, 0)} exercises
    </strong></p>
  )
}

const Courses = ({ courses }) => {
  return (
    <div>
    {courses.map(course => 
      <div key={course.id}>
        <Header key={"course-" + course.id} course={course} />
        <Content key={"parts-" + course.id} parts={course.parts} />
        <Total key={"total-" + course.id} parts={course.parts} />  
      </div>
    )}
    </div> 
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

  return <Courses courses={courses} />
}

ReactDOM.render(<App />, document.getElementById('root'))