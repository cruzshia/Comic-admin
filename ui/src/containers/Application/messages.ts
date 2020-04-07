import { defineMessages } from 'react-intl'

const PREFIX = 'application.'

export default defineMessages({
  opened: {
    id: PREFIX + 'opened',
    defaultMessage: 'Opened'
  },
  closed: {
    id: PREFIX + 'closed',
    defaultMessage: 'Closed'
  },
  reserved: {
    id: PREFIX + 'reserved',
    defaultMessage: 'Reserved'
  }
})
