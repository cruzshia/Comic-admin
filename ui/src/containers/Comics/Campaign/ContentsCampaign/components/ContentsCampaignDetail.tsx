import React, { useMemo, useContext, useCallback, useEffect } from 'react'
import { useIntl } from 'react-intl'
import { useHistory, useParams } from 'react-router-dom'
import ContentHeader from '@src/components/ContentHeader'
import Button, { Theme } from '@src/components/Button/Button'
import DataTable, { toDataSet } from '@src/components/table/DataTable'
import { ReactComponent as IconEdit } from '@src/assets/form/button_edit.svg'
import commonMessages from '@src/messages'
import { routePath, ANCHOR_QUERY } from '@src/common/appConfig'
import { ScrollAnchor } from '@src/containers/Comics/utils'
import ContentsCampaignContext, { ActionContext } from '../context/ContentsCampaignContext'
import { BREADCRUMBS } from '../constants'
import comicMessages from '@src/containers/Comics/messages'
import messages from '../messages'

export default function ContentCampaignDetail() {
  const { currentContentCampaign = {} } = useContext(ContentsCampaignContext)
  const { onGetContentCampaign, onResetContentCampaign } = useContext(ActionContext)
  const { formatMessage } = useIntl()
  const history = useHistory()
  const { id, campaignId } = useParams()

  useEffect(() => {
    onGetContentCampaign(id!)
    return () => onResetContentCampaign()
  }, [onResetContentCampaign, onGetContentCampaign, id])

  const titleText = formatMessage(messages.detail)
  const breadcrumbList = useMemo(
    () =>
      BREADCRUMBS.map(({ title, route }) => ({
        title: formatMessage(title),
        route: route?.replace(':id', campaignId!)
      })).concat([{ title: titleText, route: undefined }]),
    [formatMessage, titleText, campaignId]
  )

  const handleRedirect = useCallback(
    (target?: ScrollAnchor) => () =>
      history.push(
        routePath.comics.contentsCampaignEdit.replace(':campaignId', campaignId!).replace(':id', id!) +
          (target ? `?${ANCHOR_QUERY}=${target}` : '')
      ),
    [history, id, campaignId]
  )
  const handleEdit = useMemo(() => handleRedirect(), [handleRedirect])

  const buttonList = useMemo(
    () => [
      <Button
        theme={Theme.DARK_BORDER}
        icon={IconEdit}
        buttonText={formatMessage(messages.editStart)}
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
          toDataSet(formatMessage(messages.contentCampaignName), currentContentCampaign.campaignName),
          toDataSet(formatMessage(commonMessages.contentId), currentContentCampaign.contentId),
          toDataSet(formatMessage(commonMessages.contentName), currentContentCampaign.contentName),
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
        onEdit={handleRedirect(ScrollAnchor.Delivery)}
        dataSet={[
          toDataSet(formatMessage(commonMessages.deliveryStartDateTime), currentContentCampaign.deliverStart),
          toDataSet(formatMessage(commonMessages.deliveryEndDateTime), currentContentCampaign.deliverEnd)
        ]}
        marginBottom
      />
      <DataTable
        title={formatMessage(messages.campaignPeriod)}
        onEdit={handleRedirect(ScrollAnchor.CampaignTime)}
        dataSet={[
          toDataSet(formatMessage(commonMessages.startTime), currentContentCampaign.campaignStart),
          toDataSet(formatMessage(commonMessages.endTime), currentContentCampaign.campaignEnd)
        ]}
      />
    </>
  )
}
