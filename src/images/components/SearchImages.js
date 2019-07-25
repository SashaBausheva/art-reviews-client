import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { withSnackbar } from 'notistack'

import { findImages } from '../api'
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
      searched: false
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  submitSearch = event => {
    const { query } = this.state
    const { user, snackBar } = this.props
    console.log('event is ', event)
    event.preventDefault()
    findImages(query, user)
      .then((res) => {
        if ((res.data.results).length !== 0) {
          console.log(res)
          this.setState({ images: res.data.results, query: '', empty: false })
          console.log('this is images: ', this.state.images)
        } else {
          this.setState({ query: '', empty: true })
        }
      })
      .catch(() => {
        this.setState({ query: '' })
        snackBar(messages.searchImagesFailure, { variant: 'error' })
      })
  }

  render () {
    const { query, images, empty } = this.state

    if (empty) {
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
                      <div className="search-btn-submit">
                        <Button style={styles.editBtn} type="submit" onClick={this.submitSearch} value={2} variant="contained" color="primary">Search</Button>
                      </div>
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
    } else {
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
