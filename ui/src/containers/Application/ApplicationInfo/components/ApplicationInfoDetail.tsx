import React, { useMemo, useContext, useCallback, useEffect } from 'react'
import { useIntl } from 'react-intl'
import { useHistory, useParams } from 'react-router-dom'
import ContentHeader from '@src/components/ContentHeader'
import { ReactComponent as EditIcon } from '@src/assets/common/pen.svg'
import Button, { Theme } from '@src/components/Button/Button'
import StickyHeader from '@src/components/StickyBar/StickyHeader'
import { routePath } from '@src/common/appConfig'
import DataTable, { toDataSet, toPreWrapDataSet } from '@src/components/table/DataTable'
import { ApplicationInfoKeys } from '@src/models/application/applicationInfo'
import ApplicationInfoContext, { ActionContext } from '../context/ApplicationInfoContext'
import { BREADCRUMBS } from '../utils'
import commonMessages from '@src/messages'
import applicationMessages from '../../messages'
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

  const title = useMemo(() => formatMessage(messages.detail), [formatMessage])

  const breadcrumbList = useMemo(
    () =>
      BREADCRUMBS.map(({ title, route }) => ({ title: formatMessage(title), route })).concat([
        {
          title: title,
          route: undefined
        }
      ]),
    [formatMessage, title]
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
        buttonText={formatMessage(messages.editStart)}
        onClick={handleEdit}
      />
    ],
    [formatMessage, handleEdit]
  )
  if (!currentInfo[ApplicationInfoKeys.AppIdToken]) return null
  return (
    <>
      <ContentHeader breadcrumbList={breadcrumbList} titleText={title} buttonList={buttonList} />
      <StickyHeader title={title} button={buttonList} />
      <DataTable
        title={formatMessage(commonMessages.basicInfo)}
        dataSet={[
          toDataSet(formatMessage(applicationMessages.applicationId), currentInfo[ApplicationInfoKeys.AppIdToken]),
          toDataSet(formatMessage(messages.applicationName), currentInfo[ApplicationInfoKeys.Name]),
          toDataSet(formatMessage(messages.commonKey), currentInfo[ApplicationInfoKeys.CommonKey]),
          toDataSet(formatMessage(messages.apnsAuthKey), currentInfo[ApplicationInfoKeys.ApnsAuthKey]),
          toDataSet(formatMessage(messages.fcnmApiKey), currentInfo[ApplicationInfoKeys.FcmApiKey]),
          toDataSet(formatMessage(messages.androidPublicKey), currentInfo[ApplicationInfoKeys.AndroidPublicKey]),
          toDataSet(formatMessage(messages.iTunesPublicKey), currentInfo[ApplicationInfoKeys.ItunesSharedSecret]),
          toPreWrapDataSet(
            formatMessage(messages.supplementSetting),
            currentInfo[ApplicationInfoKeys.AdditionalSetting]
          ),
          toDataSet(formatMessage(commonMessages.createDateTime), currentInfo[ApplicationInfoKeys.CreateAt]),
          toDataSet(formatMessage(commonMessages.updateDateTime), currentInfo[ApplicationInfoKeys.UpdatedAt])
        ]}
      />
    </>
  )
}
