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
  },
  applicationId: {
    id: PREFIX + 'application_id',
    defaultMessage: 'Application ID'
  },
  status: {
    id: PREFIX + 'status',
    defaultMessage: 'Status'
  },
  inputCoinNum: {
    id: PREFIX + 'input_coin_num',
    defaultMessage: 'Input Coin Number'
  },
  inputCode: {
    id: PREFIX + 'input_code',
    defaultMessage: 'Input Code'
  }
})
