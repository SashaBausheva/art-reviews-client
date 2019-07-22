import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { withSnackbar } from 'notistack'
import { signIn } from '../api'
import messages from '../messages'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

const styles = {
  paper: {
    maxWidth: '600px',
    padding: '2rem',
    margin: '2rem auto'
  }
}

class SignIn extends Component {
  constructor () {
    super()

    this.state = {
      email: '',
      password: ''
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onSignIn = event => {
    event.preventDefault()

    const { enqueueSnackbar, history, setUser } = this.props

    signIn(this.state)
      .then(res => setUser(res.data.user))
      .then(() => enqueueSnackbar(messages.signInSuccess, { variant: 'success' }))
      .then(() => history.push('/'))
      .catch(error => {
        console.error(error)
        this.setState({ email: '', password: '' })
        enqueueSnackbar(messages.signInFailure, { variant: 'error' })
      })
  }

  render () {
    const { email, password } = this.state

    return (
      <div>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper style={ styles.paper }>
              <form onSubmit={this.onSignIn}>
                <h3>Sign In</h3>

                <TextField
                  required
                  type="email"
                  name="email"
                  value={email}
                  placeholder="Email"
                  margin="normal"
                  variant="outlined"
                  onChange={this.handleChange}
                  style={{ width: '100%' }}
                />
                <TextField
                  required
                  type="password"
                  name="password"
                  value={password}
                  placeholder="Password"
                  margin="normal"
                  variant="outlined"
                  style={{ width: '100%', marginBotton: '1rem' }}
                  onChange={this.handleChange}
                />
                <Button type='submit' variant="contained" color="primary">
                        Sign In
                </Button>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default withSnackbar(withRouter(SignIn))
