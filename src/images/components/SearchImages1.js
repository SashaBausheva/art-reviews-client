import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { withSnackbar } from 'notistack'

import { findImages, findRandomImage } from '../api'
import messages from '../messages.js'

import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import CssBaseline from '@material-ui/core/CssBaseline'
import ImagesResults from './ImagesResults'

const styles = {
  paper: {
    maxWidth: '600px',
    padding: '2rem',
    margin: '2rem auto'
  },
  editBtn: {
    margin: '.2rem'
  }
}

class SearchImages extends Component {
  constructor () {
    super()

    this.state = {
      query: '',
      empty: false,
      images: [],
      randomImage: [],
      random: false,
      nonRandom: false,
      searched: false
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  componentWillUpdate (nextProps, nextState) {
    if (nextState.random === true) {
      this.setState({ images: false, random: false })
    } else if (nextState.nonRandom === true) {
      this.setState({ randomImage: false, nonRandom: false })
    }
  }

  submitSearch = event => {
    this.setState({ nonRandom: true })
    const { query } = this.state
    const { user, enqueueSnackbar } = this.props
    event.preventDefault()
    findImages(query, user)
      .then((res) => {
        if ((res.data.results).length !== 0) {
          this.setState({ images: res.data.results, query: '', empty: false, random: false, randomImage: false, searched: true })
        } else {
          this.setState({ query: '', empty: true, random: false, randomImage: false, searched: true })
        }
      })
      .catch(() => {
        this.setState({ query: '' })
        enqueueSnackbar(messages.searchImagesFailure, { variant: 'error' })
      })
  }

  randomSearch = event => {
    this.setState({ random: true })
    const { user, enqueueSnackbar } = this.props
    event.preventDefault()
    findRandomImage(user)
      .then((res) => {
        if (res.data) {
          this.setState({ randomImage: res.data, query: '', empty: false, nonRandom: false, images: false, searched: true })
        } else {
          this.setState({ query: '', empty: true, nonRandom: false, images: false, searched: true })
        }
      })
      .catch(() => {
        this.setState({ query: '' })
        enqueueSnackbar(messages.searchImagesFailure, { variant: 'error' })
      })
  }

  render () {
    const { query, images, randomImage, empty, searched } = this.state

    if (!searched) {
      return (
        <div className='search-images-container'>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <div className="image-search-header">
                <h1>What would you like to find today?</h1>
              </div>
            </Grid>
          </Grid>
          <Paper style={styles.paper}>
            <CssBaseline />

            <div className="search-images-form">
              <form onSubmit={this.submitSearch}>
                <Grid
                  className="form-input"
                  container
                  justify="center"
                  alignItems="center">
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      name='query'
                      value={query}
                      type='text'
                      fullWidth
                      placeholder='Try another keyword?'
                      onChange={this.handleChange} />
                    <Grid item>
                      <div className="search-btn-submit">
                        <Button style={styles.editBtn} type="submit" onClick={this.submitSearch} value={1} variant="contained" color="primary">Search</Button>
                      </div>
                      <Button style={styles.editBtn} onClick={this.randomSearch} variant="contained" color="primary">Random Image</Button>
                    </Grid>
                  </Grid>
                </Grid>
              </form>
            </div>
          </Paper>
        </div>
      )
    } else if (empty) {
      return (
        <div className='search-images-container'>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <div className="image-search-header">
                <h1>What would you like to find today?</h1>
              </div>
            </Grid>
          </Grid>
          <Paper style={styles.paper}>
            <CssBaseline />

            <div className="search-images-form">
              <form onSubmit={this.submitSearch}>
                <Grid
                  className="form-input"
                  container
                  justify="center"
                  alignItems="center">
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      name='query'
                      value={query}
                      type='text'
                      fullWidth
                      placeholder='Try another keyword?'
                      onChange={this.handleChange} />
                    <Grid item>
                      <div className="search-btn-submit">
                        <Button style={styles.editBtn} type="submit" onClick={this.submitSearch} value={1} variant="contained" color="primary">Search</Button>
                      </div>
                      <Button style={styles.editBtn} onClick={this.randomSearch} variant="contained" color="primary">Random Image</Button>
                    </Grid>
                  </Grid>
                </Grid>
              </form>
            </div>
          </Paper>
          <div className="empty-search-results">
            <h4>We were unable to find anything for that keyword.</h4>
          </div>
        </div>
      )
    } else if (randomImage) {
      return (
        <div>
          <div className='search-images-container'>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <div className="image-search-header">
                  <h1>What would you like to find today?</h1>
                </div>
              </Grid>
            </Grid>
            <Paper style={styles.paper}>
              <CssBaseline />

              <div className="search-images-form">
                <form onSubmit={this.submitSearch}>
                  <Grid
                    className="form-input"
                    container
                    justify="center"
                    alignItems="center">
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        required
                        name='query'
                        value={query}
                        type='text'
                        fullWidth
                        placeholder='Keyword'
                        onChange={this.handleChange} />
                      <Grid item>
                        <div className="search-btn-submit">
                          <Button style={styles.editBtn} type="submit" variant="contained" color="primary">Search</Button>
                        </div>
                        <Button style={styles.editBtn} onClick={this.randomSearch} variant="contained" color="primary">Random Image</Button>

                      </Grid>
                    </Grid>
                  </Grid>
                </form>
              </div>
            </Paper>
          </div>

          <div className='images-results'>
            <ImagesResults key={randomImage.id}
              name={randomImage.alt_description}
              imageUrl={randomImage.urls.regular}
              fullUrl={randomImage.urls.full}
              userUrl={randomImage.user.links.html}
              altDescription={randomImage.alt_description}
              userName={randomImage.user.name}
              id={randomImage.id}
            />
          </div>
        </div>
      )
    } else if (images) {
      return (
        <div>
          <div className='search-images-container'>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <div className="image-search-header">
                  <h1>What would you like to find today?</h1>
                </div>
              </Grid>
            </Grid>
            <Paper style={styles.paper}>
              <CssBaseline />

              <div className="search-images-form">
                <form onSubmit={this.submitSearch}>
                  <Grid
                    className="form-input"
                    container
                    justify="center"
                    alignItems="center">
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        required
                        name='query'
                        value={query}
                        type='text'
                        fullWidth
                        placeholder='Keyword'
                        onChange={this.handleChange} />
                      <Grid item>
                        <div className="search-btn-submit">
                          <Button style={styles.editBtn} type="submit" variant="contained" color="primary">Search</Button>
                        </div>
                        <Button style={styles.editBtn} onClick={this.randomSearch} variant="contained" color="primary">Random Image</Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </form>
              </div>
            </Paper>
          </div>

          <div className='images-results'>
            {images.map(image =>
              <ImagesResults key={image.id}
                name={image.alt_description}
                imageUrl={image.urls.regular}
                fullUrl={image.urls.full}
                userUrl={image.user.links.html}
                altDescription={image.alt_description}
                userName={image.user.name}
                id={image.id}
              />)}
          </div>
        </div>
      )
    }
  }
}

export default withSnackbar(withRouter(SearchImages))
