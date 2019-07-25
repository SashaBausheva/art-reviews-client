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
        comments: '',
        id: ''
      },
      created: false,
      message: null
    }
  }

  componentDidMount () {
    const { imageUrlPlaceholder, altDescriptionPlaceholder, userNamePlaceholder, id, fullUrl, userUrl } = this.props.location.searchResults

    this.setState({
      image: {
        imageUrl: imageUrlPlaceholder,
        fullUrl: fullUrl,
        userUrl: userUrl,
        altDescription: altDescriptionPlaceholder,
        userName: userNamePlaceholder,
        comments: '',
        id: id
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
      const { user, enqueueSnackbar } = this.props
      const { image } = this.state
      // console.log('on handlesumbit image is ', image)
      createImageEntry(user, image)
        .then(response => this.setState({
          created: true,
          image: response.data.image
        }))
        .then(() => console.log('after created image is', this.state.image))
        .then(() => enqueueSnackbar(messages.createImageEntrySuccess, { variant: 'success' }))
        .catch(() => {
          this.setState({
            image: { ...image, imageUrl: '', fullUrl: '', userUrl: '', altDescription: '', userName: '', comments: '', id: '' }
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

      const { imageUrlPlaceholder, altDescriptionPlaceholder, userNamePlaceholder, id, userUrl, fullUrl } = this.props.location.searchResults
      const { imageUrl, altDescription, userName, comments } = image
      console.log('this is image fullUrl is ', image.fullUrl)
      return (
        <Fragment>
          <SearchedImageEntryForm
            imageUrl={imageUrl}
            fullUrl={fullUrl}
            altDescription={ altDescription || '' }
            userName={userName}
            userUrl={userUrl}
            comments={comments}
            imageUrlPlaceholder={imageUrlPlaceholder}
            altDescriptionPlaceholder={ altDescriptionPlaceholder || '' }
            userNamePlaceholder={userNamePlaceholder}
            id={id}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
          />
        </Fragment>
      )
    }
}

export default withSnackbar(withRouter(CreateImageEntryFromSearch))
