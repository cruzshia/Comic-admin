import React, { useMemo } from 'react'
import { useIntl } from 'react-intl'
import ContentHeader from '@src/components/ContentHeader/ContentHeader'
import { BREADCRUMBS } from '../utils'
import SearchBlock from './SearchBlock'
import messages from '../messages'

export default function ContactUsList() {
  const { formatMessage } = useIntl()
  const breadcrumbList = useMemo(
    () =>
      BREADCRUMBS.map(({ title }) => ({
        title: formatMessage(title)
      })),
    [formatMessage]
  )

  return (
    <>
      <ContentHeader breadcrumbList={breadcrumbList} titleText={formatMessage(messages.list)} />
      <SearchBlock onSubmit={console.log} />
    </>
  )
}
