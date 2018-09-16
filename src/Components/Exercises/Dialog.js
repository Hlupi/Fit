import React, {Component, Fragment} from 'react'
import { Button, Dialog, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import Form from './Form'
import { withContext }  from '../../context'


class CreateDialog extends Component {
  state = {
    open: false
  }

  handleToggle = () => {
    this.setState({
      open: !this.state.open
    })
  }

  handleFormSubmit = exercise => {
    this.handleToggle()
    this.props.onCreate(exercise)
  }


  render() {
    const { open } = this.state,
          { muscles } = this.props

    return (
      <Fragment>
        <Button variant="fab" onClick={this.handleToggle} mini color='secondary'>
          <AddIcon/>
        </Button>
        <Dialog
          open={open}
          onClose={this.handleToggle}
          fullWidth
          maxWidth='xs'
        >
          <DialogTitle>
            Create a New Exercise
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please fill out the form below.
            </DialogContentText>
            <Form
              muscles={muscles}
              onSubmit={this.handleFormSubmit}
            />
          </DialogContent>
        </Dialog>
      </Fragment>
    )
  }
}

export default withContext(CreateDialog)
