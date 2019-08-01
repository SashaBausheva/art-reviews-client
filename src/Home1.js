import React from 'react'

const styles = {
  h3: {
  }
}

const authenticatedHome = (
  <React.Fragment>
    <div>
      <h3 style={styles.h3}>Substitute Home component (signed in)</h3>
    </div>
  </React.Fragment>
)

const unauthenticatedHome = (
  <React.Fragment>
    <div>
      <h3 style={styles.h3}>Substitute Home component (not signed in)</h3>
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
