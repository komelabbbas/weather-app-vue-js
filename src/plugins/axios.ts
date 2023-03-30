import axios from 'axios'

axios.defaults.headers.common = {
  'X-Requested-With': 'XMLHttpRequest',
}

/*
 * Interceptors
 */

axios.interceptors.request.use((config) => {
  config.baseURL = import.meta.env.VITE_API_BASE_URL
  config.headers.common['Content-Type'] = 'application/json'

  return config
})

axios.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    return Promise.reject(error)
  },
)
