import React, { useMemo, useContext, useCallback, useEffect } from 'react'
import { useIntl } from 'react-intl'
import { useHistory, useParams } from 'react-router-dom'
import ContentHeader from '@src/components/ContentHeader'
import { ReactComponent as EditIcon } from '@src/assets/common/pen.svg'
import Button, { Theme } from '@src/components/Button/Button'
import { routePath } from '@src/common/appConfig'
import DataTable, { toDataSet, toPreWrapDataSet } from '@src/components/table/DataTable'
import commonMessages from '@src/messages'
import applicationMessages from '../../messages'
import ApplicationInfoContext, { ActionContext } from '../context/ApplicationInfoContext'
import { BREADCRUMBS } from '../constants'
import messages from '../messages'

export default function ApplicationInfoDetail() {
  const { formatMessage } = useIntl()
  const history = useHistory()
  const { id } = useParams()
  const { currentInfo = {} } = useContext(ApplicationInfoContext)
  const { onGetApplicationInfo, onResetApplicationInfo } = useContext(ActionContext)

  useEffect(() => {
    onGetApplicationInfo(id!)
    return () => onResetApplicationInfo()
  }, [onResetApplicationInfo, onGetApplicationInfo, id])

  const breadcrumbList = useMemo(
    () =>
      BREADCRUMBS.map(({ title, route }) => ({ title: formatMessage(title), route })).concat([
        {
          title: formatMessage(messages.detail),
          route: undefined
        }
      ]),
    [formatMessage]
  )

  const handleEdit = useCallback(() => history.push(routePath.application.applicationInfoEdit.replace(':id', id!)), [
    id,
    history
  ])

  const buttonList = useMemo(
    () => [
      <Button
        theme={Theme.DARK_BORDER}
        icon={EditIcon}
        buttonText={formatMessage(messages.edit)}
        onClick={handleEdit}
      />
    ],
    [formatMessage, handleEdit]
  )
  if (!currentInfo.applicationId) return null
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
          toDataSet(formatMessage(applicationMessages.applicationId), currentInfo.applicationId),
          toDataSet(formatMessage(messages.applicationName), currentInfo.applicationName),
          toDataSet(formatMessage(messages.commonKey), currentInfo.commonKey),
          toDataSet(formatMessage(messages.apnsValidityPeriod), currentInfo.apnsValidityPeriod),
          toDataSet(formatMessage(messages.apnsCertificate), currentInfo.apnsCertificate),
          toDataSet(formatMessage(messages.fcnmApiKey), currentInfo.fcnmApiKey),
          toDataSet(formatMessage(messages.androidPublicKey), currentInfo.androidPublicKey),
          toDataSet(formatMessage(messages.iTunesPublicKey), currentInfo.iTunesPublicKey),
          toPreWrapDataSet(formatMessage(messages.supplementSetting), currentInfo.supplementSetting),
          toDataSet(formatMessage(commonMessages.createDateTime), currentInfo.createdAt)
        ]}
      />
    </>
  )
}
