import apiUrl from '../apiConfig'
import axios from 'axios'

export const indexImageEntries = user => {
  console.log(require('dotenv').config())
  return axios({
    url: apiUrl + '/images',
    method: 'GET',
    headers: {
      'Authorization': `Token token=${user.token}`
    }
  })
}

export const showImageEntry = (user, id) => {
  return axios({
    url: `${apiUrl}/images/${id}`,
    method: 'GET',
    headers: {
      'Authorization': `Token token=${user.token}`
    }
  })
}

export const deleteImageEntry = (user, id) => {
  return axios({
    url: `${apiUrl}/images/${id}`,
    method: 'DELETE',
    headers: {
      'Authorization': `Token token=${user.token}`
    }
  })
}

export const createImageEntry = (user, image) => {
  return axios({
    url: `${apiUrl}/images`,
    method: 'POST',
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    data: { image: image }
  })
}

export const editImageEntry = (user, id, image) => {
  return axios({
    url: `${apiUrl}/images/${id}`,
    method: 'PATCH',
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    data: { image: image }
  })
}

export const findImages = (query, user) => {
  return axios({
    params: { query: query },
    url: `${apiUrl}/find-images`,
    // url: `https://api.unsplash.com/search/photos?page=1&query=${query}&client_id=${process.env.CLIENT_ID}`,
    method: 'GET',
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    data: { query: query }
  })
}

export const findRandomImage = (user) => {
  return axios({
    url: `${apiUrl}/random-image`,
    // url: `https://api.unsplash.com/photos/random?client_id=${process.env.CLIENT_ID}`,
    method: 'GET',
    headers: {
      'Authorization': `Token token=${user.token}`
    }
  })
}

export const findRandomImages = () => {
  return axios({
    url: `${apiUrl}/random-images`,
    // url: 'https://api.unsplash.com/photos/random?count=5&client_id=27e3739785506041845aa8e7be75f77231b1baaeb1ddadc128233d959a39e201',
    method: 'GET'
  })
}
