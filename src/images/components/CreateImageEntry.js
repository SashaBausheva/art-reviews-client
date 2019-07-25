import React, { Component, Fragment } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import { withSnackbar } from 'notistack'

import ImageEntryForm from './ImageEntryForm'
import { createImageEntry } from '../api'
import messages from '../messages'

import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

const styles = {
  div: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  editBtn: {
    margin: '.2rem'
  },
  paper: {
    maxWidth: '800px',
    padding: '2rem',
    margin: '2rem auto'
  }
}

class CreateImageEntry extends Component {
  constructor () {
    super()

    this.state = {
      image: {
        imageUrl: '',
        fullUrl: '',
        userUrl: '',
        altDescription: '',
        userName: '',
        comments: ''
      },
      created: false,
      message: null
    }
  }

  handleChange = (event) => {
    this.setState({ image: {
      ...this.state.image, [event.target.name]: event.target.value
    } })
  }

    handleSubmit = (event) => {
      event.preventDefault()
      const { user, enqueueSnackbar } = this.props
      const { image } = this.state
      createImageEntry(user, image)
        .then(response => this.setState({
          created: true,
          image: response.data.image
        }))
        .then(() => enqueueSnackbar(messages.createImageEntrySuccess, { variant: 'success' }))
        .catch(() => {
          this.setState({
            image: { ...image, imageUrl: '', fullUrl: '', userUrl: '', altDescription: '', userName: '', comments: '' }
          })
          enqueueSnackbar(messages.createImageEntryFailure, { variant: 'error' })
        }
        )
    }

    render () {
      const { image, created } = this.state

      if (created) {
        return <Redirect to={{
          pathname: '/images'
        }} />
      }

      const { imageUrl, fullUrl, userUrl, altDescription, userName, comments } = image
      return (
        <Fragment>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper style={ styles.paper }>
                <ImageEntryForm
                  imageUrl={imageUrl}
                  fullUrl={fullUrl}
                  userUrl={userUrl}
                  altDescription={altDescription}
                  userName={userName}
                  comments={comments}
                  // gallery={this.state.review.artistUsername.gallery}
                  handleChange={this.handleChange}
                  handleSubmit={this.handleSubmit}
                />
              </Paper>
            </Grid>
          </Grid>
        </Fragment>
      )
    }
}

export default withSnackbar(withRouter(CreateImageEntry))
