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
import { WorkKeys, WorkType } from '@src/models/comics/work'
import { ImageKey } from '@src/models/image'
import commonMessages from '@src/messages'
import messages from '../messages'
import comicMessages from '@src/containers/Comics/messages'
import WorksCampaignContext, { ActionContext } from '../context/worksCampaignContext'
import { BREADCRUMBS } from '../utils'

const useStyles = makeStyles({
  table: {
    marginBottom: '36px',
    lineHeight: '14px'
  }
})

export default function WorksCampaignDetail() {
  const { formatMessage } = useIntl()
  const classes = useStyles()
  const { currentCampaign: campaign, currentWork: work } = useContext(WorksCampaignContext)
  const { onGetWorksCampaign, onResetWorksCampaign, onGetWork, onRestWork } = useContext(ActionContext)
  const history = useHistory()
  const { id, campaignId } = useParams()
  const titleText = formatMessage(messages.detail)
  const workId = campaign?.[WorksCampaignKeys.WorkId]

  useEffect(() => {
    onGetWorksCampaign(id!)
    return () => onResetWorksCampaign()
  }, [id, onGetWorksCampaign, onResetWorksCampaign])

  useEffect(() => {
    workId && onGetWork(workId)
    return () => onRestWork()
  }, [onGetWork, onRestWork, workId])

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

  const isEpisode = work?.[WorkKeys.WorkType] === WorkType.Episode

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
          toDataSet(formatMessage(commonMessages.appId), campaign[WorksCampaignKeys.Apps]?.[0]?.name),
          toDataSet(formatMessage(comicMessages.priority), campaign[WorksCampaignKeys.Priority]),
          toDataSet(formatMessage(commonMessages.introduction), campaign[WorksCampaignKeys.Priority]),
          toDataSet(formatMessage(messages.freeRange), campaign[WorksCampaignKeys.FreeRange]),
          toDataSet(formatMessage(messages.freeRangeDisplayString), campaign[WorksCampaignKeys.FreeRangeDisplay]),
          toDataSet(formatMessage(commonMessages.createDateTime), campaign[WorksCampaignKeys.InsertedAt]),
          toDataSet(formatMessage(commonMessages.updateDateTime), campaign[WorksCampaignKeys.UpdatedAt])
        ]}
      />
      {isEpisode && (
        <DataTable
          title={formatMessage(commonMessages.episodeInfo)}
          tableClass={classes.table}
          onEdit={handleEditEpisode}
          dataSet={[
            ..._range(1, IMAGE_NUM + 1).map(i => {
              const img = campaign[WorksCampaignKeys.Images]?.[`image${i}` as ImageKey]
              const url = img?.url as string
              return toDataSet(
                `${formatMessage(comicMessages.episodeImage)}${i + 1}`,
                img ? <img key={`image-${i}`} src={url} alt={url} /> : ''
              )
            })
          ]}
        />
      )}
      <DataTable
        title={formatMessage(commonMessages.deliveryDuration)}
        tableClass={classes.table}
        onEdit={handleEditDelivery}
        dataSet={[
          toDataSet(formatMessage(commonMessages.startDateTime), campaign[WorksCampaignKeys.BeginAt]),
          toDataSet(formatMessage(commonMessages.endDateTime), campaign[WorksCampaignKeys.EndAt])
        ]}
      />
      {isEpisode &&
        campaign[WorksCampaignKeys.AdSetting]?.map((adSetting, idx) => (
          <AdSettingTable key={`adSetting-${idx}`} onEdit={handleEditAdSetting} data={adSetting} hideTitle={!!idx} />
        ))}
    </>
  ) : null
}
