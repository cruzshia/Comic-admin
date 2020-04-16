import { defineMessages } from 'react-intl'

const PREFIX = 'user.'

export default defineMessages({
  list: {
    id: PREFIX + 'list',
    defaultMessage: 'User List'
  },
  detail: {
    id: PREFIX + 'detail',
    defaultMessage: 'User Detail'
  },
  userId: {
    id: PREFIX + 'id',
    defaultMessage: 'User ID'
  },
  status: {
    id: PREFIX + 'status',
    defaultMessage: 'Status'
  },
  change: {
    id: PREFIX + 'change',
    defaultMessage: 'Change'
  }
})
