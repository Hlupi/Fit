import React, { Component } from 'react'
import { TextField, FormControl, InputLabel, Select, MenuItem, Button } from '@material-ui/core'


export default class extends Component {
  state = this.getInitialState()

  getInitialState() {
    const { exercise } = this.props

    return exercise ? exercise : {
      title: '',
      description: '',
      muscles: ''
    }
  }

  handleChange = name => ({ target: { value } }) =>
    this.setState({
      [name]: value
    })

  handleSubmit = () => {
    this.props.onSubmit({
      id: this.state.title.toLowerCase().replace(/ /g, '-'),
      ...this.state
    })
  }


  render() {
    const { title, description, muscles } = this.state,
          { exercise, muscles: muscleGroups } = this.props

    return (
      <form>
        <TextField
          label="Title"
          value={title}
          onChange={this.handleChange('title')}
          margin="normal"
          fullWidth
        />
        <br/>

        <FormControl fullWidth>
          <InputLabel htmlFor="muscles">
            Muscles
          </InputLabel>
          <Select
            value={muscles}
            onChange={this.handleChange('muscles')}
          >
            {muscleGroups.map(muscleGroup =>
              <MenuItem value={muscleGroup} key={muscleGroup}>{muscleGroup}</MenuItem>
            )}
          </Select>
        </FormControl>

        <br/>

        <TextField
          label="Description"
          value={description}
          onChange={this.handleChange('description')}
          margin="normal"
          multiline
          rows='4'
          fullWidth
        />

      <br />

      <Button
        color="primary"
        variant='raised'
        onClick={this.handleSubmit}
        disabled={!title || !muscles}
      >
        {exercise ? 'Edit' : 'Create'}
      </Button>
    </form>
    )
  }
}
