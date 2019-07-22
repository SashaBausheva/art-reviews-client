import React, { Component, Fragment } from 'react'
import { withRouter, Link, Redirect } from 'react-router-dom'

import messages from '../messages'
import { showReview, deleteReview } from '../api'
// import '../../../css/reviews/Review.scss'

import LinearProgress from '@material-ui/core/LinearProgress'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'

class Review extends Component {
  constructor () {
    super()

    this.state = {
      review: null,
      deleted: false
    }
  }

  componentDidMount () {
    const { user, snackBar } = this.props
    const id = this.props.match.params.id
    showReview(user, id)
      .then(response => this.setState({ review: response.data.review }))
      .catch(() => {
        snackBar(messages.showOneReviewFailure, 'warning')
      })
  }

  handleDelete = (event) => {
    event.preventDefault()
    const { user, snackBar } = this.props
    const id = this.props.match.params.id
    deleteReview(user, id)
      .then(() => this.setState({ deleted: true }))
      .then(() => snackBar(messages.deleteReviewSuccess, 'success'))
      .catch(() => {
        snackBar(messages.deleteReviewFailure, 'error')
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
        <Paper>
          <div className="review-content" >
            <h2>Artist: {artistUsername}</h2>
            <h3><a href={profileUrl}>Profile</a></h3>
            <p>Artist Specialty: {artistSpecialty}</p>
            <p>You rated them as: {rating}</p>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              <Grid item xs={10} sm={5}>
                <div className="edit-btn">
                  <Button onClick ={this.handleDelete} variant="contained" color="secondary" fullWidth>
                    Delete Review
                  </Button>
                </div>
              </Grid>
              <Grid item xs={10} sm={5}>
                <div className="edit-btn">
                  <Button component={Link} to={this.props.match.url + '/edit'} variant="contained" color="primary" fullWidth>
                    Edit Review
                  </Button>
                </div>
              </Grid>
            </Grid>
            <Grid container
              direction="row"
              justify="center"
              alignItems="center"
            >
              <Grid item xs={10} sm={6}>
                <div className="edit-btn">
                  <Button component={Link} to="/reviews" variant="contained" color="primary" fullWidth>
                    Back to your reviews
                  </Button>
                </div>
              </Grid>
            </Grid>
          </div>
        </Paper>
      </Fragment>
    )
  }
}

export default withRouter(Review)
