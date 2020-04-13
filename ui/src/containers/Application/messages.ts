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
  releaseStartTime: {
    id: PREFIX + 'release_start_time',
    defaultMessage: 'Release Start Time'
  },
  releaseEndTime: {
    id: PREFIX + 'release_end_time',
    defaultMessage: 'Release End Time'
  },
  releaseDuration: {
    id: PREFIX + 'release_duration',
    defaultMessage: 'Release Duration'
  },
  inputCoinNum: {
    id: PREFIX + 'input_coin_num',
    defaultMessage: 'Input coin number'
  }
})
