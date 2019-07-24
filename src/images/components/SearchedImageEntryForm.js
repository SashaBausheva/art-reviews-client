import React from 'react'
import { withRouter, Link } from 'react-router-dom'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import CssBaseline from '@material-ui/core/CssBaseline'
import Paper from '@material-ui/core/Paper'

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

const SearchedImageEntryForm = (
  { id, imageUrl, fullUrl, userUrl, altDescription, userName, comments, handleSubmit, handleChange }) => (
  <div className="image-form-container">
    <Paper>
      <CssBaseline />
      <div className="image-form">
        <form className="form" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
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
                required
                fullWidth
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
            <Grid item xs={10} sm={5}>
              <div className="create-btn-submit">
                <Button type="submit" variant="contained" color="primary" fullWidth>Submit</Button>
              </div>
            </Grid>
            <Grid item xs={10} sm={5}>
              <div className="create-btn-submit">
                <Button component={Link} to="/image-search" variant="contained" color="secondary" fullWidth>Cancel</Button>
              </div>
            </Grid>
          </Grid>
        </form>
      </div>
    </Paper>
  </div>
)

export default withRouter(SearchedImageEntryForm)
