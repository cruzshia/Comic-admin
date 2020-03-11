import { defineMessages } from 'react-intl'

const PREFIX = 'common.'

export default defineMessages({
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
  comicManagement: {
    id: 'header.menu.comics_management',
    defaultMessage: 'Comic management'
  }
})
