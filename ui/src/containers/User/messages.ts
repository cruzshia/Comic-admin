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
  },
  validityPeriod: {
    id: PREFIX + 'validity_period',
    defaultMessage: 'Validity Period'
  },
  amountOfCoins: {
    id: PREFIX + 'amount_of_coins',
    defaultMessage: '{num} coins'
  },
  templateJIS: {
    id: PREFIX + 'template_JIS',
    defaultMessage: 'Template (Shift_JIS)'
  },
  templateUTF8: {
    id: PREFIX + 'template_UTF8',
    defaultMessage: 'Template (UTF-8)'
  },
  csvFile: {
    id: PREFIX + 'csv_file',
    defaultMessage: 'Csv File'
  }
})
