import React, { useMemo, useContext, useCallback, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useIntl } from 'react-intl'
import Button, { Theme } from '@src/components/Button/Button'
import ContentHeader, { Breadcrumb } from '@src/components/ContentHeader/ContentHeader'
import StickyHeader from '@src/components/StickyBar/StickyHeader'
import DataTable, { toDataSet } from '@src/components/table/DataTable'
import { ReactComponent as penIcon } from '@src/assets/common/pen.svg'
import commonMessages from '@src/messages'
import { routePath } from '@src/common/appConfig'
import { BREADCRUMBS } from '../utils'
import messages from '../messages'
import AuthorContext, { ActionContext } from '../context/AuthorContext'

export default function AuthorDetail() {
  const { onGetAuthor, onResetAuthor } = useContext(ActionContext)
  const { currentAuthor = {} } = useContext(AuthorContext)
  const { formatMessage } = useIntl()
  const history = useHistory()
  const { id } = useParams()

  useEffect(() => {
    onGetAuthor(id!)
    return () => onResetAuthor()
  }, [onGetAuthor, onResetAuthor, id])

  const titleText = formatMessage(messages.detail)
  const breadcrumbList: Breadcrumb[] = useMemo(
    () =>
      BREADCRUMBS.map(({ title, route }) => ({ title: formatMessage(title), route })).concat([
        { title: titleText, route: undefined }
      ]),
    [formatMessage, titleText]
  )

  const handleEdit = useCallback(() => history.push(routePath.comics.authorEdit.replace(':id', id!)), [history, id])
  const EditButton = useMemo(
    () => (
      <Button
        icon={penIcon}
        buttonText={formatMessage(messages.editStart)}
        theme={Theme.DARK_BORDER}
        onClick={handleEdit}
      />
    ),
    [formatMessage, handleEdit]
  )
  const buttonList = useMemo(() => [EditButton], [EditButton])

  return (
    <>
      <StickyHeader title={titleText} button={EditButton} />
      <ContentHeader breadcrumbList={breadcrumbList} titleText={titleText} buttonList={buttonList} />
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
