import React, { Component, Fragment } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import { withSnackbar } from 'notistack'

import ReviewForm from './ReviewForm'
import { createReview } from '../api'
import messages from '../messages'

class CreateReview extends Component {
  constructor () {
    super()

    this.state = {
      review: {
        artistUsername: '',
        profileUrl: '',
        artistSpecialty: '',
        rating: ''
      },
      created: false,
      message: null
    }
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
      createReview(user, review)
        .then(response => this.setState({
          created: true,
          review: response.data.review
        }))
        .then(() => enqueueSnackbar(messages.createReviewSuccess, 'success'))
        .catch(() => {
          this.setState({
            review: { ...review, artistUsername: '', profileUrl: '', artistSpecialty: '', rating: '' }
          })
          enqueueSnackbar(messages.createReviewFailure, 'error')
        }
        )
    }

    render () {
      const { review, created } = this.state

      if (created) {
        return <Redirect to={{
          pathname: '/reviews'
        }} />
      }

      const { artistUsername, profileUrl, artistSpecialty, rating } = review
      return (
        <Fragment>
          <ReviewForm
            artistUsername={artistUsername}
            profileUrl={profileUrl}
            artistSpecialty={artistSpecialty}
            rating={rating}
            // gallery={this.state.review.artistUsername.gallery}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
          />
        </Fragment>
      )
    }
}

export default withSnackbar(withRouter(CreateReview))
