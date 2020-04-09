import React, { useMemo, useContext } from 'react'
import { useIntl } from 'react-intl'
import ContentHeader, { Breadcrumb } from '@src/components/ContentHeader/ContentHeader'
import DataTable, { toDataSet } from '@src/components/table/DataTable'
import commonMessages from '@src/messages'
import { BREADCRUMBS } from '../utils'
import messages from '../messages'
import AuthorContext from '../context/AuthorContext'

export default function AuthorDetail() {
  const { currentAuthor = {} } = useContext(AuthorContext)
  const { formatMessage } = useIntl()
  const breadcrumbList: Breadcrumb[] = useMemo(
    () =>
      BREADCRUMBS.map(({ title, route }) => ({ title: formatMessage(title), route })).concat([
        { title: formatMessage(messages.detail), route: undefined }
      ]),
    [formatMessage]
  )
  return (
    <>
      <ContentHeader breadcrumbList={breadcrumbList} titleText={formatMessage(messages.list)} buttonList={[]} />
      <DataTable
        title={formatMessage(commonMessages.basicInfo)}
        dataSet={[
          toDataSet(formatMessage(commonMessages.id), currentAuthor.id),
          toDataSet(formatMessage(commonMessages.authorName), currentAuthor.name),
          toDataSet(formatMessage(commonMessages.authorNameKana), currentAuthor.nameKana),
          toDataSet(formatMessage(commonMessages.createDateTime), currentAuthor.createAt),
          toDataSet(formatMessage(commonMessages.updateDateTime), currentAuthor.updateAt)
        ]}
      />
    </>
  )
}
