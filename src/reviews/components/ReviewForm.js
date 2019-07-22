import React from 'react'
import { withRouter, Link } from 'react-router-dom'

// import '../../../css/reviews/ReviewForm.scss'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import CssBaseline from '@material-ui/core/CssBaseline'
import Paper from '@material-ui/core/Paper'

const ReviewForm = (
  { artistUsername, profileUrl, artistSpecialty, rating, handleSubmit, handleChange }) => (
  <div className="review-form-container">
    <Paper>
      <CssBaseline />
      <div className="review-form">
        <h1>Review Form Title</h1>

        <form onSubmit={handleSubmit}>
          <Grid className="form-input" container spacing={2}>
            <Grid item xs={6} sm={6}>
              <TextField
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
            <Grid item xs={10} sm={5}>
              <div className="create-btn-submit">
                <Button type="submit" variant="contained" color="primary" fullWidth>Submit</Button>
              </div>
            </Grid>
            {/* // <Grid item xs={10} sm={5}>
            //   <div className="create-btn-submit">
            //     <Button component={Link} to="/search-artist" variant="contained" color="primary" fullWidth>Search for artist</Button>
            //   </div>
            // </Grid> */}
          </Grid>
          <Grid container
            direction="row"
            justify="center"
            alignItems="center"
          >
            <Grid item xs={10} sm={8}>
              <div className="create-btn-submit">
                <Button component={Link} to="/reviews" variant="contained" color="secondary" fullWidth>Cancel</Button>
              </div>
            </Grid>
          </Grid>
        </form>
      </div>
    </Paper>
  </div>
)

export default withRouter(ReviewForm)
