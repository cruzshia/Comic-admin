import React, { useContext, useCallback } from 'react'
import { useIntl } from 'react-intl'
import { useHistory, useParams } from 'react-router-dom'
import ContentHeader from '@src/components/ContentHeader'
import DataTable, { toDataSet, toPreWrapDataSet } from '@src/components/table/DataTable'
import Button, { Theme } from '@src/components/Button/Button'
import { ReactComponent as IconEdit } from '@src/assets/form/button_edit.svg'
import { ReactComponent as IconCopy } from '@src/assets/header/copy.svg'
import commonMessages from '@src/messages'
import { routePath, ANCHOR_QUERY } from '@src/common/appConfig'
import NotificationContext from '../context/NotificationContext'
import { ScrollAnchor } from '../../utils'
import { BREADCRUMBS } from '../constants'
import messages from '../messages'

export default function NotificationDetail() {
  const { formatMessage } = useIntl()
  const history = useHistory()
  const { id } = useParams()
  const { currentNotification } = useContext(NotificationContext)

  const titleText = formatMessage(messages.detail)
  const breadcrumbList = BREADCRUMBS.map(({ title, route }) => ({
    title: formatMessage(title),
    route
  })).concat([{ title: titleText, route: undefined }])
  const buttonList = [
    <Button buttonText={formatMessage(messages.startCreate)} icon={IconEdit} theme={Theme.DARK_BORDER} />,
    <Button buttonText={formatMessage(commonMessages.copy)} icon={IconCopy} />
  ]

  const handleRedirect = useCallback(
    (target?: ScrollAnchor) => {
      history.push(routePath.user.notificationEdit.replace(':id', id!) + (target ? `?${ANCHOR_QUERY}=${target}` : ''))
    },
    [history, id]
  )

  return (
    <>
      <ContentHeader breadcrumbList={breadcrumbList} titleText={titleText} buttonList={buttonList} />
      <DataTable
        title={formatMessage(commonMessages.basicInfo)}
        dataSet={[
          toDataSet(formatMessage(commonMessages.id), currentNotification.id),
          toDataSet(formatMessage(commonMessages.application), currentNotification.application),
          toDataSet(formatMessage(commonMessages.createDateTime), currentNotification.createDateTime),
          toDataSet(formatMessage(commonMessages.updateDateTime), currentNotification.updateDateTime)
        ]}
        marginBottom
        onEdit={useCallback(() => {
          handleRedirect()
        }, [handleRedirect])}
      />
      <DataTable
        title={formatMessage(commonMessages.releaseDuration)}
        dataSet={[
          toDataSet(formatMessage(commonMessages.publicStartTime), currentNotification.publicStartTime),
          toDataSet(formatMessage(commonMessages.publicEndTime), currentNotification.publicEndTime)
        ]}
        marginBottom
        onEdit={useCallback(() => {
          handleRedirect(ScrollAnchor.ReleaseDuration)
        }, [handleRedirect])}
      />
      <DataTable
        title={formatMessage(messages.content)}
        dataSet={[
          toDataSet(formatMessage(messages.notificationType), currentNotification.notificationType),
          toDataSet(formatMessage(messages.majorFlag), currentNotification.majorFlag),
          toDataSet(formatMessage(commonMessages.title), currentNotification.title),
          toPreWrapDataSet(formatMessage(messages.text), currentNotification.text)
        ]}
        onEdit={useCallback(() => {
          handleRedirect(ScrollAnchor.Content)
        }, [handleRedirect])}
      />
    </>
  )
}
