import axios from 'axios'

/**
 * Creates an instance of the Axios client with interceptors for error handling.
 */
const axiosInstance = axios.create({
  baseURL: '',
  timeout: 10000,
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error('API Error Response:', error.response)
    } else if (error.request) {
      console.error('API Error Request:', error.request)
    } else {
      console.error('API Error:', error.message)
    }

    return Promise.reject(error)
  },
)

export default axiosInstance
