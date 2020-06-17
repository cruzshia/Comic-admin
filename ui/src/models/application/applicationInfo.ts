export enum ApplicationInfoKeys {
  Id = 'id',
  CreateAt = 'inserted_at',
  UpdatedAt = 'updated_at',
  AppIdToken = 'app_id_token',
  Name = 'name',
  CommonKey = 'common_key',
  ApnsTeamIdToken = 'apns_team_id_token',
  ApnsKeyIdToken = 'apns_key_id_token',
  ApnsAuthKey = 'apns_auth_key',
  FcmApiKey = 'fcm_api_key',
  AndroidPublicKey = 'android_public_key',
  ItunesSharedSecret = 'itunes_shared_secret',
  AdditionalSetting = 'additional_setting'
}

export type AppInfoList = { [ApplicationInfoKeys.AppIdToken]: string; [ApplicationInfoKeys.Name]: string }[]

interface ApplicationInfo {
  [ApplicationInfoKeys.Id]: string | number
  [ApplicationInfoKeys.CreateAt]: string
  [ApplicationInfoKeys.UpdatedAt]: string
  [ApplicationInfoKeys.AppIdToken]: string
  [ApplicationInfoKeys.Name]: string
  [ApplicationInfoKeys.CommonKey]: string
  [ApplicationInfoKeys.ApnsTeamIdToken]: string
  [ApplicationInfoKeys.ApnsKeyIdToken]: string
  [ApplicationInfoKeys.ApnsAuthKey]: string
  [ApplicationInfoKeys.FcmApiKey]: string
  [ApplicationInfoKeys.AndroidPublicKey]: string
  [ApplicationInfoKeys.ItunesSharedSecret]: string
  [ApplicationInfoKeys.AdditionalSetting]: string
}

export default ApplicationInfo
