import React, { useCallback, useMemo, useContext, useEffect } from 'react'
import { useIntl } from 'react-intl'
import { useHistory, useParams } from 'react-router-dom'
import { makeStyles } from '@material-ui/core'
import { routePath, ANCHOR_QUERY } from '@src/common/appConfig'
import ContentHeader, { Breadcrumb } from '@src/components/ContentHeader/ContentHeader'
import StickyHeader from '@src/components/StickyBar/StickyHeader'
import Button, { Theme } from '@src/components/Button/Button'
import DataTable, { toDataSet } from '@src/components/table/DataTable'
import { ReactComponent as penIcon } from '@src/assets/common/pen.svg'
import { _range } from '@src/utils/functions'
import { IMAGE_NUM, ScrollAnchor } from '@src/containers/Comics/utils'
import AdSettingTable from '@src/containers/Comics/components/AdSettingTable'
import { WorksCampaignKeys } from '@src/models/comics/worksCampaign'
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
  const { currentCampaign: campaign } = useContext(WorksCampaignContext)
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
      <Button
        theme={Theme.DARK_BORDER}
        buttonText={formatMessage(messages.editStart)}
        onClick={handleEdit}
        icon={penIcon}
      />
    ],
    [formatMessage, handleEdit]
  )

  return campaign ? (
    <>
      <StickyHeader title={titleText} button={buttonList} />
      <ContentHeader breadcrumbList={breadcrumbList} titleText={titleText} buttonList={buttonList} />
      <DataTable
        title={formatMessage(commonMessages.basicInfo)}
        tableClass={classes.table}
        onEdit={handleEdit}
        dataSet={[
          toDataSet(formatMessage(messages.name), campaign[WorksCampaignKeys.Name]),
          toDataSet(formatMessage(comicMessages.workId), campaign[WorksCampaignKeys.WorkId]),
          toDataSet(formatMessage(comicMessages.workName), campaign[WorksCampaignKeys.WorkName]),
          toDataSet(formatMessage(commonMessages.appId), campaign[WorksCampaignKeys.Apps]),
          toDataSet(formatMessage(comicMessages.priority), campaign[WorksCampaignKeys.Priority]),
          toDataSet(formatMessage(commonMessages.introduction), campaign[WorksCampaignKeys.Priority]),
          toDataSet(formatMessage(messages.freeRange), campaign[WorksCampaignKeys.FreeRange]),
          toDataSet(formatMessage(messages.freeRangeDisplayString), campaign[WorksCampaignKeys.FreeRangeDisplay]),
          toDataSet(formatMessage(commonMessages.createDateTime), campaign[WorksCampaignKeys.InsertedAt]),
          toDataSet(formatMessage(commonMessages.updateDateTime), campaign[WorksCampaignKeys.UpdatedAt])
        ]}
      />
      <DataTable
        title={formatMessage(commonMessages.episodeInfo)}
        tableClass={classes.table}
        onEdit={handleEditEpisode}
        dataSet={[
          ..._range(1, IMAGE_NUM + 1).map(i => {
            const img = campaign[WorksCampaignKeys.Images]?.[`image${i}`]
            return toDataSet(
              `${formatMessage(comicMessages.episodeImage)}${i + 1}`,
              img ? <img key={`image-${i}`} src={img.url} alt={img.url} /> : ''
            )
          })
        ]}
      />
      <DataTable
        title={formatMessage(commonMessages.deliveryDuration)}
        tableClass={classes.table}
        onEdit={handleEditDelivery}
        dataSet={[
          toDataSet(formatMessage(commonMessages.startDateTime), campaign[WorksCampaignKeys.BeginAt]),
          toDataSet(formatMessage(commonMessages.endDateTime), campaign[WorksCampaignKeys.EndAt])
        ]}
      />
      <AdSettingTable data={campaign[WorksCampaignKeys.AdSetting]} onEdit={handleEditAdSetting} />
    </>
  ) : null
}
