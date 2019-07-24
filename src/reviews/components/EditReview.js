import React, { Component, Fragment } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import { withSnackbar } from 'notistack'

import ReviewForm from './ReviewForm'
import { showReview, editReview } from '../api'
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

class EditReview extends Component {
  constructor () {
    super()

    this.state = {
      review: null,
      deleted: false,
      edited: false
    }
  }

  componentDidMount () {
    const { user, snackBar } = this.props
    const id = this.props.match.params.id
    showReview(user, id)
      .then(response => this.setState({ review: response.data.review }))
      .catch(() => {
        snackBar(messages.showReviewFailure, { variant: 'warning' })
      })
  }

  handleChange = (event) => {
    this.setState({ review: {
      ...this.state.review, [event.target.name]: event.target.value
    } })
  }

    handleSubmit = (event) => {
      event.preventDefault()
      const { user, enqueueSnackbar } = this.props
      const { review } = this.state
      const id = this.props.match.params.id
      editReview(user, id, review)
        .then(response => this.setState({
          edited: true,
          review: response.data.review
        }))
        .then(() => enqueueSnackbar(messages.editReviewSuccess, { variant: 'success' }))
        .catch(() => {
          this.setState({
            review: { ...review, artistUsername: '', profileUrl: '', artistSpecialty: '', rating: '' }
          })
          enqueueSnackbar(messages.editReviewFailure, { variant: 'error' })
        }
        )
    }

    render () {
      const { review, edited } = this.state
      console.log(review)

      if (edited) {
        console.log(edited)
        return <Redirect to={{
          pathname: `/reviews/${this.props.match.params.id}`
        }} />
      }

      if (!this.state.review) {
        return (
          <div>
            <h3>Loading...</h3>
          </div>
        )
      }

      const { artistUsername, profileUrl, artistSpecialty, rating } = review
      return (
        <Fragment>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper style={ styles.paper }>
                <ReviewForm
                  artistUsername={artistUsername}
                  profileUrl={profileUrl}
                  artistSpecialty={artistSpecialty}
                  rating={rating}
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

export default withSnackbar(withRouter(EditReview))
