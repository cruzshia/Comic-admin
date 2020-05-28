import React, { useContext, useCallback, useMemo, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useIntl } from 'react-intl'
import { makeStyles } from '@material-ui/core'
import Button, { Theme } from '@src/components/Button/Button'
import DataTable, { toDataSet } from '@src/components/table/DataTable'
import { routePath, ANCHOR_QUERY } from '@src/common/appConfig'
import { hyperlinkColor } from '@src/common/styles'
import { ReactComponent as penIcon } from '@src/assets/common/pen.svg'
import ContentHeader, { Breadcrumb } from '@src/components/ContentHeader/ContentHeader'
import { _range } from '@src/utils/functions'
import StickyHeader from '@src/components/StickyBar/StickyHeader'
import workContext, { ActionContext } from '../context/WorkContext'
import { ScrollAnchor, IMAGE_NUM, IMAGE_MAX_WIDTH } from '../../utils'
import commonMessages from '@src/messages'
import comicMessages from '../../messages'
import messages from '../messages'
import { BREADCRUMBS } from '../utils'
import AdSettingTable from '../../components/AdSettingTable'

const useStyle = makeStyles({
  table: {
    marginBottom: '36px',
    lineHeight: '21px'
  },
  subTitle: {
    padding: '15px 20px'
  },
  innerTable: {
    margin: '-20px',
    border: 'none',
    '& .MuiGrid-container .MuiGrid-item:first-child': {
      maxWidth: 120
    }
  },
  blueText: {
    color: hyperlinkColor
  },
  image: {
    maxWidth: IMAGE_MAX_WIDTH
  }
})

export default function WorkDetail() {
  const { currentWork = {} } = useContext(workContext)
  const { onGetWork, onResetWork } = useContext(ActionContext)
  const { formatMessage } = useIntl()
  const { id } = useParams()
  const classes = useStyle()
  const history = useHistory()

  const titleText = currentWork.title
  const breadcrumbList: Breadcrumb[] = useMemo(
    () =>
      BREADCRUMBS.map(({ title, route }) => ({
        title: formatMessage(title),
        route
      })).concat({ title: formatMessage(messages.detail), route: undefined }),
    [formatMessage]
  )

  useEffect(() => {
    onGetWork(id!)
    return () => onResetWork()
  }, [onGetWork, id, onResetWork])

  const handleRedirect = useCallback(
    (target?: ScrollAnchor) => () =>
      history.push(routePath.comics.workEdit.replace(':id', id!) + (target ? `?${ANCHOR_QUERY}=${target}` : '')),
    [history, id]
  )
  const handleEdit = useMemo(() => handleRedirect(), [handleRedirect])
  const handleEditDelivery = useMemo(() => handleRedirect(ScrollAnchor.Delivery), [handleRedirect])
  const handleEditEpisode = useMemo(() => handleRedirect(ScrollAnchor.EpisodeInfo), [handleRedirect])
  const handleEditAd = useMemo(() => handleRedirect(ScrollAnchor.AdSetting), [handleRedirect])

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

  if (!currentWork.id) return null

  return (
    <>
      <StickyHeader title={titleText} button={EditButton} />
      <ContentHeader titleText={titleText} breadcrumbList={breadcrumbList} buttonList={[EditButton]} />
      <DataTable
        title={formatMessage(commonMessages.basicInfo)}
        tableClass={classes.table}
        onEdit={handleEdit}
        dataSet={[
          toDataSet(formatMessage(comicMessages.workId), currentWork.id),
          toDataSet(formatMessage(commonMessages.title), currentWork.title),
          toDataSet(formatMessage(messages.titleKana), currentWork.titleKana),
          toDataSet(formatMessage(messages.introduction), currentWork.introduction),
          toDataSet(
            formatMessage(commonMessages.author),
            <span className={classes.blueText}>{currentWork.author[0]}</span>
          ),
          toDataSet(formatMessage(messages.category), currentWork.category),
          toDataSet(formatMessage(messages.reduction), currentWork.reduction),
          toDataSet(formatMessage(commonMessages.subscriptionId), currentWork.subscriptionId),
          toDataSet(formatMessage(commonMessages.createDateTime), currentWork.createDateTime),
          toDataSet(formatMessage(commonMessages.updateDateTime), currentWork.updateDateTime)
        ]}
      />
      <DataTable
        title={formatMessage(commonMessages.deliveryDuration)}
        tableClass={classes.table}
        onEdit={handleEditDelivery}
        dataSet={[
          toDataSet(formatMessage(commonMessages.deliveryStartDateTime), currentWork.deliveryStartDateTime),
          toDataSet(formatMessage(commonMessages.deliveryEndDateTime), currentWork.deliveryEndDateTime)
        ]}
      />
      <DataTable
        title={formatMessage(commonMessages.episodeInfo)}
        tableClass={classes.table}
        onEdit={handleEditEpisode}
        dataSet={[
          toDataSet(formatMessage(messages.episodeCategory), currentWork.episodeCategory),
          toDataSet(formatMessage(messages.updateFrequency), currentWork.updateFrequency),
          toDataSet(formatMessage(messages.rensai), currentWork.rensai),
          ..._range(0, IMAGE_NUM).map(i => {
            const img = currentWork.images[i]
            return toDataSet(
              `${formatMessage(comicMessages.episodeImage)}${i + 1}`,
              img ? <img key={`image-${i}`} className={classes.image} src={img} alt={img} /> : ''
            )
          })
        ]}
      />
      <AdSettingTable onEdit={handleEditAd} data={currentWork.advertisement} />
    </>
  )
}
