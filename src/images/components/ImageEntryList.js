import React, { Component, Fragment } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { withSnackbar } from 'notistack'

import { indexImageEntries, deleteImageEntry } from '../api'
import messages from '../messages'

import LinearProgress from '@material-ui/core/LinearProgress'
import AddIcon from '@material-ui/icons/Add'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'

import DeleteForever from '@material-ui/icons/DeleteForever'
import Fab from '@material-ui/core/Fab'

const styles = {
  addImage: {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed'
  },
  altDescription: {
    textTransform: 'capitalize',
    marginTop: '.2rem',
    marginBottom: '.5rem'
  },
  buttons: {
    margin: '.2rem'
  },
  card: {
    maxWidth: '80%',
    margin: '1.5rem auto'
  },
  div: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  h1: {
    marginTop: '1.5rem',
    textAlign: 'center',
    alignSelf: 'center'
  },
  media: {
    height: 400
  },
  paper: {
    maxWidth: '800px',
    padding: '2rem',
    margin: '1rem auto'
  }
}

class ImageEntries extends Component {
  constructor () {
    super()

    this.state = {
      images: [],
      deleted: false
    }
  }

  componentDidMount () {
    const { user, enqueueSnackbar } = this.props

    indexImageEntries(user)
      .then((response) => {
        const myImages = (response.data.images).filter(image => image.editable)
        if (myImages.length !== 0) {
          this.setState({
            images: myImages
          })
        } else {
          this.setState({
            noImageEntries: true
          })
        }
      }
      )
      .catch(() => {
        enqueueSnackbar(messages.showImageEntriesFailure, { variant: 'error' })
      })
  }

  handleDelete = (event) => {
    event.preventDefault()
    const { user, enqueueSnackbar } = this.props
    const id = event.currentTarget.value
    deleteImageEntry(user, id)
      .then(() => this.setState({ deleted: true }))
      .then(() => {
        indexImageEntries(this.props.user)
          .then((response) => {
            const myImages = (response.data.images).filter(image => image.editable)
            if (myImages.length !== 0) {
              this.setState({
                images: myImages, deleted: false
              })
            } else {
              this.setState({
                noImageEntries: true
              })
            }
          }
          )
          .catch(() => enqueueSnackbar(messages.deleteImageEntrySuccess, { variant: 'success' }))
      })
      .then(() => enqueueSnackbar(messages.deleteImageEntrySuccess, { variant: 'success' }))
      .catch(() => enqueueSnackbar(messages.deleteImageEntryFailure, { variant: 'error' })
      )
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
                  <Button style={ styles.buttons } component={Link} to="/image-search" variant="contained" color="primary">
                    Find Images
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
        <Fab color="secondary" aria-label="Add" style={styles.addImage} component={Link} to="/image-search">
          <AddIcon />
        </Fab>
        <div>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <h1 className="my-images-header" style={styles.h1}>Your Collection</h1>
            </Grid>
          </Grid>
          {/* <Grid container spacing={3}>
            <Grid item>
              <div className="image-btn-submit">
                <Button component={Link} style={styles.buttons} to="/image-search" color="secondary" variant="contained" fullWidth>
                  Find More Images <AddIcon />
                </Button>
              </div>
            </Grid>
            <Grid item xs={12} sm={5}>
              <div className="review-btn-submit">
                <Button component={Link} to="/search-artist" variant="contained" color="primary" fullWidth>Find Artist</Button>
              </div>
            </Grid>
          </Grid> */}
        </div>
        <div>
          {this.state.images.map(image => (
            <Grid container key={image._id} spacing={3}>
              <Grid item xs={12}>
                <Card style={styles.card}>
                  <CardMedia
                    style={styles.media}
                    image={image.imageUrl}
                    title={image.altDescription}
                  />
                  <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                      By <a href={`${image.userUrl}?utm_source=picture_it&utm_medium=referral`} target="_blank" rel="noopener noreferrer">{image.userName}</a> on Unsplash
                    </Typography>
                    <Typography gutterBottom variant="h5" component="h2" style={ styles.altDescription }>
                      {image.altDescription}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                    Your notes:
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      {image.comments}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <div style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                      <div>
                        <Button size="small" color="primary" href={image.fullUrl} target="_blank" rel="noopener noreferrer" download={image.fullUrl}>
                          Full Size
                        </Button>
                        <Button component={Link} to={'/images/' + image._id} size="small" color="primary">
                          View Info
                        </Button>
                      </div>
                      <div><Button onClick={this.handleDelete} value={image._id}>
                        <DeleteForever color="secondary" />
                      </Button>
                      </div>
                    </div>
                  </CardActions>
                </Card>
              </Grid>
            </Grid>
          ))}
        </div>
      </Fragment>
    )
  }
}

export default withSnackbar(withRouter(ImageEntries))
