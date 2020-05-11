import { defineMessages } from 'react-intl'

const PREFIX = 'user.gift_comics'

export default defineMessages({
  giftComics: {
    id: PREFIX,
    defaultMessage: 'Gift (Comics)'
  },
  csvBatchGift: {
    id: PREFIX + '.csv_batch_gift',
    defaultMessage: 'Csv Batch Gift (Comics)'
  },
  csvBatchGiftLogs: {
    id: PREFIX + '.csv_batch_gift_logs',
    defaultMessage: 'Csv Batch Gift (Comics) Logs'
  }
})
