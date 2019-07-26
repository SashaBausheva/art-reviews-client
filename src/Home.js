import React from 'react'

const styles = {
  h3: {
    margin: '3rem auto'
  }
}

const authenticatedHome = (
  <React.Fragment>
    <div>
      <h3 style={styles.h3}>Welcome.</h3>
      <img src="http://giphygifs.s3.amazonaws.com/media/PZYSUDk0ajJnO/giphy.gif" />
    </div>
  </React.Fragment>
)

const unauthenticatedHome = (
  <React.Fragment>
    <div>
      <h3 style={styles.h3}>The last <s>3 months</s> 4 days:</h3>
      <img src="https://media.giphy.com/media/14akZTBhO7rW00/giphy.gif" />
    </div>
  </React.Fragment>
)

const Home = ({ snackBar, user }) => (
  <div className='home-container'>
    <div className='home-content-title'>
      { user ? authenticatedHome : unauthenticatedHome }
    </div>
    <div className='home-content'>
    </div>
  </div>
)

export default Home
