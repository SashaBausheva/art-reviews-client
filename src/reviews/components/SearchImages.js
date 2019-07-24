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

class SearchImages extends Component {
  constructor () {
    super()

    this.state = {
      query: '',
      empty: false,
      images: []
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  submitSearch = event => {
    const { query } = this.state
    const { user, snackBar } = this.props
    event.preventDefault()
    findImages(query, user)
      .then((res) => {
        if (res.data.results) {
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
        <div>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
          >
            <Grid item xs={10} sm={10}>
              <div className="image-search-header">
                <h1>There is nothing like that in the database! Try another key word?</h1>
              </div>
            </Grid>
          </Grid>
          <div className='search-images-container'>
            <Paper>
              <CssBaseline />
              <div className="search-images-form">

                <form onSubmit={this.submitSearch}>
                  <Grid className="form-input" container>
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        name='query'
                        value={query}
                        type='text'
                        placeholder='What are you looking for today?'
                        onChange={this.handleChange} />
                    </Grid>
                  </Grid>

                  <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                  >
                    <Grid item xs={10} sm={4}>
                      <div className="search-btn-submit">
                        <Button type="submit" variant="contained" color="primary" fullWidth>Search</Button>
                      </div>
                    </Grid>
                  </Grid>
                </form>
              </div>
            </Paper>
            <div className="empty-results-container">
              <Paper>
                <CssBaseline />
                <div className="empty-results">
                  <h3>Could not find any results.</h3 >
                </div>
              </Paper>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
          >
            <Grid item xs={10} sm={10}>
              <div className="search-images-header">
                <h1>What would you like to find today?</h1>
              </div>
            </Grid>
          </Grid>

          <div className='search-images-container'>
            <Paper>
              <CssBaseline />
              <div className="search-images-form">
                <form onSubmit={this.submitSearch}>
                  <Grid className="form-input" container>
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        name='query'
                        value={query}
                        type='text'
                        placeholder='Keyword'
                        onChange={this.handleChange} />
                    </Grid>
                  </Grid>

                  <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                  >
                    <Grid item xs={10} sm={4}>
                      <div className="search-btn-submit">
                        <Button type="submit" variant="contained" color="primary" fullWidth>Search</Button>
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
                alt={image.alt_description}
                id={image.id}
              />)}
          </div>
        </div>
      )
    }
  }
}

export default withSnackbar(withRouter(SearchImages))
