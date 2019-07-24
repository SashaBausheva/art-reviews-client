import apiUrl from '../apiConfig'
import axios from 'axios'

export const indexImageEntries = user => {
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
    url: `https://api.unsplash.com/search/photos?page=1&query=${query}&client_id=27e3739785506041845aa8e7be75f77231b1baaeb1ddadc128233d959a39e201&`,
    method: 'GET',
    headers: {
      'Authorization': `Token token=${user.token}`
    }
  })
}
