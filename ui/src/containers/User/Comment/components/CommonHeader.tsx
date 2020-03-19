import React, { useMemo } from 'react'
import { useIntl } from 'react-intl'
import ContentHeader, { Breadcrumb } from '@src/components/ContentHeader/ContentHeader'
import { COMMENT_BREADCRUMBS } from '../constants'
import messages from '../messages'

export default function CommonHeader({ buttonList }: { buttonList: JSX.Element[] }) {
  const { formatMessage } = useIntl()

  const breadcrumbList: Breadcrumb[] = useMemo(
    () =>
      COMMENT_BREADCRUMBS.map(({ title, route }) => ({
        title: formatMessage(title),
        route
      })).concat([{ title: formatMessage(messages.detail), route: undefined }]),
    [formatMessage]
  )

  return (
    <ContentHeader breadcrumbList={breadcrumbList} titleText={formatMessage(messages.detail)} buttonList={buttonList} />
  )
}
