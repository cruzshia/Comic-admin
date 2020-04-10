import { defineMessages } from 'react-intl'

const PREFIX = 'user.'

export default defineMessages({
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
