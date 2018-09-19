import React from 'react'
import ReactDOM from 'react-dom'
import App from './Components/App'
import registerServiceWorker from './registerServiceWorker'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { red, amber } from '@material-ui/core/colors'

const theme = createMuiTheme({

  palette: {
    primary: {
      main: red[400],
      light: red[200],
      dark: red[600]
    },
    secondary: {
      main: amber[500],
      light: amber[200],
      dark: amber[700]
    },
    type: 'light'
  },
  spacing: {
    unit: 10
  }
})
console.log(theme);
ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <App />
  </MuiThemeProvider>,
  document.getElementById('root'));
registerServiceWorker();
