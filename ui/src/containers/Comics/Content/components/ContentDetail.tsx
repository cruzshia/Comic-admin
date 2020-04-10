import React, { useMemo, useContext, useCallback } from 'react'
import { useIntl } from 'react-intl'
import { useHistory, useParams } from 'react-router-dom'
import { makeStyles } from '@material-ui/core'
import ContentHeader from '@src/components/ContentHeader'
import DataTable, { toDataSet } from '@src/components/table/DataTable'
import Button, { Theme } from '@src/components/Button/Button'
import { ReactComponent as IconEdit } from '@src/assets/form/button_edit.svg'
import { routePath } from '@src/common/appConfig'
import { hyperlinkColor, borderColorLight } from '@src/common/styles'
import { _range } from '@src/utils/functions'
import commonMessages from '@src/messages'
import AdSettingTable from '../../components/AdSettingTable'
import ContentContext from '../context/ContentContext'
import { CONTENT_BREADCRUMBS, MAGAZINE_BANNER_NUM } from '../constants'
import comicMessages from '../../messages'
import messages from '../messages'

const useStyle = makeStyles({
  overlapTable: {
    borderTop: `1px solid ${borderColorLight}`,
    marginTop: '20px'
  },
  author: {
    color: hyperlinkColor
  }
})

export default function ContentDetail() {
  const classes = useStyle()
  const { currentContent = {} } = useContext(ContentContext)
  const { formatMessage } = useIntl()
  const history = useHistory()
  const { id } = useParams()

  const breadcrumbList = useMemo(
    () =>
      CONTENT_BREADCRUMBS.map(({ title, route }) => ({ title: formatMessage(title), route })).concat([
        { title: formatMessage(messages.detail), route: undefined }
      ]),
    [formatMessage]
  )
  const buttonList = useMemo(
    () => [
      <Button
        theme={Theme.DARK_BORDER}
        icon={IconEdit}
        buttonText={formatMessage(messages.edit)}
        onClick={() => {
          history.push(routePath.comics.contentEdit.replace(':id', id!))
        }}
      />
    ],
    [formatMessage, history, id]
  )

  const handleRedirect = useCallback(() => history.push(routePath.comics.contentEdit.replace(':id', id!)), [
    history,
    id
  ])

  return (
    <>
      <ContentHeader breadcrumbList={breadcrumbList} titleText={currentContent.title} buttonList={buttonList} />
      <DataTable
        title={formatMessage(commonMessages.basicInfo)}
        dataSet={[
          toDataSet(formatMessage(commonMessages.contentId), currentContent.id),
          toDataSet(formatMessage(messages.title), currentContent.title),
          toDataSet(formatMessage(messages.titleKana), currentContent.titleKana),
          toDataSet(formatMessage(messages.category), currentContent.category),
          toDataSet(formatMessage(commonMessages.introduction), currentContent.description),
          toDataSet(
            formatMessage(commonMessages.author),
            <span className={classes.author}>{currentContent.author}</span>
          ),
          toDataSet(formatMessage(commonMessages.appId), currentContent.appId),
          toDataSet(formatMessage(comicMessages.workId), currentContent.workId),
          toDataSet(formatMessage(comicMessages.contentPrice), currentContent.price),
          toDataSet(formatMessage(messages.openAdUrl), currentContent.openingAdUrl),
          toDataSet(formatMessage(messages.sort), currentContent.sort),
          toDataSet(formatMessage(messages.limitedTimeFree), currentContent.limitedTimeFree),
          toDataSet(formatMessage(comicMessages.episodeNumber), currentContent.episodeNumber),
          toDataSet(formatMessage(messages.thumbnailImage), <img src={currentContent.thumbnail} alt='thumbnail' />),
          toDataSet(formatMessage(messages.openAdImage), <img src={currentContent.adImage} alt='ad' />),
          toDataSet(formatMessage(messages.requestId), currentContent.requestId),
          toDataSet(formatMessage(commonMessages.createDateTime), currentContent.createAt),
          toDataSet(formatMessage(commonMessages.updateDateTime), currentContent.updateAt)
        ]}
        marginBottom
      />
      <DataTable
        title={formatMessage(commonMessages.deliveryDuration)}
        dataSet={[
          toDataSet(formatMessage(commonMessages.deliveryStartDateTime), currentContent.deliverStart),
          toDataSet(formatMessage(commonMessages.deliveryEndDateTime), currentContent.deliverEnd),
          toDataSet(formatMessage(messages.paidCoinStartTime), currentContent.paidCoinDeliverStart),
          toDataSet(formatMessage(messages.paidCoinEndTime), currentContent.paidCoinDeliverEnd)
        ]}
        marginBottom
      />
      <DataTable
        title={formatMessage(messages.freePPVDuration)}
        dataSet={[
          toDataSet(formatMessage(messages.freePPVStart, { num: 1 }), currentContent.freePPVStart1),
          toDataSet(formatMessage(messages.freePPVEnd, { num: 1 }), currentContent.freePPVEnd1),
          toDataSet(formatMessage(messages.freePPVStart, { num: 2 }), currentContent.freePPVStart2),
          toDataSet(formatMessage(messages.freePPVEnd, { num: 2 }), currentContent.freePPVEnd2)
        ]}
        marginBottom
      />
      <AdSettingTable data={currentContent.advertisement} onEdit={handleRedirect} />
      <DataTable
        title={formatMessage(messages.magazineBannerSetting)}
        dataSet={[
          toDataSet('', formatMessage(commonMessages.deviceCommon), true),
          ..._range(0, MAGAZINE_BANNER_NUM).map(num =>
            toDataSet(
              `${formatMessage(messages.magazineBannerSetting)}${num + 1}`,
              currentContent.magazineBanner[num].map((setting: any, idx: number) => (
                <DataTable
                  key={`mag${num}-setting${idx}`}
                  tableClass={idx > 0 ? classes.overlapTable : ''}
                  dataSet={[
                    toDataSet(formatMessage(messages.displayCondition), setting.condition),
                    toDataSet(
                      formatMessage(commonMessages.photo),
                      setting.image ? <img src={setting.image} alt={`setting${idx}`} /> : ''
                    ),
                    toDataSet(formatMessage(messages.transitionUrl), setting.url)
                  ]}
                  innerTable
                />
              ))
            )
          )
        ]}
      />
    </>
  )
}
