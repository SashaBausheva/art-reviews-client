import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { withSnackbar } from 'notistack'
import { signUp, signIn } from '../api'
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
  },
  pageTop: {
    marginTop: '5.5rem'
  }
}

class SignUp extends Component {
  constructor () {
    super()

    this.state = {
      email: '',
      password: '',
      passwordConfirmation: ''
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onSignUp = event => {
    event.preventDefault()

    const { enqueueSnackbar, history, setUser } = this.props

    signUp(this.state)
      .then(() => signIn(this.state))
      .then(res => setUser(res.data.user))
      .then(() => enqueueSnackbar(messages.signUpSuccess, { variant: 'success' }))
      .then(() => history.push('/'))
      .catch(() => {
        this.setState({ email: '', password: '', passwordConfirmation: '' })
        enqueueSnackbar(messages.signUpFailure, { variant: 'error' })
      })
  }

  render () {
    const { email, password, passwordConfirmation } = this.state

    return (
      <div>
        <Grid container spacing={3} style={styles.pageTop}>
          <Grid item xs={12}>
            <Paper style={ styles.paper }>
              <form className='auth-form' onSubmit={this.onSignUp}>
                <h3>Sign Up</h3>

                <label htmlFor="email">Email</label>
                <TextField
                  required
                  name="email"
                  value={email}
                  type="email"
                  placeholder="Email"
                  margin="normal"
                  variant="outlined"
                  style={{ width: '100%', marginBotton: '1rem' }}
                  onChange={this.handleChange}
                />
                <label htmlFor="password">Password</label>
                <TextField
                  required
                  name="password"
                  value={password}
                  type="password"
                  placeholder="Password"
                  margin="normal"
                  variant="outlined"
                  style={{ width: '100%', marginBotton: '1rem' }}
                  onChange={this.handleChange}
                />
                <label htmlFor="passwordConfirmation">Confirm Password</label>
                <TextField
                  required
                  name="passwordConfirmation"
                  value={passwordConfirmation}
                  type="password"
                  placeholder="Confirm Password"
                  margin="normal"
                  variant="outlined"
                  style={{ width: '100%', marginBotton: '1rem' }}
                  onChange={this.handleChange}
                />
                <Button variant="contained" color="primary" type="submit" style={{ outline: 'none' }}>Sign Up</Button>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default withSnackbar(withRouter(SignUp))
