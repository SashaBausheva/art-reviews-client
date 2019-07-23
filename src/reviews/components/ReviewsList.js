import React, { Component, Fragment } from 'react'
import { withRouter, Link } from 'react-router-dom'

import { indexReviews } from '../api'
import messages from '../messages'

import LinearProgress from '@material-ui/core/LinearProgress'
import AddIcon from '@material-ui/icons/Add'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'

const styles = {
  editBtn: {
    margin: '.2rem'
  },
  paper: {
    maxWidth: '600px',
    padding: '2rem',
    margin: '.4rem auto'
  }
}

class Reviews extends Component {
  constructor () {
    super()

    this.state = {
      reviews: []
    }
  }

  componentDidMount () {
    const { user, snackBar } = this.props

    indexReviews(user)
      .then((response) => {
        if (response.data.reviews.length !== 0) {
          this.setState({
            reviews: response.data.reviews
          })
        } else {
          this.setState({
            noReviews: response.data.reviews
          })
        }
      }
      )
      .catch(() => {
        snackBar(messages.showReviewsFailure, 'warning')
      })
  }

  render () {
    const { reviews, noReviews } = this.state

    if (noReviews) {
      return (
        <div className="empty-results-container">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper style={ styles.paper }>
                <CssBaseline />
                <div className="empty-results">
                  <h3>No reviews</h3>
                  <Button style={ styles.editBtn } component={Link} to="/create-review" variant="contained" color="primary">
                    New Artist Review
                    <AddIcon />
                  </Button>
                </div>
              </Paper>
            </Grid>
          </Grid>
        </div>
      )
    } else if (reviews.length === 0) {
      return (
        <div className="empty-results-container">
          <Grid container>
            <Grid item xs={12}>
              <Paper style={ styles.paper }>
                <CssBaseline />
                <div className="empty-results">
                  <h3>Loading...</h3>
                  <LinearProgress />
                </div>
              </Paper>
            </Grid>
          </Grid>
        </div>
      )
    }
    return (
      <Fragment>
        <div>
          <h1 className="my-reviews-header">Reviews</h1>
          <Grid container spacing={3}>
            <Grid item>
              <div className="review-btn-submit">
                <Button component={Link} to="/create-review" color="secondary" variant="contained" fullWidth>
                  New Review
                </Button>
              </div>
            </Grid>
            {/* <Grid item xs={12} sm={5}>
              <div className="review-btn-submit">
                <Button component={Link} to="/search-artist" variant="contained" color="primary" fullWidth>Find Artist</Button>
              </div>
            </Grid> */}
          </Grid>
        </div>
        <div>
          {reviews.map(review => (
            <Grid container key={review._id} spacing={3}>
              <Grid item xs={12}>
                <Paper style={ styles.paper }>
                  <div className="review-content" id={review._id}>
                    <h2>Artist: {review.artistUsername}</h2>
                    <h3><a href={review.profileUrl}>Profile</a></h3>
                    <p>Artist Specialty: {review.artistSpecialty}</p>
                    <p>You rated them as: {review.rating}</p>
                    <Button component={Link} to={'/reviews/' + review._id} variant="contained" color="primary">
                View
                    </Button>
                  </div>
                </Paper>
              </Grid>
            </Grid>
          ))}
        </div>
      </Fragment>
    )
  }
}

export default withRouter(Reviews)
