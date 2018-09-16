import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Header, Footer } from './Layouts'
import Exercises from './Exercises'
import { muscles, exercises } from '../store'
import { Provider } from '../context'


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
    this.setState(({ exercises, exercise, editMode }) => ({
      exercises: exercises.filter(ex => ex.id !== id),
      editMode: exercise.id === id ? false : editMode,
      exercise: exercise.id === id ? {} : exercise
    }))

  getContext = () => ({
    muscles,
    ...this.state,
    exercisesByMuscles: this.getExercisesByMuscles(),
    onCategorySelect: this.handleCategorySelect,
    onCreate: this.handleExerciseCreate,
    onEdit: this.handleExerciseEdit,
    onSelectEdit: this.handleExerciseSelectEdit,
    onDelete: this.handleExerciseDelete,
    onSelect: this.handleExerciseSelect
  })


  render() {
    // const exercises = this.getExercisesByMuscles()
    // const { category, editMode, exercise } = this.state

    return(
      <Provider value={this.getContext()}>
          <CssBaseline />
          <Header />

          <Exercises />

          <Footer />
      </Provider>
    )
  }
}
