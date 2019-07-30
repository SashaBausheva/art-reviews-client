import React, { Component } from 'react'
import Carousel from 'react-bootstrap/Carousel'
import { indexImageEntries } from './images/api'

const styles = {
  h3: {
    margin: '3rem auto',
    backgroundColor: 'red'
  }
}

class Home extends Component {
  _isMounted = false

  constructor () {
    super()

    this.state = {
      isLoading: true,
      images: [],
      deleted: false
    }
  }

  componentDidMount () {
    this._isMounted = true
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
    }
  }

  componentWillUnmount () {
    this._isMounted = false
  }

  render () {
    const { user } = this.props
    const { images, noImageEntries, isLoading } = this.state
    console.log('rendering start')
    console.log('this props is ', this.props)
    console.log('this state is ', this.state)
    console.log('is mounted? ', this._isMounted)

    if (user && images) {
      console.log('first if statement is running')
      console.log('is loading? ', isLoading)
      if (this._isMounted) {
        console.log(images)
        return (
          <Carousel interval={5000} style={{ height: '100vh' }}>
            {images.map(image => (
              <Carousel.Item key={image._id}>
                <img style={{ objectFit: 'cover', objectPosition: 'center', height: '100vh' }}
                  className="w-100"
                  src={image.fullUrl}
                  alt="First slide"
                />
                <Carousel.Caption>
                  <h3>{image.altDescription}</h3>
                  By <a href={`${image.userUrl}?utm_source=picture_it&utm_medium=referral`} target="_blank" rel="noopener noreferrer">{image.userName}</a> on Unsplash
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
        )
      } else {
        return (
          <h3>Loading...</h3>
        )
      }
    } else if (user && noImageEntries) {
      return (
        <React.Fragment>
          <div>
            <h3 style={styles.h3}>No image entries</h3>
          </div>
        </React.Fragment>
      )
    } else {
      return (
        <React.Fragment>
          <div>
            <h3 style={styles.h3}>The last <s>3 months</s> 4 days:</h3>
            <img src="./what_to_do.gif" />
          </div>
        </React.Fragment>
      )
    }
  }
}

export default Home
