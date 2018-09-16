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

  handleCategorySelect = category =>
    this.setState({
      category
    })


  handleExerciseSelect = id =>
    this.setState((prevState) => ({
      exercise: prevState.exercises.find(ex => ex.id === id),
      editMode: false
    }))


  handleExerciseCreate = exercise =>
    this.setState(({ exercises }) => ({
      exercises: [
        ...exercises,
        exercise
      ]
    }))


  handleExerciseSelectEdit = id =>
    this.setState(({ exercises }) => ({
      exercise: exercises.find(ex => ex.id === id),
      editMode: true
    }))

  handleExerciseEdit = exercise =>
  this.setState(({ exercises }) => ({
    exercises: [
      ...exercises.filter(ex => ex.id !== exercise.id),
      exercise
    ],
    exercise
  }))


  handleExerciseDelete = id =>
    this.setState(({ exercises }) => ({
      exercises: exercises.filter(ex => ex.id !== id),
      editMode: false,
      exercise: {}
    }))


  render() {
    const exercises = this.getExercisesByMuscles()
    const { category, editMode, exercise } = this.state

    return(
      <Fragment>
        <Header
          muscles={muscles}
          onExerciseCreate={this.handleExerciseCreate}
        />

        <Exercises
          exercise={exercise}
          category={category}
          editMode={editMode}
          exercises={exercises}
          muscles={muscles}
          onSelect={this.handleExerciseSelect}
          onSelectEdit={this.handleExerciseSelectEdit}
          onEdit={this.handleExerciseEdit}
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
