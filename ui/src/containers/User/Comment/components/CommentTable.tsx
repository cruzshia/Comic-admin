import React from 'react'
import { useIntl } from 'react-intl'
import { makeStyles } from '@material-ui/core'
import DataTable from '@src/components/table/DataTable'
import Select from '@src/components/form/Select'
import commonMessages from '@src/messages'
import userMessages from '../../messages'
import messages from '../messages'

const useStyle = makeStyles({
  hide: {
    display: 'none'
  }
})

export default function CommentTable({ comment, isEdit }: { comment: any; isEdit?: boolean }) {
  const classes = useStyle()
  const { formatMessage } = useIntl()
  const editClass = isEdit ? classes.hide : ''

  return (
    <DataTable
      title={formatMessage(messages.basicInfo)}
      dataSet={[
        {
          label: formatMessage(commonMessages.id),
          content: comment.id
        },
        {
          label: formatMessage(userMessages.userId),
          content: comment.userId
        },
        {
          label: formatMessage(messages.contentId),
          content: comment.contentId
        },
        {
          label: formatMessage(commonMessages.appId),
          content: comment.appId,
          classes: isEdit ? '' : classes.hide
        },
        {
          label: formatMessage(messages.message),
          content: comment.content
        },
        {
          label: formatMessage(messages.status),
          content: isEdit ? (
            <Select
              options={[
                { label: formatMessage(commonMessages.approved), value: 'approved' },
                { label: formatMessage(commonMessages.not_approved), value: 'not_approved' }
              ]}
              value={comment.status}
            />
          ) : (
            formatMessage(commonMessages[comment.status as keyof typeof commonMessages])
          )
        },
        {
          label: formatMessage(messages.likes),
          content: comment.likes
        },
        {
          label: formatMessage(messages.report),
          content: comment.report
        },
        {
          label: formatMessage(commonMessages.createDateTime),
          content: comment.createDateTime,
          classes: editClass
        },
        {
          label: formatMessage(commonMessages.updateDateTime),
          content: comment.updateDateTime,
          classes: editClass
        }
      ]}
    />
  )
}