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

const ImagesResults = ({ id, imageUrl, fullUrl, userUrl, altDescription, userName, comments }) => (
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
           By <a href="LINK HERE">{userName}</a> on Unsplash
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <a href={fullUrl} target="_blank" rel="noopener noreferrer">
          <Button size="small" color="primary">
            Full Size
          </Button>
        </a>
        <Button size="small" color="primary" component={Link} to={{
          pathname: '/create-image-entry-from-search',
          searchResults: {
            imageUrlPlaceholder: imageUrl,
            fullUrl: fullUrl,
            userUrl: userUrl,
            altDescriptionPlaceholder: altDescription,
            userNamePlaceholder: userName,
            comments: '',
            id: id
          }
        }}>
      Add to Collection
        </Button>
      </CardActions>
    </Card>
  </div>
)

export default ImagesResults
