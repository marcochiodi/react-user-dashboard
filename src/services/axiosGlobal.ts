import axios from 'axios'
import { useUsers } from '../store/users.store'

let active = 0
const show = () => useUsers.setState({ isLoading: true })
const hide = () => useUsers.setState({ isLoading: false })

axios.interceptors.request.use(cfg => {
  if (active === 0) show()
  active++
  return cfg
})

axios.interceptors.response.use(
  res => {
    active--
    if (active === 0) hide()
    return res
  },
  err => {
    active--
    if (active === 0) hide()
    return Promise.reject(err)
  }
)
