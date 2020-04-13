import { defineMessages } from 'react-intl'

const PREFIX = 'application.application_info.'
export default defineMessages({
  list: {
    id: PREFIX + 'list',
    defaultMessage: ' Application Info List'
  },
  create: {
    id: PREFIX + 'create',
    defaultMessage: 'Create Application Info '
  },
  creation: {
    id: PREFIX + 'creation',
    defaultMessage: 'Application Info Creation'
  },
  edit: {
    id: PREFIX + 'edit',
    defaultMessage: 'Edit Coin Application Info'
  },
  detail: {
    id: PREFIX + 'application_info_detail',
    defaultMessage: 'Application Info Detail'
  },
  applicationName: {
    id: PREFIX + 'application_name',
    defaultMessage: 'Application Name'
  },
  commonKey: {
    id: PREFIX + 'common_key',
    defaultMessage: 'Common Key'
  },
  apnsValidityPeriod: {
    id: PREFIX + 'apns_validity_period',
    defaultMessage: 'APNs Validity Period'
  },
  apnsCertificate: {
    id: PREFIX + 'apns_certificate',
    defaultMessage: ' APNs Certificate'
  },
  fcnmApiKey: {
    id: PREFIX + 'fcm_api_key',
    defaultMessage: 'FCM API Key'
  },
  androidPublicKey: {
    id: PREFIX + 'android_public_key',
    defaultMessage: 'Android Public Key'
  },
  iTunesPublicKey: {
    id: PREFIX + 'itunes_public_key',
    defaultMessage: 'iTunes Public Key'
  },
  supplementSetting: {
    id: PREFIX + 'supplement_setting',
    defaultMessage: 'Supplement Setting'
  }
})
