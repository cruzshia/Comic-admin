import { routePath } from '@src/common/appConfig'
import ApplicationInfo, { ApplicationInfoKeys } from '@src/models/application/applicationInfo'
import { required, composeValidators, isValidLength, isRequiredValidLength, isValidJSON } from '@src/utils/validation'
import commonMessages from '@src/messages'
import messages from './messages'

export const BREADCRUMBS = [
  { title: commonMessages.applicationManagement },
  { title: messages.list, route: routePath.application.applicationInfo }
]

export const validateAppInfo = (values: Partial<ApplicationInfo>) => ({
  [ApplicationInfoKeys.Name]: isRequiredValidLength(values[ApplicationInfoKeys.Name]),
  [ApplicationInfoKeys.ApnsTeamIdToken]: isRequiredValidLength(values[ApplicationInfoKeys.ApnsTeamIdToken]),
  [ApplicationInfoKeys.ApnsKeyIdToken]: isRequiredValidLength(values[ApplicationInfoKeys.ApnsKeyIdToken]),
  [ApplicationInfoKeys.FcmApiKey]: isRequiredValidLength(values[ApplicationInfoKeys.FcmApiKey]),
  [ApplicationInfoKeys.AndroidPublicKey]: composeValidators(
    required,
    isValidLength(1000)
  )(values[ApplicationInfoKeys.AndroidPublicKey]),
  [ApplicationInfoKeys.ItunesSharedSecret]: isRequiredValidLength(values[ApplicationInfoKeys.ItunesSharedSecret]),
  [ApplicationInfoKeys.AdditionalSetting]:
    values[ApplicationInfoKeys.AdditionalSetting] && isValidJSON(values[ApplicationInfoKeys.AdditionalSetting]!)
})
