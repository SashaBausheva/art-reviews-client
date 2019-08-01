import React, { Component } from 'react'
import './css/index.scss'
import Carousel from 'react-bootstrap/Carousel'
import { indexImageEntries, findRandomImages } from './images/api'
import { Link } from 'react-router-dom'
import ChevronRight from '@material-ui/icons/ChevronRight'
import LinearProgress from '@material-ui/core/LinearProgress'
import Paper from '@material-ui/core/Paper'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'

const styles = {
  h3: {
    margin: '3rem auto'
  },
  imageTitle: {
    textTransform: 'capitalize',
    textShadowColor: 'black',
    textShadowOffset:
      { width: '0px', height: '0px' },
    textShadowRadius: 10
  },
  images: {
    objectFit: 'cover',
    backgroundPosition: 'center',
    height: '100vh'
  },
  loading: {
    display: 'inline-block',
    position: 'relative',
    margin: '40vh auto'
  },
  paper: {
    maxWidth: '800px',
    padding: '2rem',
    margin: '1rem auto'
  }
}

class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoading: true,
      images: []
    }
  }

  componentDidMount () {
    const { user } = this.props

    if (user) {
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
          console.log('error')
        })
    } else {
      findRandomImages()
        .then(
          (response) => {
            this.setState({ images: response.data.images })
            console.log('random images response', response)
          })
        .catch(() => {
          console.log('error on findRandomImages in Home.js')
        })
    }
  }

  render () {
    console.log('render')
    if ((this.state.images).length === 0) {
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

    return (

      <Carousel interval={5000} style={{ height: '100vh', marginTop: '-100px' }}>
        {this.state.images.map(image => (
          <Carousel.Item key={`${this.props.user ? image._id : image.id}`}>
            <img style={styles.images}
              className="d-block w-100"
              src={this.props.user && image.fullUrl ? image.fullUrl : image.urls.full}
              alt={this.props.user ? image.altDescription : image.alt_description}
            />
            { this.props.user ? (
              <h4 style={{ left: 0, position: 'absolute', textAlign: 'center', top: '70%', width: '100%', background: 'rgba(255, 255, 255, .6)', padding: '1.5rem 0' }}>
                <Link to={`images/${image._id}`} style={{ color: 'white', textDecoration: 'none' }}>See this in your collection<ChevronRight /></Link>
              </h4>
            ) : (
              <div>
                <h4 style={{ left: 0, position: 'absolute', textAlign: 'center', top: '70%', width: '100%', background: 'rgba(255, 255, 255, .6)', padding: '1.5rem 0' }}>
                  <Link to={'/sign-in'} style={{ color: 'white', textDecoration: 'none' }}>Sign in to start collecting<ChevronRight /></Link>
                </h4>
              </div>
            )}
            <Carousel.Caption>
              <h3 style={ styles.imageTitle }>{this.props.user ? image.altDescription : image.alt_description}</h3>
                By <a href={`${this.props.user ? image.userUrl : image.user.links.self}?utm_source=picture_it&utm_medium=referral`} style={{ color: 'white', textDecoration: 'underline' }} target="_blank" rel="noopener noreferrer">{this.props.user ? image.userName : image.user.name}</a> on Unsplash
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    )
  }
}

export default Home
