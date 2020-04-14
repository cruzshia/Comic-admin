import { defineMessages } from 'react-intl'

const PREFIX = 'user.notification'

export default defineMessages({
  notificationList: {
    id: PREFIX,
    defaultMessage: 'Notification List'
  },
  startCreate: {
    id: PREFIX + '.start_create',
    defaultMessage: 'Create Notification'
  },
  releaseStartDate: {
    id: PREFIX + '.release_start_date',
    defaultMessage: 'Release Start Date'
  },
  releaseEndDate: {
    id: PREFIX + '.release_end_date',
    defaultMessage: 'Release End Date'
  }
})
