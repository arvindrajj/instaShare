/* eslint-disable no-async-promise-executor */
import Cookies from 'js-cookie'

const jwtToken = Cookies.get('jwt_token')

const apiRequestPromise = ({method, apiUrl, body = ''}) => {
  const isBody = body === '' ? null : {body}
  const options = {
    method,
    headers: {Authorization: `Bearer ${jwtToken}`},
    isBody,
  }
  return new Promise(async (resolve, reject) => {
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok) {
      resolve(data)
    } else {
      reject(response.status)
    }
  })
}

export default apiRequestPromise
