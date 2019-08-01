import React, { Component, Fragment } from 'react'
import { withRouter, Link, Redirect } from 'react-router-dom'
import { withSnackbar } from 'notistack'

import messages from '../messages'
import { showImageEntry, deleteImageEntry } from '../api'

import LinearProgress from '@material-ui/core/LinearProgress'
import Button from '@material-ui/core/Button'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import CardActions from '@material-ui/core/CardActions'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'

import Fab from '@material-ui/core/Fab'
import DeleteForever from '@material-ui/icons/DeleteForever'
import Edit from '@material-ui/icons/Edit'
import ArrowBackIos from '@material-ui/icons/ArrowBackIos'

const styles = {
  altDescription: {
    textTransform: 'capitalize',
    margin: '.5rem auto'
  },
  backButton: {
    margin: 0,
    bottom: 'auto',
    left: 20,
    top: 80,
    right: 'auto',
    position: 'fixed',
    outline: 'none'
  },
  card: {
    maxWidth: '70%',
    margin: '2rem auto'
  },
  cardActions: {
    width: '100%',
    margin: '0'
  },
  editBtn: {
    margin: '.2rem auto'
  },
  loading: {
    display: 'inline-block',
    position: 'relative',
    margin: '40vh auto'
  },
  media: {
    height: 400
  },
  paper: {
    padding: '2rem',
    margin: '2rem auto'
  }
}

class ImageEntry extends Component {
  constructor () {
    super()

    this.state = {
      image: null,
      deleted: false
    }
  }

  componentDidMount () {
    const { user, enqueueSnackbar } = this.props
    const id = this.props.match.params.id
    showImageEntry(user, id)
      .then(response => this.setState({ image: response.data.image }))
      .catch(() => {
        enqueueSnackbar(messages.showImageEntryFailure, { variant: 'success' })
      })
  }

  handleDelete = (event) => {
    event.preventDefault()
    const { user, enqueueSnackbar } = this.props
    const id = this.props.match.params.id
    deleteImageEntry(user, id)
      .then(() => this.setState({ deleted: true }))
      .then(() => enqueueSnackbar(messages.deleteImageEntrySuccess, { variant: 'success' }))
      .catch(() => {
        enqueueSnackbar(messages.deleteImageEntryFailure, { variant: 'error' })
      })
  }

  render () {
    if (!this.state.image) {
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

    if (this.state.deleted) {
      return <Redirect to={{
        pathname: '/images'
      }} />
    }

    const { imageUrl, fullUrl, userUrl, altDescription, userName, comments } = this.state.image

    return (
      <Fragment>
        <Fab color="primary" aria-label="add" style={styles.backButton} component={Link} to="/images" >
          <ArrowBackIos/>
        </Fab>
        <Card style={styles.card}>
          <CardMedia
            style={styles.media}
            image={imageUrl}
            title={altDescription}
          />
          <CardContent>
            <div className="image-content" >
              <Typography variant="body2" color="textSecondary" component="p">
               By <a href={userUrl} target="_blank" rel="noopener noreferrer">{userName}</a> on Unsplash
              </Typography>
              <Typography gutterBottom variant="h5" component="h2" style={styles.altDescription}>
                {altDescription}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
              Your notes:
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {comments}
              </Typography>
            </div>
          </CardContent>
          <CardActions>
            <div style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
              <div>
                <Button href={imageUrl} size="small" color="primary" target="_blank" rel="noopener noreferrer">
                Full Size
                </Button>
                <Button size="small" color="primary" href={fullUrl} target="_blank" rel="noopener noreferrer">
                  High Resolution
                </Button>
              </div>
              <span>
                <Button component={Link} to={this.props.match.url + '/edit'} color="primary" size="small">
                  Edit <Edit />
                </Button>
                <Button onClick={this.handleDelete} color="secondary" size="small">
                Delete <DeleteForever color="secondary" />
                </Button>
              </span>
            </div>
          </CardActions>
        </Card>
      </Fragment>
    )
  }
}

export default withSnackbar(withRouter(ImageEntry))
