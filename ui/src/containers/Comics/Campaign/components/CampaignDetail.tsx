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
import CampaignContext, { ActionContext } from '../context/CampaignContext'
import { BREADCRUMBS } from '../utils'
import commonMessages from '@src/messages'
import comicMessages from '../../messages'
import worksCampaignMessages from '../WorksCampaign/messages'
import contentCampaignMessages from '../ContentsCampaign/messages'
import messages from '../messages'

const ROUTE = {
  works: routePath.comics.worksCampaignDetail,
  content: routePath.comics.contentsCampaignDetail
}

export default function CampaignDetail() {
  const { currentCampaign = {}, subCampaignList, subCampaignTotal } = useContext(CampaignContext)
  const { onGetSubCampaignList, onGetCampaign } = useContext(ActionContext)
  const { formatMessage } = useIntl()
  const history = useHistory()
  const { pagination, handlePageChange } = usePaging({ total: subCampaignTotal })
  const { id } = useParams()

  useEffect(() => {
    onGetSubCampaignList()
    onGetCampaign(id!)
  }, [onGetSubCampaignList, onGetCampaign, id])

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
      { id: 'category', label: formatMessage(messages.category) },
      { id: 'name', label: formatMessage(messages.name) },
      { id: 'target', label: formatMessage(messages.target) },
      { id: 'startAt', label: formatMessage(commonMessages.deliveryStartDateTime) },
      { id: 'endAt', label: formatMessage(commonMessages.deliveryEndDateTime) },
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

  const dataList = subCampaignList.map(data => ({
    ...data,
    category: formatMessage(comicMessages[`${data.type}Campaign` as keyof typeof comicMessages])
  }))

  const handleRowClick = useCallback(
    (rowId: string) =>
      history.push(
        ROUTE[subCampaignList.find(campaign => campaign.id === rowId).type as keyof typeof ROUTE]
          .replace(':campaignId', id!)
          .replace(':id', rowId!)
      ),
    [history, id, subCampaignList]
  )

  return (
    <>
      <StickyHeader title={titleText} button={buttonList} />
      <ContentHeader breadcrumbList={breadcrumbList} titleText={titleText} buttonList={buttonList} />
      <DataTable
        onEdit={handleRedirectEdit}
        title={formatMessage(commonMessages.basicInfo)}
        dataSet={[
          toDataSet(formatMessage(comicMessages.campaignId), currentCampaign.campaignId),
          toDataSet(formatMessage(messages.name), currentCampaign.name),
          toDataSet(formatMessage(messages.adminComment), currentCampaign.comment),
          toDataSet(
            `${formatMessage(commonMessages.startDateTime)}（${formatMessage(messages.adminUsage)}）`,
            currentCampaign.startAt
          ),
          toDataSet(
            `${formatMessage(commonMessages.endDateTime)}（${formatMessage(messages.adminUsage)}）`,
            currentCampaign.endAt
          ),
          toDataSet(formatMessage(commonMessages.createDateTime), currentCampaign.createAt),
          toDataSet(formatMessage(commonMessages.updateDateTime), currentCampaign.updateAt)
        ]}
      />
      <ListTable
        theadList={theadList}
        buttonList={listButtonList}
        dataList={dataList}
        pagination={pagination}
        onPageChange={handlePageChange}
        onRowClick={handleRowClick}
      />
    </>
  )
}
