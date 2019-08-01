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
import LinearProgress from '@material-ui/core/LinearProgress'

const styles = {
  buttons: {
    margin: '1rem .2rem 0 .2rem',
    outline: 'none'
  },
  h1: {
    textAlign: 'center',
    alignSelf: 'center'
  },
  noResults: {
    textAlign: 'center',
    alignSelf: 'center'
  },
  paper: {
    maxWidth: '80%',
    padding: '2rem',
    margin: '2rem auto'
  }
}

class SearchImages extends Component {
  _isMounted = false

  constructor () {
    super()

    this.state = {
      isLoading: true,
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

  componentDidMount () {
    this._isMounted = true
  }

  componentWillUnmount () {
    this._isMounted = false
  }

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
        console.log('then is running now')
        console.log('res data is ', res.data.images)
        if (this._isMounted) {
          if ((res.data.images.results).length !== 0) {
            this.setState({ images: res.data.images.results, query: '', empty: false, random: false, randomImage: false, searched: true })
          } else {
            this.setState({ query: '', empty: true, random: false, randomImage: false, searched: true })
          }
        }
      })
      .catch(() => {
        console.log('error is running now')
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
          console.log('random image res data', res.data)
          if (this._isMounted) {
            this.setState({ randomImage: res.data.image, query: '', empty: false, nonRandom: false, images: false, searched: true })
          } else {
            this.setState({ query: '', empty: true, nonRandom: false, images: false, searched: true })
          }
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
                <h1 style={styles.h1}>What would you like to find today?</h1>
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
                  </Grid>
                  <Grid item>
                    <div className="search-btn-submit">
                      <Button type="submit" style={ styles.buttons } onClick={this.submitSearch} variant="contained" color="primary">Search</Button>
                    </div>
                  </Grid>
                  <Grid item>
                    <div className="search-btn-random">
                      <Button style={ styles.buttons } onClick={this.randomSearch} variant="contained" color="primary">Random Image</Button>
                    </div>
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
                <h1 style={styles.h1}>What would you like to find today?</h1>
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
                  </Grid>
                  <Grid item>
                    <div className="search-btn-submit">
                      <Button type="submit" style={ styles.buttons } onClick={this.submitSearch} variant="contained" color="primary">Search</Button>
                    </div>
                  </Grid>
                  <Grid item>
                    <div className="search-btn-random">
                      <Button style={ styles.buttons } onClick={this.randomSearch} variant="contained" color="primary">Random Image</Button>
                    </div>
                  </Grid>
                </Grid>
              </form>
            </div>
          </Paper>
          <div className="empty-search-results">
            <h4 style={styles.noResults}>We were unable to find anything for that keyword.</h4>
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
                  <h1 style={styles.h1}>What would you like to find today?</h1>
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
                    </Grid>
                    <Grid item>
                      <div className="search-btn-submit">
                        <Button type="submit" style={ styles.buttons } onClick={this.submitSearch} variant="contained" color="primary">Search</Button>
                      </div>
                    </Grid>
                    <Grid item>
                      <div className="search-btn-random">
                        <Button style={ styles.buttons } onClick={this.randomSearch} variant="contained" color="primary">Random Image</Button>
                      </div>
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
                  <h1 style={styles.h1}>What would you like to find today?</h1>
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
                    </Grid>
                    <Grid item>
                      <div className="search-btn-submit">
                        <Button type="submit" style={ styles.buttons } onClick={this.submitSearch} variant="contained" color="primary">Search</Button>
                      </div>
                    </Grid>
                    <Grid item>
                      <div className="search-btn-random">
                        <Button style={ styles.buttons } onClick={this.randomSearch} variant="contained" color="primary">Random Image</Button>
                      </div>
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
    } else {
      return (
        <div className="empty-results-container">
          <Grid container>
            <Grid item xs={6} style={styles.loading}>
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
  }
}

export default withSnackbar(withRouter(SearchImages))
