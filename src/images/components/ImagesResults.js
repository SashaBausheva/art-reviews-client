import React from 'react'
import { Link } from 'react-router-dom'

import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

const styles = {
  card: {
    maxWidth: '50%'
  },
  div: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  editBtn: {
    margin: '.2rem'
  },
  media: {
    height: 300
  },
  paper: {
    maxWidth: '800px',
    padding: '2rem',
    margin: '2rem auto'
  }
}

const ImagesResults = ({ id, imageUrl, altDescription, userName, comments }) => (
  <div className='image-card'>
    <Card style={styles.card}>
      <CardActionArea>
        <CardMedia
          style={styles.media}
          image={imageUrl}
          title={altDescription}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {altDescription}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
           By {userName} on Unsplash
           img id: {id}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button fullWidth component={Link} to={{
          pathname: '/create-image-entry-from-search',
          searchResults: {
            imageUrlPlaceholder: imageUrl,
            altDescriptionPlaceholder: altDescription,
            userNamePlaceholder: userName,
            comments: ''
          }
        }} variant="contained" color="primary">
      Create New Image Entry
        </Button>
      </CardActions>
    </Card>
  </div>
)

export default ImagesResults
