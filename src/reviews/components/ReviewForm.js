import React from 'react'
import { withRouter, Link } from 'react-router-dom'

// import '../../../css/reviews/ReviewForm.scss'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import CssBaseline from '@material-ui/core/CssBaseline'

const styles = {
  div: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  editBtn: {
    margin: '.2rem'
  },
  paper: {
    maxWidth: '800px',
    padding: '2rem',
    margin: '2rem auto'
  },
  textfield: {
    margin: '.2rem'
  }
}

const ReviewForm = (
  { artistUsername, profileUrl, artistSpecialty, rating, handleSubmit, handleChange }) => (
  <div className="review-form-container">
    <CssBaseline />
    <div className="review-form">
      <h1>Review Form Title</h1>

      <form onSubmit={handleSubmit}>
        <Grid className="form-input" container spacing={2}>
          <Grid item xs={6} sm={6}>
            <TextField
              style={ styles.textfield }
              variant="outlined"
              required
              fullWidth
              id="artistUsername"
              label="Artist"
              name="artistUsername"
              value={artistUsername}
              type="text"
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6} sm={6}>
            <TextField
              style={ styles.textfield }
              variant="outlined"
              required
              fullWidth
              id="profileUrl"
              label="Profile URL"
              name="profileUrl"
              value={profileUrl}
              type="text"
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6} sm={6}>
            <TextField
              style={ styles.textfield }
              variant="outlined"
              required
              fullWidth
              id="artistSpecialty"
              label="Artist Specialty"
              name="artistSpecialty"
              value={artistSpecialty}
              type="text"
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6} sm={6}>
            <TextField
              style={ styles.textfield }
              variant="outlined"
              required
              fullWidth
              id="rating"
              label="Rating (1-10)"
              name="rating"
              value={rating}
              type="number"
              onChange={handleChange}
            />
          </Grid>
        </Grid>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
        >
          <Grid item>
            <div className="create-btn-submit">
              <Button type="submit" variant="contained" color="primary" style={ styles.editBtn }>Submit</Button>
              <Button component={Link} to="/reviews" variant="contained" color="secondary" style={ styles.editBtn }>Cancel</Button>
            </div>
          </Grid>
          {/* // <Grid item xs={10} sm={5}>
          //   <div className="create-btn-submit">
          //     <Button component={Link} to="/search-artist" variant="contained" color="primary" fullWidth>Search for artist</Button>
          //   </div>
          // </Grid> */}
        </Grid>
      </form>
    </div>
  </div>
)

export default withRouter(ReviewForm)
