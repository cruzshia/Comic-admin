import { defineMessages } from 'react-intl'

const PREFIX = 'user.comment'

export default defineMessages({
  commentList: {
    id: PREFIX,
    defaultMessage: 'Comment List'
  },
  content: {
    id: PREFIX + '.content',
    defaultMessage: 'Content'
  },
  message: {
    id: PREFIX + '.message',
    defaultMessage: 'Message'
  },
  likes: {
    id: PREFIX + '.likes',
    defaultMessage: 'Likes'
  },
  report: {
    id: PREFIX + '.report',
    defaultMessage: 'Report Count'
  },
  detail: {
    id: PREFIX + '.detail',
    defaultMessage: 'Comment Detail'
  },
  edit: {
    id: PREFIX + '.edit',
    defaultMessage: 'Comment Edit'
  },
  selfVisibleOnly: {
    id: PREFIX + '.self_visible_only',
    defaultMessage: 'Self Visible Only'
  },
  isReported: {
    id: PREFIX + '.is_reported',
    defaultMessage: 'Reported Or Not'
  },
  period: {
    id: PREFIX + '.period',
    defaultMessage: 'Period'
  }
})
