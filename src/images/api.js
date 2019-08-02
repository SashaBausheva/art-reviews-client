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
    params: { query: query },
    url: `${apiUrl}/find-images`,
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
    method: 'GET',
    headers: {
      'Authorization': `Token token=${user.token}`
    }
  })
}

export const findRandomImages = () => {
  return axios({
    url: `${apiUrl}/random-images`,
    method: 'GET'
  })
}
