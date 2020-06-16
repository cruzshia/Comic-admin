export enum ApplicationInfoKeys {
  Id = 'id',
  AppIdToken = 'app_id_token',
  Name = 'name'
}

export interface ApplicationInfo {
  [ApplicationInfoKeys.Id]: string
  [ApplicationInfoKeys.AppIdToken]: string
  [ApplicationInfoKeys.Name]: string
}

type InfoModel = any

export default InfoModel
