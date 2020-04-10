import React, { useMemo, useContext, useCallback } from 'react'
import { useIntl } from 'react-intl'
import { useHistory, useParams } from 'react-router-dom'
import ContentHeader from '@src/components/ContentHeader'
import Button, { Theme } from '@src/components/Button/Button'
import DataTable, { toDataSet } from '@src/components/table/DataTable'
import { ReactComponent as IconEdit } from '@src/assets/form/button_edit.svg'
import commonMessages from '@src/messages'
import { routePath } from '@src/common/appConfig'
import ContentsCampaignContext from '../context/ContentsCampaignContext'
import { BREADCRUMBS } from '../constants'
import comicMessages from '../../messages'
import messages from '../messages'

export default function ContentCampaignDetail() {
  const { currentContentCampaign } = useContext(ContentsCampaignContext)
  const { formatMessage } = useIntl()
  const history = useHistory()
  const { id } = useParams()
  const titleText = formatMessage(messages.detail)
  const breadcrumbList = useMemo(
    () =>
      BREADCRUMBS.map(({ title, route }) => ({
        title: formatMessage(title),
        route
      })).concat([{ title: titleText, route: undefined }]),
    [formatMessage, titleText]
  )
  const handleEdit = useCallback(() => history.push(routePath.comics.contentsCampaignEdit.replace(':id', id!)), [
    id,
    history
  ])
  const buttonList = useMemo(
    () => [
      <Button
        theme={Theme.DARK_BORDER}
        icon={IconEdit}
        buttonText={formatMessage(messages.edit)}
        onClick={handleEdit}
      />
    ],
    [formatMessage, handleEdit]
  )

  return (
    <>
      <ContentHeader breadcrumbList={breadcrumbList} titleText={titleText} buttonList={buttonList} />
      <DataTable
        title={formatMessage(commonMessages.basicInfo)}
        onEdit={handleEdit}
        dataSet={[
          toDataSet(formatMessage(comicMessages.campaignId), currentContentCampaign.campaignId),
          toDataSet(formatMessage(commonMessages.contentId), currentContentCampaign.contentId),
          toDataSet(formatMessage(commonMessages.appId), currentContentCampaign.appId),
          toDataSet(formatMessage(comicMessages.priority), currentContentCampaign.priority),
          toDataSet(formatMessage(comicMessages.contentPrice), currentContentCampaign.contentPrice),
          toDataSet(formatMessage(messages.completeBonus), currentContentCampaign.completeBonus),
          toDataSet(formatMessage(commonMessages.createDateTime), currentContentCampaign.createAt),
          toDataSet(formatMessage(commonMessages.updateDateTime), currentContentCampaign.updateAt)
        ]}
        marginBottom
      />
      <DataTable
        title={formatMessage(commonMessages.deliveryDuration)}
        onEdit={handleEdit}
        dataSet={[
          toDataSet(formatMessage(commonMessages.deliveryStartDateTime), currentContentCampaign.deliverStart),
          toDataSet(formatMessage(commonMessages.deliveryEndDateTime), currentContentCampaign.deliverEnd)
        ]}
        marginBottom
      />
      <DataTable
        title={formatMessage(messages.campaignPeriod)}
        onEdit={handleEdit}
        dataSet={[
          toDataSet(formatMessage(commonMessages.startTime), currentContentCampaign.campaignStart),
          toDataSet(formatMessage(commonMessages.endTime), currentContentCampaign.campaignEnd)
        ]}
      />
    </>
  )
}
