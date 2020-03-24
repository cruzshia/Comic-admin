import { defineMessages } from 'react-intl'

const PREFIX = 'user.comment'

export default defineMessages({
  commentList: {
    id: PREFIX,
    defaultMessage: 'Comment List'
  },
  contentId: {
    id: PREFIX + '.content_id',
    defaultMessage: 'Content ID'
  },
  content: {
    id: PREFIX + '.content',
    defaultMessage: 'Content'
  },
  message: {
    id: PREFIX + '.message',
    defaultMessage: 'Message'
  },
  status: {
    id: PREFIX + '.status',
    defaultMessage: 'Status'
  },
  likes: {
    id: PREFIX + '.likes',
    defaultMessage: 'Likes'
  },
  reportCount: {
    id: PREFIX + '.report_count',
    defaultMessage: 'Report Count'
  },
  detail: {
    id: PREFIX + '.detail',
    defaultMessage: 'Comment Detail'
  },
  edit: {
    id: PREFIX + '.edit',
    defaultMessage: 'Comment Edit'
  }
})
