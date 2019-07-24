import React, { Component, Fragment } from 'react'
import { withRouter, Link, Redirect } from 'react-router-dom'
import { withSnackbar } from 'notistack'

import messages from '../messages'
import { showImageEntry, deleteImageEntry } from '../api'
// import '../../../css/reviews/Review.scss'

import LinearProgress from '@material-ui/core/LinearProgress'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'

const styles = {
  editBtn: {
    margin: '.4rem'
  },
  paper: {
    maxWidth: '600px',
    padding: '2rem',
    margin: '2rem auto'
  }
}

class ImageEntry extends Component {
  constructor () {
    super()

    this.state = {
      image: null,
      deleted: false
    }
  }

  componentDidMount () {
    const { user, enqueueSnackbar } = this.props
    const id = this.props.match.params.id
    showImageEntry(user, id)
      .then(response => this.setState({ image: response.data.image }))
      .catch(() => {
        enqueueSnackbar(messages.showImageEntryFailure, { variant: 'success' })
      })
  }

  handleDelete = (event) => {
    event.preventDefault()
    const { user, enqueueSnackbar } = this.props
    const id = this.props.match.params.id
    deleteImageEntry(user, id)
      .then(() => this.setState({ deleted: true }))
      .then(() => enqueueSnackbar(messages.deleteImageEntrySuccess, { variant: 'success' }))
      .catch(() => {
        enqueueSnackbar(messages.deleteImageEntryFailure, { variant: 'error' })
      })
  }

  render () {
    if (!this.state.image) {
      return (
        <div>
          <h3>Loading...</h3>
          <LinearProgress />
        </div>
      )
    }

    if (this.state.deleted) {
      return <Redirect to={{
        pathname: '/images'
      }} />
    }

    const { imageUrl, altDescription, userName, comments } = this.state.image

    return (
      <Fragment>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper style={ styles.paper }>
              <div className="image-content" >
                <h3><a href={imageUrl}>Link to Image</a></h3>
                <h2>Name: {altDescription}</h2>
                <p>User on Unsplash: {userName}</p>
                <p>Your comments: {comments}</p>
                <Grid container
                  direction="row"
                  justify="center"
                  alignItems="center"
                  spacing={2}>
                  <Grid item>
                    <Button style={ styles.editBtn } onClick={this.handleDelete} variant="contained" color="secondary">
                    Delete Image Entry
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button style={ styles.editBtn } component={Link} to={this.props.match.url + '/edit'} variant="contained" color="primary">
                      Edit Image Entry
                    </Button>
                  </Grid>
                </Grid>
                <Grid container
                  direction="row"
                  justify="center"
                  alignItems="center">
                  <Grid item>
                    <div style={ styles.editBtn } className="edit-btn">
                      <Button component={Link} to="/images" variant="contained" color="primary">
                        Back to your image entries
                      </Button>
                    </div>
                  </Grid>
                </Grid>
              </div>
            </Paper>
          </Grid>
        </Grid>
      </Fragment>
    )
  }
}

export default withSnackbar(withRouter(ImageEntry))
