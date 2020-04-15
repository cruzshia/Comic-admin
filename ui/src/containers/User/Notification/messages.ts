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
  },
  detail: {
    id: PREFIX + '.detail',
    defaultMessage: 'Detail'
  },
  startEdit: {
    id: PREFIX + '.start_edit',
    defaultMessage: 'Start Edit'
  },
  notificationType: {
    id: PREFIX + '.notification_type',
    defaultMessage: 'Notification Type'
  },
  majorFlag: {
    id: PREFIX + '.major_flag',
    defaultMessage: 'Major Flag'
  },
  text: {
    id: PREFIX + '.text',
    defaultMessage: 'Text'
  },
  content: {
    id: PREFIX + '.content',
    defaultMessage: 'Content'
  }
})
