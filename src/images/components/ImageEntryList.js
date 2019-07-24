import React, { Component, Fragment } from 'react'
import { withRouter, Link } from 'react-router-dom'

import { indexImageEntries } from '../api'
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

class ImageEntries extends Component {
  constructor () {
    super()

    this.state = {
      images: []
    }
  }

  componentDidMount () {
    const { user, snackBar } = this.props

    indexImageEntries(user)
      .then((response) => {
        if (response.data.images.length !== 0) {
          this.setState({
            images: response.data.images
          })
        } else {
          this.setState({
            noImageEntries: response.data.images
          })
        }
      }
      )
      .catch(() => {
        snackBar(messages.showImageEntriesFailure, { variant: 'warning' })
      })
  }

  render () {
    const { images, noImageEntries } = this.state

    if (noImageEntries) {
      return (
        <div className="empty-results-container">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper style={ styles.paper }>
                <CssBaseline />
                <div className="empty-results">
                  <h3>No images</h3>
                  <Button style={ styles.editBtn } component={Link} to="/create-image-entry" variant="contained" color="primary">
                    New Image Entry
                    <AddIcon />
                  </Button>
                </div>
              </Paper>
            </Grid>
          </Grid>
        </div>
      )
    } else if (images.length === 0) {
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
          <h1 className="my-images-header">Your Image Entries</h1>
          <Grid container spacing={3}>
            <Grid item>
              <div className="image-btn-submit">
                <Button component={Link} to="/create-image-entry" color="secondary" variant="contained" fullWidth>
                  New Image Entry
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
          {images.map(image => (
            <Grid container key={image._id} spacing={3}>
              <Grid item xs={12}>
                <Paper style={ styles.paper }>
                  <div className="image-content" id={image._id}>
                    <h2>Artist: {image.artistUsername}</h2>
                    <h3><a href={image.profileUrl}>Profile</a></h3>
                    <p>Artist Specialty: {image.artistSpecialty}</p>
                    <p>You rated them as: {image.rating}</p>
                    <Button component={Link} to={'/images/' + image._id} variant="contained" color="primary">
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

export default withRouter(ImageEntries)
