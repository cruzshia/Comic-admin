import React from 'react'
import { useIntl } from 'react-intl'
import ContentHeader, { Breadcrumb } from '@src/components/ContentHeader/ContentHeader'
import { COMMENT_BREADCRUMBS } from '../constants'
import messages from '../messages'

export default function CommentList() {
  const { formatMessage } = useIntl()
  const breadcrumbList: Breadcrumb[] = COMMENT_BREADCRUMBS.map(({ title }) => ({ title: formatMessage(title) }))

  return <ContentHeader breadcrumbList={breadcrumbList} titleText={formatMessage(messages.commentList)} />
}
