import React, { useMemo, useContext, useCallback } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useIntl } from 'react-intl'
import Button, { Theme } from '@src/components/Button/Button'
import ContentHeader, { Breadcrumb } from '@src/components/ContentHeader/ContentHeader'
import DataTable, { toDataSet } from '@src/components/table/DataTable'
import { ReactComponent as penIcon } from '@src/assets/common/pen.svg'
import commonMessages from '@src/messages'
import { routePath } from '@src/common/appConfig'
import { BREADCRUMBS } from '../utils'
import messages from '../messages'
import AuthorContext from '../context/AuthorContext'

export default function AuthorDetail() {
  const { currentAuthor = {} } = useContext(AuthorContext)
  const { formatMessage } = useIntl()
  const history = useHistory()
  const { id } = useParams()
  const breadcrumbList: Breadcrumb[] = useMemo(
    () =>
      BREADCRUMBS.map(({ title, route }) => ({ title: formatMessage(title), route })).concat([
        { title: formatMessage(messages.detail), route: undefined }
      ]),
    [formatMessage]
  )

  const handleEdit = useCallback(() => history.push(routePath.comics.authorEdit.replace(':id', id!)), [history, id])
  const buttonList = useMemo(
    () => [
      <Button icon={penIcon} buttonText={formatMessage(messages.edit)} theme={Theme.DARK_BORDER} onClick={handleEdit} />
    ],
    [formatMessage, handleEdit]
  )

  return (
    <>
      <ContentHeader
        breadcrumbList={breadcrumbList}
        titleText={formatMessage(messages.detail)}
        buttonList={buttonList}
      />
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
