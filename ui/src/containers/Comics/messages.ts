import { defineMessages } from 'react-intl'

const PREFIX = 'comics.'

export default defineMessages({
  adCategory: {
    id: PREFIX + 'ad_category',
    defaultMessage: 'Advertisement Category'
  },
  imageUrl: {
    id: PREFIX + 'image_url',
    defaultMessage: 'Image URL'
  },
  link: {
    id: PREFIX + 'link_url',
    defaultMessage: 'Link URL'
  },
  buttonName: {
    id: PREFIX + 'button_name',
    defaultMessage: 'Button Name'
  },
  adOriginal: {
    id: PREFIX + 'ad.original',
    defaultMessage: 'Original'
  },
  adAdmob: {
    id: PREFIX + 'ad.admob',
    defaultMessage: 'Admob (FAN)'
  },
  adMap: {
    id: PREFIX + 'ad.map',
    defaultMessage: 'Map'
  }
})