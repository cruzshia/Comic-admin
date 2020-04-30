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
  contentId: {
    id: PREFIX + '.content_id',
    defaultMessage: 'Content(ID)'
  },
  likes: {
    id: PREFIX + '.likes',
    defaultMessage: 'Likes'
  },
  reportCount: {
    id: PREFIX + '.report_count',
    defaultMessage: 'Report Count'
  },
  report: {
    id: PREFIX + '.report',
    defaultMessage: 'Report'
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
  },
  commentEdit: {
    id: PREFIX + '.comment_edit',
    defaultMessage: 'Comment Edit'
  }
})
