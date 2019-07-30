import React from 'react'
import { withRouter, Link } from 'react-router-dom'

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
    margin: '.2rem',
    outline: 'none'
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

const ImageEntryForm = (
  { imageUrl, altDescription, userName, comments, handleSubmit, handleChange }) => (
  <div className="image-form-container">
    <CssBaseline />
    <div className="image-form">
      <h1>Image Form Title Here</h1>

      <form onSubmit={handleSubmit}>
        <Grid className="form-input" container spacing={2}>
          <Grid item xs={6} sm={6}>
            <TextField
              style={ styles.textfield }
              variant="outlined"
              required
              fullWidth
              id="imageUrl"
              label="Unsplash Image URL"
              name="imageUrl"
              value={imageUrl}
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
              id="altDescription"
              label="Image Title"
              name="altDescription"
              value={altDescription}
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
              id="userName"
              label="User on Unsplash"
              name="userName"
              value={userName}
              type="text"
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6} sm={6}>
            <TextField
              style={ styles.textfield }
              variant="outlined"
              fullWidth
              required
              id="comments"
              label="Your comments"
              name="comments"
              value={comments}
              type="text"
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
              <Button component={Link} to="/images" variant="contained" color="secondary" style={ styles.editBtn }>Cancel</Button>
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

export default withRouter(ImageEntryForm)
