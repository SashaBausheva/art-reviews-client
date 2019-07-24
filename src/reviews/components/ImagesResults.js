import React from 'react'

import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'

const ImagesResults = ({ id, imageUrl, altDescription }) => (
  <div className='image-card'>
    <Card>
      <CardActionArea>
        <img className='img' src={imageUrl} alt={`${altDescription} unsplash image`}/>
        <h4>img id: {id}</h4>h4
      </CardActionArea>
    </Card>
  </div>
)

export default ImagesResults
