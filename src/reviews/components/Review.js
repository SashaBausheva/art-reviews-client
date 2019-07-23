import React, { Component, Fragment } from 'react'
import { withRouter, Link, Redirect } from 'react-router-dom'
import { withSnackbar } from 'notistack'

import messages from '../messages'
import { showReview, deleteReview } from '../api'
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

class Review extends Component {
  constructor () {
    super()

    this.state = {
      review: null,
      deleted: false
    }
  }

  componentDidMount () {
    const { user, enqueueSnackbar } = this.props
    const id = this.props.match.params.id
    showReview(user, id)
      .then(response => this.setState({ review: response.data.review }))
      .catch(() => {
        enqueueSnackbar(messages.showReviewFailure, 'success')
      })
  }

  handleDelete = (event) => {
    event.preventDefault()
    const { user, enqueueSnackbar } = this.props
    const id = this.props.match.params.id
    deleteReview(user, id)
      .then(() => this.setState({ deleted: true }))
      .then(() => enqueueSnackbar(messages.deleteReviewSuccess, 'success'))
      .catch(() => {
        enqueueSnackbar(messages.deleteReviewFailure, 'error')
      })
  }

  render () {
    if (!this.state.review) {
      return (
        <div>
          <h3>Grabbing your reviews.</h3>
          <LinearProgress />
        </div>
      )
    }

    if (this.state.deleted) {
      return <Redirect to={{
        pathname: '/reviews'
      }} />
    }

    const { artistUsername, profileUrl, artistSpecialty, rating } = this.state.review

    return (
      <Fragment>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper style={ styles.paper }>
              <div className="review-content" >
                <h2>Artist: {artistUsername}</h2>
                <h3><a href={profileUrl}>Profile</a></h3>
                <p>Artist Specialty: {artistSpecialty}</p>
                <p>You rated them as: {rating}</p>
                <Grid container
                  direction="row"
                  justify="center"
                  alignItems="center"
                  spacing={2}>
                  <Grid item>
                    <Button style={ styles.editBtn } onClick={this.handleDelete} variant="contained" color="secondary">
                    Delete Review
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button style={ styles.editBtn } component={Link} to={this.props.match.url + '/edit'} variant="contained" color="primary">
                      Edit Review
                    </Button>
                  </Grid>
                </Grid>
                <Grid container
                  direction="row"
                  justify="center"
                  alignItems="center">
                  <Grid item>
                    <div style={ styles.editBtn } className="edit-btn">
                      <Button component={Link} to="/reviews" variant="contained" color="primary">
                        Back to your reviews
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

export default withSnackbar(withRouter(Review))
