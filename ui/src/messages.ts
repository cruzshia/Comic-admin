import { defineMessages } from 'react-intl'
import { SettingType, DeviceType } from '@src/models/comics/advertisement'

const PREFIX = 'common.'

export default defineMessages({
  id: {
    id: PREFIX + 'id',
    defaultMessage: 'ID'
  },
  appId: {
    id: PREFIX + 'app_id',
    defaultMessage: 'App ID'
  },
  author: {
    id: PREFIX + 'author',
    defaultMessage: 'Author'
  },
  authorName: {
    id: PREFIX + 'author_name',
    defaultMessage: 'Author Name'
  },
  authorNameKana: {
    id: PREFIX + 'author_name_kana',
    defaultMessage: 'Author Name(kana)'
  },
  authorCreateStart: {
    id: PREFIX + 'author_create_start',
    defaultMessage: 'Create Author'
  },
  create: {
    id: PREFIX + 'create',
    defaultMessage: 'Create'
  },
  delete: {
    id: PREFIX + 'delete',
    defaultMessage: 'Delete'
  },
  csvImport: {
    id: PREFIX + 'csv_import',
    defaultMessage: 'CSV Import'
  },
  csvImportLogs: {
    id: PREFIX + 'csv_import_logs',
    defaultMessage: 'CSV Import Logs'
  },
  csvExport: {
    id: PREFIX + 'csv_export',
    defaultMessage: 'CSV Export'
  },
  csvExportLogs: {
    id: PREFIX + 'csv_export_logs',
    defaultMessage: 'CSV Export Logs'
  },
  photo: {
    id: PREFIX + 'photo',
    defaultMessage: 'Photo'
  },
  preview: {
    id: PREFIX + 'preview',
    defaultMessage: 'Preview'
  },
  createDateTime: {
    id: PREFIX + 'create_date_time',
    defaultMessage: 'Create date time'
  },
  updateDateTime: {
    id: PREFIX + 'update_date_time',
    defaultMessage: 'Update date time'
  },
  publicStartTime: {
    id: PREFIX + 'public_start_time',
    defaultMessage: 'Public Start Time'
  },
  publicEndTime: {
    id: PREFIX + 'public_end_time',
    defaultMessage: 'Public End Time'
  },
  startTime: {
    id: PREFIX + 'start_time',
    defaultMessage: 'Start Time'
  },
  endTime: {
    id: PREFIX + 'end_time',
    defaultMessage: 'End Time'
  },
  startDateTime: {
    id: PREFIX + 'start_date_time',
    defaultMessage: 'Start Date Time'
  },
  endDateTime: {
    id: PREFIX + 'end_date_time',
    defaultMessage: 'End Date Time'
  },
  deliveryDuration: {
    id: PREFIX + 'delivery_duration',
    defaultMessage: 'Delivery Duration'
  },
  comicsManagement: {
    id: PREFIX + 'header.comics_management',
    defaultMessage: 'Comics management'
  },
  applicationManagement: {
    id: PREFIX + 'header.application_management',
    defaultMessage: 'Application management'
  },
  userManagement: {
    id: PREFIX + 'header.user_management',
    defaultMessage: 'User management'
  },
  dragDropUpload: {
    id: PREFIX + 'drag.upload.photo',
    defaultMessage: 'DragDrop to upload image'
  },
  selectFile: {
    id: PREFIX + 'select_file',
    defaultMessage: 'Select files'
  },
  enterUrl: {
    id: PREFIX + 'enter_url',
    defaultMessage: 'Enter URL'
  },
  enterButtonName: {
    id: PREFIX + 'enter_button_name',
    defaultMessage: 'Enter Button Name'
  },
  approved: {
    id: PREFIX + 'approved',
    defaultMessage: 'Approved'
  },
  not_approved: {
    id: PREFIX + 'not_approved',
    defaultMessage: 'Not Approved'
  },
  [SettingType.Common]: {
    id: PREFIX + 'common',
    defaultMessage: 'Common'
  },
  [SettingType.DeviceType]: {
    id: PREFIX + 'device_type',
    defaultMessage: 'Device Type'
  },
  advertisementSetting: {
    id: PREFIX + 'advertisement_setting',
    defaultMessage: 'Advertisement_Setting'
  },
  link: {
    id: PREFIX + 'link_url',
    defaultMessage: 'Image URL'
  },
  buttonName: {
    id: PREFIX + 'button_name',
    defaultMessage: 'Button Name'
  },
  original: {
    id: PREFIX + 'original',
    defaultMessage: 'Original'
  },
  contents: {
    id: PREFIX + 'contents',
    defaultMessage: 'Contents'
  },
  filename: {
    id: PREFIX + 'filename',
    defaultMessage: 'Filename'
  },
  status: {
    id: PREFIX + 'status',
    defaultMessage: 'Status'
  },
  detail: {
    id: PREFIX + 'detail',
    defaultMessage: 'Detail'
  },
  errorAsyncFailed: {
    id: PREFIX + 'error.async_failed',
    defaultMessage: "Can't get async process information"
  },
  errorFilenameDifferent: {
    id: PREFIX + 'error.filename_different',
    defaultMessage: 'Filename isn different'
  },
  errorEmptyInput: {
    id: PREFIX + 'error.empty_input',
    defaultMessage: 'Empty input'
  },
  copy: {
    id: PREFIX + 'copy',
    defaultMessage: 'Copy'
  },
  episodeInfo: {
    id: PREFIX + 'episode_info',
    defaultMessage: 'Episode Information'
  },
  basicInfo: {
    id: PREFIX + 'basic_info',
    defaultMessage: 'Basic Information'
  },
  introduction: {
    id: PREFIX + 'introduction',
    defaultMessage: 'Introduction'
  },
  deliveryStartDateTime: {
    id: PREFIX + 'delivery_start_date_time',
    defaultMessage: 'Delivery start date time'
  },
  deliveryEndDateTime: {
    id: PREFIX + 'delivery_end_date_time',
    defaultMessage: 'Delivery end date time'
  },
  deliveryEndStartTime: {
    id: PREFIX + 'delivery_end_start_time',
    defaultMessage: 'Delivery end start time'
  },
  contentId: {
    id: PREFIX + 'content_id',
    defaultMessage: 'Content ID'
  },
  setting: {
    id: PREFIX + 'setting',
    defaultMessage: 'Setting'
  },
  title: {
    id: PREFIX + 'title',
    defaultMessage: 'Title'
  },
  message: {
    id: PREFIX + 'message',
    defaultMessage: 'Message'
  },
  application: {
    id: PREFIX + 'application',
    defaultMessage: 'Application'
  },
  deliveryDateTime: {
    id: PREFIX + 'delivery_date_time',
    defaultMessage: 'Delivery date time'
  },
  createNew: {
    id: PREFIX + 'create_new',
    defaultMessage: 'Create New'
  },
  releaseDuration: {
    id: PREFIX + 'release_duration',
    defaultMessage: 'Release Duration'
  },
  schedule: {
    id: PREFIX + 'schedule',
    defaultMessage: 'Schedule'
  },
  changeImage: {
    id: PREFIX + 'change_image',
    defaultMessage: 'Change Image'
  },
  releaseStartTime: {
    id: PREFIX + 'release_start_time',
    defaultMessage: 'Release Start Time'
  },
  releaseEndTime: {
    id: PREFIX + 'release_end_time',
    defaultMessage: 'Release End Time'
  },
  csvFile: {
    id: PREFIX + 'csv_file',
    defaultMessage: 'Csv File'
  },
  contentName: {
    id: PREFIX + 'content_name',
    defaultMessage: 'Content Name'
  },
  subscriptionId: {
    id: PREFIX + 'subscription_id',
    defaultMessage: 'Subscription ID'
  },
  workId: {
    id: PREFIX + 'work_id',
    defaultMessage: 'Work ID'
  },
  workName: {
    id: PREFIX + 'work_name',
    defaultMessage: 'Work Name (ID)'
  },
  email: {
    id: PREFIX + 'email_address',
    defaultMessage: 'Email Address'
  },
  searchById: {
    id: PREFIX + 'search_by_id',
    defaultMessage: 'Search By ID'
  },
  searchByEmail: {
    id: PREFIX + 'search_by_email',
    defaultMessage: 'Search By Email'
  },
  authorId: {
    id: PREFIX + 'author_id',
    defaultMessage: 'Author (ID)'
  },
  scheduledDateTime: {
    id: PREFIX + 'scheduled_date_time',
    defaultMessage: 'Scheduled Date Time'
  },
  templateJIS: {
    id: PREFIX + 'template_JIS',
    defaultMessage: 'Template(Shift_JIS)'
  },
  templateUTF8: {
    id: PREFIX + 'template_UTF8',
    defaultMessage: 'Template(UTF-8)'
  },
  have: {
    id: PREFIX + 'have',
    defaultMessage: 'Have'
  },
  no: {
    id: PREFIX + 'no',
    defaultMessage: 'No'
  },
  subscriptionName: {
    id: PREFIX + 'subscription_name',
    defaultMessage: 'Subscription Name'
  },
  enterFee: {
    id: PREFIX + 'enter_fee',
    defaultMessage: 'Enter Fee'
  },
  enterId: {
    id: PREFIX + 'enter_id',
    defaultMessage: 'Enter Id'
  },
  selectStatus: {
    id: PREFIX + 'select_status',
    defaultMessage: 'Select Status'
  },
  authorNameId: {
    id: PREFIX + 'author_name_id',
    defaultMessage: 'Author Name Id'
  },
  [DeviceType.Android]: {
    id: PREFIX + 'android',
    defaultMessage: 'Android'
  },
  [DeviceType.IOS]: {
    id: PREFIX + 'ios',
    defaultMessage: 'iOS'
  }
})
