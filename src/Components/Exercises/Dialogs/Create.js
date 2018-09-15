import React, {Component, Fragment} from 'react'
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  formControl: {
    width: 500
  }
})

export default withStyles(styles)(class extends Component {
  state = {
    open: false,
    exercise: {
      title: '',
      description: '',
      muscles: ''
    }
  }

  handleToggle = () => {
    this.setState({
      open: !this.state.open
    })
  }

  handleChange = name => ({ target: { value } }) => {
    this.setState({
      exercise: {
        ...this.state.exercise,
        [name]: value
      }
    })
  }

  handleSubmit = () => {
    //TODO: validation

    const { exercise } = this.state
    this.props.onCreate({
      ...exercise,
      id: exercise.title.toLowerCase().replace(/ /g, '-')
    })
    this.setState({
      open: false,
      exercise: {
        title: '',
        description: '',
        muscle: ''
      }
    })
  }

  render() {
    const { open, exercise: { title, description, muscles } } = this.state,
          { classes, muscles: muscleGroups } = this.props

    return (<Fragment>
      <Button variant="fab" onClick={this.handleToggle} mini>
        <AddIcon/>
      </Button>
      <Dialog open={open} onClose={this.handleToggle}>
        <DialogTitle id="form-dialog-title">
          Create a New Exercise
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill out the form below.
          </DialogContentText>
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



          </form>
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            variant='raised'
            onClick={this.handleSubmit}
            >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>)
  }
})
