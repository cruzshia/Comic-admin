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
  creation: {
    id: PREFIX + 'creation',
    defaultMessage: 'Push Notification Creation'
  },
  pushedTimes: {
    id: PREFIX + 'pushed_times',
    defaultMessage: 'Pushed Times'
  },
  deepLinkUrl: {
    id: PREFIX + 'deep_link_url',
    defaultMessage: 'Deep Link URL'
  },
  inputUrl: {
    id: PREFIX + 'input_url',
    defaultMessage: 'Input URL'
  },
  bigIconUrl: {
    id: PREFIX + 'big_icon_url',
    defaultMessage: 'Big Icon Url'
  },
  scheduledStartTime: {
    id: PREFIX + 'scheduled_start_time',
    defaultMessage: 'Scheduled Start Time'
  },
  pushNotificationEdit: {
    id: PREFIX + 'push_notification_edit',
    defaultMessage: 'Push Notification Edit'
  }
})
