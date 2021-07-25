import { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { withSnackbar } from 'notistack'

import { signOut } from '../api'
import messages from '../messages'

class SignOut extends Component {
  componentDidMount () {
    const { history, clearUser, user, enqueueSnackbar } = this.props

    signOut(user)
      .finally(() => {
        clearUser() // clear the user first!
        enqueueSnackbar(messages.signOutSuccess, { variant: 'success' })
        history.push('/')
      })
  }

  render () {
    return ''
  }
}

export default withSnackbar(withRouter(SignOut))
