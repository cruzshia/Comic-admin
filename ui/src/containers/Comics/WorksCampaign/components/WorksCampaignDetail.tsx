import React, { useCallback, useMemo, useContext } from 'react'
import { useIntl } from 'react-intl'
import { useHistory, useParams } from 'react-router-dom'
import { makeStyles } from '@material-ui/core'
import { routePath } from '@src/common/appConfig'
import ContentHeader, { Breadcrumb } from '@src/components/ContentHeader/ContentHeader'
import Button, { Theme } from '@src/components/Button/Button'
import DataTable, { toDataSet } from '@src/components/table/DataTable'
import ScrollableContent from '@src/components/table/ScrollableContent'
import { ReactComponent as penIcon } from '@src/assets/common/pen.svg'
import { _range } from '@src/utils/functions'
import commonMessages from '@src/messages'
import messages from '../messages'
import comicMessages from '../../messages'
import worksCampaignContext from '../context/worksCampaignContext'
import { BREADCRUMBS, IMAGE_NUM } from '../constants'
import AdSettingTable from '../../components/AdSettingTable'

const useStyles = makeStyles({
  table: {
    marginBottom: '36px',
    lineHeight: '14px'
  }
})

export default function WorksCampaignDetail() {
  const { formatMessage } = useIntl()
  const classes = useStyles()
  const { currentCampaign: campaign } = useContext(worksCampaignContext)
  const history = useHistory()
  const { id } = useParams()
  const titleText = formatMessage(messages.detail)

  const handleRedirect = useCallback(() => history.push(routePath.comics.worksCampaignEdit.replace(':id', id!)), [
    history,
    id
  ])

  const breadcrumbList: Breadcrumb[] = useMemo(
    () =>
      BREADCRUMBS.map(({ title, route }) => ({
        title: formatMessage(title),
        route
      })).concat([{ title: titleText, route: undefined }]),
    [formatMessage, titleText]
  )

  const buttonList = useMemo(
    () => [
      <Button
        theme={Theme.DARK_BORDER}
        buttonText={formatMessage(messages.edit)}
        onClick={handleRedirect}
        icon={penIcon}
      />
    ],
    [formatMessage, handleRedirect]
  )

  return (
    <>
      <ContentHeader breadcrumbList={breadcrumbList} titleText={titleText} buttonList={buttonList} />
      <DataTable
        title={formatMessage(commonMessages.basicInfo)}
        tableClass={classes.table}
        onEdit={handleRedirect}
        dataSet={[
          toDataSet(formatMessage(comicMessages.campaignId), campaign.id),
          toDataSet(formatMessage(comicMessages.workId), campaign.workId),
          toDataSet(formatMessage(commonMessages.appId), campaign.appId),
          toDataSet(formatMessage(comicMessages.priority), campaign.priority),
          toDataSet(formatMessage(commonMessages.introduction), campaign.description),
          toDataSet(
            formatMessage(messages.freeContentId),
            <ScrollableContent>{campaign.freeContentId}</ScrollableContent>
          ),
          toDataSet(formatMessage(commonMessages.createDateTime), campaign.createAt),
          toDataSet(formatMessage(commonMessages.updateDateTime), campaign.updateAt)
        ]}
      />
      <DataTable
        title={formatMessage(commonMessages.episodeInfo)}
        tableClass={classes.table}
        onEdit={handleRedirect}
        dataSet={[
          ..._range(0, IMAGE_NUM).map(i => {
            const img = campaign.images[i]
            return toDataSet(
              `${formatMessage(commonMessages.photo)}${i + 1}`,
              img ? <img key={`image-${i}`} src={img} alt={img} /> : ''
            )
          })
        ]}
      />
      <DataTable
        title={formatMessage(commonMessages.deliveryDuration)}
        tableClass={classes.table}
        onEdit={handleRedirect}
        dataSet={[
          toDataSet(formatMessage(commonMessages.startDateTime), campaign.startDateTime),
          toDataSet(formatMessage(commonMessages.endDateTime), campaign.endDateTime)
        ]}
      />
      <AdSettingTable data={campaign.advertisement} onEdit={handleRedirect} />
    </>
  )
}
