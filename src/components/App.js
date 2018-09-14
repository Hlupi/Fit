import React, { Component, Fragment } from 'react';
import { Header, Footer } from './layouts'
import Exercises from './exercises'
import { muscles, exercises } from '../store.js'

export default class App extends Component {
  state = {
    exercises
  }

  render() {
    return(
      <Fragment>
        <Header />

        <Exercises />

        <Footer
        muscles={muscles}/>

      </Fragment>
    )
  }
}
