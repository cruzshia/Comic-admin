import React, { useCallback, useMemo, useContext, useEffect } from 'react'
import { useIntl } from 'react-intl'
import { useHistory, useParams } from 'react-router-dom'
import { makeStyles } from '@material-ui/core'
import { routePath, ANCHOR_QUERY } from '@src/common/appConfig'
import ContentHeader, { Breadcrumb } from '@src/components/ContentHeader/ContentHeader'
import Button, { Theme } from '@src/components/Button/Button'
import DataTable, { toDataSet } from '@src/components/table/DataTable'
import { ReactComponent as penIcon } from '@src/assets/common/pen.svg'
import { _range } from '@src/utils/functions'
import { IMAGE_NUM, ScrollAnchor } from '@src/containers/Comics/utils'
import AdSettingTable from '@src/containers/Comics/components/AdSettingTable'
import commonMessages from '@src/messages'
import messages from '../messages'
import comicMessages from '@src/containers/Comics/messages'
import WorksCampaignContext, { ActionContext } from '../context/worksCampaignContext'
import { BREADCRUMBS } from '../constants'

const useStyles = makeStyles({
  table: {
    marginBottom: '36px',
    lineHeight: '14px'
  }
})

export default function WorksCampaignDetail() {
  const { formatMessage } = useIntl()
  const classes = useStyles()
  const { currentCampaign: campaign = {} } = useContext(WorksCampaignContext)
  const { onGetWorksCampaign, onResetWorksCampaign } = useContext(ActionContext)
  const history = useHistory()
  const { id, campaignId } = useParams()
  const titleText = formatMessage(messages.detail)

  useEffect(() => {
    onGetWorksCampaign(id!)
    return () => onResetWorksCampaign()
  }, [id, onGetWorksCampaign, onResetWorksCampaign])

  const handleRedirect = useCallback(
    (target?: ScrollAnchor) => () =>
      history.push(
        routePath.comics.worksCampaignEdit.replace(':campaignId', campaignId!).replace(':id', id!) +
          (target ? `?${ANCHOR_QUERY}=${target}` : '')
      ),
    [history, campaignId, id]
  )
  const handleEdit = useMemo(() => handleRedirect(), [handleRedirect])
  const handleEditEpisode = useMemo(() => handleRedirect(ScrollAnchor.EpisodeInfo), [handleRedirect])
  const handleEditDelivery = useMemo(() => handleRedirect(ScrollAnchor.Delivery), [handleRedirect])
  const handleEditAdSetting = useMemo(() => handleRedirect(ScrollAnchor.AdSetting), [handleRedirect])

  const breadcrumbList: Breadcrumb[] = useMemo(
    () =>
      BREADCRUMBS.map(({ title, route }) => ({
        title: formatMessage(title),
        route: route?.replace(':id', campaignId!)
      })).concat([{ title: titleText, route: undefined }]),
    [formatMessage, titleText, campaignId]
  )

  const buttonList = useMemo(
    () => [
      <Button theme={Theme.DARK_BORDER} buttonText={formatMessage(messages.edit)} onClick={handleEdit} icon={penIcon} />
    ],
    [formatMessage, handleEdit]
  )

  return campaign.campaignId ? (
    <>
      <ContentHeader breadcrumbList={breadcrumbList} titleText={titleText} buttonList={buttonList} />
      <DataTable
        title={formatMessage(commonMessages.basicInfo)}
        tableClass={classes.table}
        onEdit={handleEdit}
        dataSet={[
          toDataSet(formatMessage(messages.name), campaign.campaignName),
          toDataSet(formatMessage(comicMessages.workId), campaign.workId),
          toDataSet(formatMessage(commonMessages.appId), campaign.appId),
          toDataSet(formatMessage(comicMessages.priority), campaign.priority),
          toDataSet(formatMessage(commonMessages.introduction), campaign.description),
          toDataSet(formatMessage(commonMessages.createDateTime), campaign.createAt),
          toDataSet(formatMessage(commonMessages.updateDateTime), campaign.updateAt)
        ]}
      />
      <DataTable
        title={formatMessage(commonMessages.episodeInfo)}
        tableClass={classes.table}
        onEdit={handleEditEpisode}
        dataSet={[
          ..._range(0, IMAGE_NUM).map(i => {
            const img = campaign.images[i]
            return toDataSet(
              `${formatMessage(comicMessages.episodeImage)}${i + 1}`,
              img ? <img key={`image-${i}`} src={img} alt={img} /> : ''
            )
          })
        ]}
      />
      <DataTable
        title={formatMessage(commonMessages.deliveryDuration)}
        tableClass={classes.table}
        onEdit={handleEditDelivery}
        dataSet={[
          toDataSet(formatMessage(commonMessages.startDateTime), campaign.startDateTime),
          toDataSet(formatMessage(commonMessages.endDateTime), campaign.endDateTime)
        ]}
      />
      <AdSettingTable data={campaign.advertisement} onEdit={handleEditAdSetting} />
    </>
  ) : null
}
