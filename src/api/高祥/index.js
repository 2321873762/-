import axios from '../../utils/http'

export function gxget () {
  return axios.get('/box')
}