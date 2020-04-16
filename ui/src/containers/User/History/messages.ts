import { defineMessages } from 'react-intl'

const PREFIX = 'user.history.'

export default defineMessages({
  episodePurchaseList: {
    id: PREFIX + 'episode_purchase_list',
    defaultMessage: 'Episode Purchase History List'
  },
  episodePurchase: {
    id: PREFIX + 'episode_purchase',
    defaultMessage: 'Episode Purchase History'
  },
  episodePurchaseDetail: {
    id: PREFIX + 'episode_purchase_detail',
    defaultMessage: 'Episode Purchase History Detail'
  },
  coinChangeTotal: {
    id: PREFIX + 'coin_change_total',
    defaultMessage: 'Coin Change Total'
  },
  coinChangeDetail: {
    id: PREFIX + 'coin_change_detail',
    defaultMessage: 'Coin Change Detail'
  }
})
