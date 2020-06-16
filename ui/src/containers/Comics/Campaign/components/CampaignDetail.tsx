import React, { useMemo, useContext, useCallback, useEffect } from 'react'
import { useIntl } from 'react-intl'
import { useHistory, useParams } from 'react-router-dom'
import ContentHeader from '@src/components/ContentHeader'
import Button, { Theme } from '@src/components/Button/Button'
import DataTable, { toDataSet } from '@src/components/table/DataTable'
import ListTable from '@src/components/table/ListTable'
import StickyHeader from '@src/components/StickyBar/StickyHeader'
import { ReactComponent as penIcon } from '@src/assets/common/pen.svg'
import { routePath } from '@src/common/appConfig'
import { usePaging } from '@src/hooks'
import { toDateTime } from '@src/utils/functions'
import { CampaignKeys, CampaignType, AssociatedCampaignKeys, AssociatedCampaign } from '@src/models/comics/campaign'
import CampaignContext, { ActionContext } from '../context/CampaignContext'
import { BREADCRUMBS } from '../utils'
import commonMessages from '@src/messages'
import comicMessages from '../../messages'
import worksCampaignMessages from '../WorksCampaign/messages'
import contentCampaignMessages from '../ContentsCampaign/messages'
import messages from '../messages'

const ROUTE = {
  [CampaignType.WorkCampaign]: routePath.comics.worksCampaignDetail,
  [CampaignType.ContentCampaign]: routePath.comics.contentsCampaignDetail
}

export default function CampaignDetail() {
  const { currentCampaign, associatedCampaignList, associatedCampaignTotal } = useContext(CampaignContext)
  const { onGetAssociatedCampaignList, onGetCampaign } = useContext(ActionContext)
  const { formatMessage } = useIntl()
  const history = useHistory()
  const { pagination, handlePageChange, query } = usePaging({ total: associatedCampaignTotal })
  const { id } = useParams()

  useEffect(() => {
    onGetAssociatedCampaignList(Number(id!), query)
    onGetCampaign(id!)
  }, [onGetAssociatedCampaignList, onGetCampaign, id, query])

  const titleText = formatMessage(messages.detail)
  const breadcrumbList = useMemo(
    () =>
      BREADCRUMBS.map(({ title, route }) => ({
        title: formatMessage(title),
        route
      })).concat({ title: titleText, route: undefined }),
    [formatMessage, titleText]
  )
  const handleRedirectEdit = useCallback(() => history.push(routePath.comics.campaignEdit.replace(':id', id!)), [
    id,
    history
  ])
  const buttonList = useMemo(
    () => [
      <Button
        theme={Theme.DARK_BORDER}
        buttonText={formatMessage(messages.editStart)}
        onClick={handleRedirectEdit}
        icon={penIcon}
      />
    ],
    [formatMessage, handleRedirectEdit]
  )

  const theadList = useMemo(
    () => [
      {
        id: AssociatedCampaignKeys.CampaignType,
        label: formatMessage(messages.category),
        formatter: (data: AssociatedCampaign[AssociatedCampaignKeys.CampaignType]) => formatMessage(messages[data])
      },
      { id: AssociatedCampaignKeys.Name, label: formatMessage(messages.name) },
      { id: AssociatedCampaignKeys.CampaignTarget, label: formatMessage(messages.target) },
      { id: AssociatedCampaignKeys.BeginAt, label: formatMessage(commonMessages.startDateTime), formatter: toDateTime },
      { id: AssociatedCampaignKeys.EndAt, label: formatMessage(commonMessages.endDateTime), formatter: toDateTime },
      { id: 'spacer', label: '' }
    ],
    [formatMessage]
  )

  const listButtonList = useMemo(
    () => [
      <Button
        theme={Theme.DARK_BORDER}
        buttonText={formatMessage(worksCampaignMessages.create)}
        onClick={() => history.push(routePath.comics.worksCampaignCreation.replace(':campaignId', id!))}
        icon={penIcon}
      />,
      <Button
        theme={Theme.DARK_BORDER}
        buttonText={formatMessage(contentCampaignMessages.create)}
        onClick={() => history.push(routePath.comics.contentsCampaignCreation.replace(':campaignId', id!))}
        icon={penIcon}
      />
    ],
    [formatMessage, history, id]
  )

  const handleRowClick = useCallback(
    (rowId: string, data: { [key: string]: any }) =>
      history.push(
        ROUTE[data[AssociatedCampaignKeys.CampaignType] as keyof typeof ROUTE]
          .replace(':campaignId', id!)
          .replace(':id', rowId!)
      ),
    [history, id]
  )

  if (!currentCampaign) return null

  return (
    <>
      <StickyHeader title={titleText} button={buttonList} />
      <ContentHeader breadcrumbList={breadcrumbList} titleText={titleText} buttonList={buttonList} />
      <DataTable
        onEdit={handleRedirectEdit}
        title={formatMessage(commonMessages.basicInfo)}
        dataSet={[
          toDataSet(formatMessage(comicMessages.campaignId), currentCampaign[CampaignKeys.ID]),
          toDataSet(formatMessage(messages.name), currentCampaign[CampaignKeys.Name]),
          toDataSet(formatMessage(messages.adminComment), currentCampaign[CampaignKeys.Note]),
          toDataSet(
            `${formatMessage(commonMessages.startDateTime)}（${formatMessage(messages.adminUsage)}）`,
            currentCampaign[CampaignKeys.BeginAt]
          ),
          toDataSet(
            `${formatMessage(commonMessages.endDateTime)}（${formatMessage(messages.adminUsage)}）`,
            currentCampaign[CampaignKeys.EndAt]
          ),
          toDataSet(formatMessage(commonMessages.createDateTime), currentCampaign[CampaignKeys.InsertedAt]),
          toDataSet(formatMessage(commonMessages.updateDateTime), currentCampaign[CampaignKeys.UpdateAt])
        ]}
      />
      <ListTable
        theadList={theadList}
        buttonList={listButtonList}
        dataList={associatedCampaignList}
        pagination={pagination}
        onPageChange={handlePageChange}
        onRowClick={handleRowClick}
      />
    </>
  )
}
