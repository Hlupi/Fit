import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  formControl: {
    width: 500
  }
})

export default withStyles(styles)(class extends Component {
  state = this.getInitialState()

  getInitialState() {
    const { exercise } = this.props

    return exercise ? exercise : {
      title: '',
      description: '',
      muscles: ''
    }
  }

  componentWillReceiveProps({ exercise }) {
    this.setState({
      ...exercise
    })
  }

  handleChange = name => ({ target: { value } }) =>
    this.setState({
      [name]: value
    })


  handleSubmit = () => {
    //TODO: validation

    this.props.onSubmit({
      id: this.state.title.toLowerCase().replace(/ /g, '-'),
      ...this.state
    })

    this.setState(this.getInitialState())
  }


  render() {
    const { title, description, muscles } = this.state,
          { classes, exercise, muscles: muscleGroups } = this.props


    return (
      <form>
        <TextField
          label="Title"
          value={title}
          onChange={this.handleChange('title')}
          margin="normal"
          className={classes.formControl}
        />
        <br/>

        <FormControl className={classes.formControl}>
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
          className={classes.formControl}
      />
      <br />
      <Button
        color="primary"
        variant='raised'
        onClick={this.handleSubmit}
        >
        {exercise ? 'Edit' : 'Create'}
      </Button>
      </form>
    )
  }
})
