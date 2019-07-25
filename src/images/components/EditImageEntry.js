import React, { Component, Fragment } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import { withSnackbar } from 'notistack'

import ImageEntryForm from './ImageEntryForm'
import { showImageEntry, editImageEntry } from '../api'
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

class EditImageEntry extends Component {
  constructor () {
    super()

    this.state = {
      image: null,
      deleted: false,
      edited: false
    }
  }

  componentDidMount () {
    const { user, enqueueSnackbar } = this.props
    const id = this.props.match.params.id
    showImageEntry(user, id)
      .then(response => this.setState({ image: response.data.image }))
      .catch(() => {
        enqueueSnackbar(messages.showImageEntryFailure, { variant: 'error' })
      })
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
      const id = this.props.match.params.id
      editImageEntry(user, id, image)
        .then(response => this.setState({
          edited: true,
          image: response.data.image
        }))
        .then(() => enqueueSnackbar(messages.editImageEntrySuccess, { variant: 'success' }))
        .catch(() => {
          this.setState({
            image: { ...image, imageUrl: '', altDescription: '', userName: '', comments: '' }
          })
          enqueueSnackbar(messages.editImageEntryFailure, { variant: 'error' })
        }
        )
    }

    render () {
      const { image, edited } = this.state
      console.log(image)

      if (edited) {
        console.log(edited)
        return <Redirect to={{
          pathname: `/images/${this.props.match.params.id}`
        }} />
      }

      if (!this.state.image) {
        return (
          <div>
            <h3>Loading...</h3>
          </div>
        )
      }

      const { imageUrl, altDescription, userName, comments } = image
      return (
        <Fragment>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper style={ styles.paper }>
                <ImageEntryForm
                  imageUrl={imageUrl}
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

export default withSnackbar(withRouter(EditImageEntry))
