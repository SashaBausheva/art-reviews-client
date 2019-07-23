import React from 'react'

const styles = {
  h2: {
    margin: '3rem auto'
  }
}

const authenticatedHome = (
  <React.Fragment>
    <div>
      <h2 style={styles.h2}>You can now add artists to your collection!</h2>
    </div>
  </React.Fragment>
)

const unauthenticatedHome = (
  <React.Fragment>
    <div>
      <h2 style={styles.h2}>Please sign in to see your reviews or add artists to your collection.</h2>
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
