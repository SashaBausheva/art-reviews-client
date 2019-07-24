import React, { Component, Fragment } from 'react'
import { withRouter, Redirect } from 'react-router-dom'

import SearchedImageEntryForm from './SearchedImageEntryForm'
import { createImageEntry } from '../api'
import { withSnackbar } from 'notistack'
import messages from '../messages'

class CreateImageEntryFromSearch extends Component {
  constructor () {
    super()

    this.state = {
      image: {
        imageUrl: '',
        altDescription: '',
        userName: '',
        comments: ''
      },
      created: false,
      message: null
    }
  }

  componentDidMount () {
    const { imageUrlPlaceholder, altDescriptionPlaceholder, userNamePlaceholder } = this.props.location.searchResults

    this.setState({
      image: {
        imageUrl: imageUrlPlaceholder,
        altDescription: altDescriptionPlaceholder,
        userName: userNamePlaceholder,
        comments: ''
      }
    })
  }

  handleChange = (event) => {
    this.setState({ image: {
      ...this.state.image, [event.target.name]: event.target.value
    } })
  }

    handleSubmit = (event) => {
      event.preventDefault()
      const { user, snackBar } = this.props
      const { image } = this.state
      createImageEntry(user, image)
        .then(response => this.setState({
          created: true,
          image: response.data.image
        }))
        .then(() => snackBar(messages.createImageEntrySuccess, 'success'))
        .catch(() => {
          this.setState({
            image: { ...image, imageUrl: '', altDescription: '', userName: '', comments: '' }
          })
          snackBar(messages.createImageEntryFailure, 'error')
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

      const { imageUrlPlaceholder, altDescriptionPlaceholder, userNamePlaceholder } = this.props.location.searchResults
      const { imageUrl, altDescription, userName, comments } = image
      return (
        <Fragment>
          <SearchedImageEntryForm
            imageUrl={imageUrl}
            altDescription={altDescription}
            userName={userName}
            comments={comments}
            imageUrlPlaceholder={imageUrlPlaceholder}
            altDescriptionPlaceholder={altDescriptionPlaceholder}
            userNamePlaceholder={userNamePlaceholder}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
          />
        </Fragment>
      )
    }
}

export default withSnackbar(withRouter(CreateImageEntryFromSearch))
