import React, { Component } from 'react'
import { AppBar, Tabs, Tab, withWidth } from '@material-ui/core'
import { withContext }  from '../../context'


class Footer extends Component {

  onIndexSelect = (event, index) => {
    const { onCategorySelect, muscles } = this.props
    onCategorySelect(index === 0 ? '' : muscles[index - 1])
  }

  getIndex = () => {
    const { category, muscles } = this.props
    return category
  ? muscles.findIndex(group => group === category) + 1
  : 0
  }


  render() {
    const { width, muscles } = this.props
    return (
      <AppBar position='static'>
        <Tabs
          value={this.getIndex()}
          onChange={this.onIndexSelect}
          indicatorColor="secondary"
          textColor="inherit"
          centered={width !== 'xs'}
          scrollable={width === 'xs'}
        >
          <Tab label="All" />
          {muscles.map((muscleGroup) =>
            <Tab label={muscleGroup} key={muscleGroup} />
          )}
        </Tabs>
      </AppBar>
    )
  }
}

export default withContext(withWidth()(Footer))
