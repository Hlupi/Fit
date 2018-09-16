import React, { Component, Fragment } from 'react';
import { Header, Footer } from './Layouts'
import Exercises from './Exercises'
import { muscles, exercises } from '../store.js'

export default class App extends Component {
  state = {
    exercises,
    exercise: {}
  }

  getExercisesByMuscles() {
    const initialExercises = muscles.reduce((exercises, muscleGroup) => ({
      ...exercises,
      [muscleGroup]: []
    }), {})

    return Object.entries(
      this.state.exercises.reduce((exercises, exercise) => {
      const { muscles } = exercise

      exercises[muscles] = [...exercises[muscles], exercise]

      return exercises
    }, initialExercises)
  )
  }

  handleCategorySelect = category => {
    this.setState({
      category
    })
  }

  handleExerciseSelect = id => {
    this.setState((prevState) => ({
      exercise: prevState.exercises.find(exercise => exercise.id === id)
    }))
  }

  handleExerciseCreate = exercise => {
    this.setState(({ exercises }) => ({
      exercises: [
        ...exercises,
        exercise
      ]
    }))
  }

  handleExerciseDelete = id => {
    this.setState(({ exercises }) => ({
      exercises: exercises.filter(ex => ex.id !== id)
    }))
  }

  render() {
    const exercises = this.getExercisesByMuscles()
    const { category, exercise } = this.state

    return(
      <Fragment>
        <Header
          muscles={muscles}
          onExerciseCreate={this.handleExerciseCreate}
        />

        <Exercises
          exercise={exercise}
          category={category}
          exercises={exercises}
          onSelect={this.handleExerciseSelect}
          onDelete={this.handleExerciseDelete}
        />

        <Footer
          category={category}
          muscles={muscles}
          onSelect={this.handleCategorySelect}/>

      </Fragment>
    )
  }
}
