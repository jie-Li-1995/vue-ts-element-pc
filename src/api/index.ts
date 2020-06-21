import axios from 'axios'
import qs from 'qs'

axios.defaults.baseURL = 'API'
axios.defaults.withCredentials = true

function get (api: string) {
  return (body?: object) => axios.get(api, {
    params: body
  })
}

function post (api: string) {
  return (body?: object) => axios.post(api, qs.stringify(body))
}

function post2 (api: string) {
  const headers: object = { headers: { 'Content-Type': 'multipart/form-data' } }
  return (body: object) => axios.post(api, body, headers)
}

// Login
export const LoginApi = {
  GetVCode: get('Account/GetVCode'),
  login: post('account/login'),
  GetSystemName: get('SystemConfig/GetSystemName'),
  GetNoticeCount: get('Message/GetNoticeCount'),
  GetH6HelpDocument: get('H6HelpDocument/GetH6HelpDocument')
}

export const SystemSettingApi = {
  AddVehiclePartsVersion: post('VehiclePartsVersion/AddVehiclePartsVersion'),
  Unlock: get('H6/Unlock'),
  GetSystemViewTemplates: get('ViewTemplate/GetSystemViewTemplates'),
  GetAllRoles: get('Role/GetAllRoles'),
  GetSystemConfig: get('SystemConfig/GetSystemConfig'),
  SaveSystemConfig: post('SystemConfig/SaveSystemConfig')
}

export const EmailSettingApi = {
  GetMailboxConfiguration: get('Role/GetMailboxConfiguration'),
  DeleteMc: post('Role/DeleteMc'),
  AddMailboxConfiguration: post('Role/AddMailboxConfiguration'),
  GetMailboxConfigurationList: get('Role/GetMailboxConfigurationList')
}

export const DictionaryManagementApi = {
  GetDicOfColumn: get('DICColumn/GetDicOfColumn'),
  EditDic: post('DICColumn/EditDic'),
  InsertDic: post('DICColumn/InsertDic'),
  GetDic: get('DICColumn/GetDic')
}

export const LoginLogApi = {
  GetLogs: get('Log/GetLogs')
}

export const VersionManagementApi = {
  VersionEdit: post('Version/Edit'),
  VersionData: get('Version/Data')
}

export const ViewTemplateApi = {
  GetSystemViewTemplates: get('ViewTemplate/GetSystemViewTemplates'),
  GetDataEntityProperty: post('DataEntityProperty/GetDataEntityProperty'),
  SaveView: post('ViewTemplate/SaveView')
}

export const ColumnManagementApi = {
  GetAllDataEntityProperty: get('DataEntityProperty/GetAllDataEntityProperty'),
  EditDataEntityProperty: post('DataEntityProperty/EditDataEntityProperty')
}

export const AnnouncementApi = {
  AddAnnouncement: post('Notification/Add'),
  EditAnnouncement: post('Notification/Edit'),
  GetStatus: get('Notification/GetStatus'),
  GetNotificationById: post('Notification/GetNotificationById'),
  PublishAnnouncement: post('Notification/SaveAndPublish'),
  GetNotificationByPage: post('Notification/GetNotificationByPage')
}
