import { defineMessages } from 'react-intl'

const PREFIX = 'application.push_notification.'
export default defineMessages({
  list: {
    id: PREFIX + 'list',
    defaultMessage: 'Push Notification List'
  },
  create: {
    id: PREFIX + 'create',
    defaultMessage: 'Create Push Notification '
  },
  message: {
    id: PREFIX + 'message',
    defaultMessage: 'Message'
  },
  pushedTimes: {
    id: PREFIX + 'pushed_times',
    defaultMessage: 'Pushed Times'
  }
})
