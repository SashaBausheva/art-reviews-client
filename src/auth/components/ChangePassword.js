import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { withSnackbar } from 'notistack'
import { changePassword } from '../api'
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

class ChangePassword extends Component {
  constructor () {
    super()

    this.state = {
      oldPassword: '',
      newPassword: ''
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onChangePassword = event => {
    event.preventDefault()

    const { enqueueSnackbar, history, user } = this.props

    changePassword(this.state, user)
      .then(() => enqueueSnackbar(messages.changePasswordSuccess, { variant: 'success' }))
      .then(() => history.push('/'))
      .catch(error => {
        console.error(error)
        this.setState({ oldPassword: '', newPassword: '' })
        enqueueSnackbar(messages.changePasswordFailure, { variant: 'error' })
      })
  }

  render () {
    const { oldPassword, newPassword } = this.state

    return (
      <div>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper style={ styles.paper }>
              <form className='auth-form' onSubmit={this.onChangePassword}>
                <h3>Change Password</h3>

                <label htmlFor="oldpw">Old Password</label>
                <TextField
                  required
                  name="oldPassword"
                  value={oldPassword}
                  type="password"
                  placeholder="Old Password"
                  margin="normal"
                  variant="outlined"
                  style={{ width: '100%', marginBotton: '1rem' }}
                  onChange={this.handleChange}
                />
                <label htmlFor="newPassword">New Password</label>
                <TextField
                  required
                  name="newPassword"
                  value={newPassword}
                  type="password"
                  placeholder="New Password"
                  margin="normal"
                  variant="outlined"
                  style={{ width: '100%', marginBotton: '1rem' }}
                  onChange={this.handleChange}
                />
                <Button type='submit' variant="contained" color="primary">Change Password</Button>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default withSnackbar(withRouter(ChangePassword))
