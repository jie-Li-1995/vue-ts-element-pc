import axios from 'axios'
import qs from 'qs'

axios.defaults.baseURL = 'API'
axios.defaults.withCredentials = true

function get (api: string) {
  return (body: object) => axios.get(api, {
    params: body
  })
}

function post (api: string) {
  return (body: object) => axios.post(api, qs.stringify(body))
}

function post2 (api: string) {
  const headers: object = { headers: { 'Content-Type': 'multipart/form-data' } }
  return (body: object) => axios.post(api, body, headers)
}

// Login
export const LoginApi = {
  SFLLLogin: post('/Account/SFLLLogin'),
  SFLLADLogin2: post2('/Account/SFLLLogin'),
  SFLLADLogin: get('/Account/SFLLLogin')
}

export const ColumnApi = {
  GetAllColumns: get('/Column/GetAllColumns'),
  GetColumns: get('/Column/GetColumns'),
  GetColumn: get('/Column/GetColumn'),
  AddColumn: post('/Column/AddColumn'),
  EditColumn: post('/Column/EditColumn'),
  EditColumnStatusId: post('/Column/EditColumnStatusId')
}
