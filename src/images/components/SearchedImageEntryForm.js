import React from 'react'
import { withRouter, Link } from 'react-router-dom'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import CssBaseline from '@material-ui/core/CssBaseline'
import Paper from '@material-ui/core/Paper'

const styles = {
  buttons: {
    margin: '1rem .2rem 0 .2rem',
    outline: 'none'
  },
  div: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  h2: {
    fontFamily: 'Raleway',
    margin: '1rem auto',
    textAlign: 'center'
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

const SearchedImageEntryForm = (
  { id, imageUrl, fullUrl, userUrl, altDescription, userName, comments, handleSubmit, handleChange }) => (
  <div className="image-form-container">
    <Paper style={ styles.paper }>
      <CssBaseline />
      <div className="image-form">
        <h2 style={styles.h2}>Add to Collection</h2>
        <form className="form" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
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
                <Button type="submit" variant="contained" color="primary" style={ styles.buttons }>Submit</Button>
              </div>
            </Grid>
            <Grid item>
              <div className="create-btn-submit">
                <Button component={Link} to="/image-search" variant="contained" color="secondary" style={ styles.buttons }>Cancel</Button>
              </div>
            </Grid>
          </Grid>
        </form>
      </div>
    </Paper>
  </div>
)

export default withRouter(SearchedImageEntryForm)
