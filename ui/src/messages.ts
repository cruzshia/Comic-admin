import { defineMessages } from 'react-intl'

const PREFIX = 'common.'

export default defineMessages({
  id: {
    id: PREFIX + 'id',
    defaultMessage: 'ID'
  },
  author: {
    id: PREFIX + 'author',
    defaultMessage: 'Author'
  },
  create: {
    id: PREFIX + 'create',
    defaultMessage: 'Create'
  },
  csvImport: {
    id: PREFIX + 'csv_import',
    defaultMessage: 'CSV import'
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
  }
})
