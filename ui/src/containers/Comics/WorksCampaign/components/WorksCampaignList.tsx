import React, { useMemo, useCallback, useContext } from 'react'
import { useIntl } from 'react-intl'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core'
import { routePath } from '@src/common/appConfig'
import ContentHeader, { Breadcrumb } from '@src/components/ContentHeader/ContentHeader'
import ListTable, { SortOrder } from '@src/components/table/ListTable'
import Button, { Theme } from '@src/components/Button/Button'
import { ReactComponent as penIcon } from '@src/assets/common/pen.svg'
import { ReactComponent as publishIcon } from '@src/assets/common/publish.svg'
import useSort from '@src/hooks/useSort'
import commonMessages from '@src/messages'
import SearchBlock from './SearchBlock'
import messages from '../messages'
import comicMessages from '../../messages'
import { BREADCRUMBS } from '../constants'
import WorksCampaignContext from '../context/worksCampaignContext'

const useStyle = makeStyles({
  table: {
    '& .ListTable-col-1': {
      width: 90
    },
    '& .ListTable-col-6': {
      width: '38%'
    }
  }
})

export default function WorksCampaignList() {
  const { campaignList, campaignTotal } = useContext(WorksCampaignContext)
  const classes = useStyle()
  const { formatMessage } = useIntl()
  const history = useHistory()
  const { sortBy, handleSort } = useSort('createAt')

  const pagination = useMemo(
    () => ({
      start: 1,
      total: campaignTotal
    }),
    [campaignTotal]
  )
  const handlePageClick = useCallback(() => {}, [])
  const handleRedirect = useCallback(
    (id: string) => history.push(routePath.comics.worksCampaignDetail.replace(':id', id)),
    [history]
  )
  const handleSearch = useCallback(() => {}, [])
  const breadcrumbList: Breadcrumb[] = useMemo(
    () => BREADCRUMBS.map(({ title }) => ({ title: formatMessage(title) })),
    [formatMessage]
  )
  const buttonList = useMemo(
    () => [
      <Button
        theme={Theme.DARK_BORDER}
        buttonText={formatMessage(messages.create)}
        onClick={() => history.push(routePath.comics.worksCampaignCreation)}
        icon={penIcon}
      />
    ],
    [history, formatMessage]
  )

  const tableButtonList = useMemo(
    () => [
      <Button
        theme={Theme.LIGHT}
        buttonText={formatMessage(commonMessages.csvExport)}
        icon={publishIcon}
        onClick={() => {}}
      />
    ],
    [formatMessage]
  )
  const theadList = useMemo(
    () => [
      { id: 'image', label: formatMessage(commonMessages.photo) },
      { id: 'workId', label: formatMessage(comicMessages.workId) },
      { id: 'campaignId', label: formatMessage(comicMessages.campaignId) },
      { id: 'createAt', label: formatMessage(commonMessages.createDateTime), onSort: handleSort },
      { id: 'deliverStart', label: formatMessage(commonMessages.deliveryStartDateTime), onSort: handleSort },
      { id: 'priority', label: formatMessage(comicMessages.priority), onSort: handleSort },
      { id: 'spacer', label: '' }
    ],
    [formatMessage, handleSort]
  )

  const dataList = campaignList
    .map(item => ({
      id: item.campaignId,
      data: {
        ...item,
        image: <img src={item.image} alt='' />,
        spacer: ''
      }
    }))
    .sort(
      (a: any, b: any) =>
        (typeof a.data[sortBy.key] === 'string'
          ? a.data[sortBy.key].localeCompare(b.data[sortBy.key])
          : a.data[sortBy.key] - b.data[sortBy.key]) * (sortBy.order === SortOrder.Asc ? 1 : -1)
    )

  return (
    <>
      <ContentHeader breadcrumbList={breadcrumbList} titleText={formatMessage(messages.list)} buttonList={buttonList} />
      <SearchBlock onSubmit={handleSearch} />
      <ListTable
        tableClass={classes.table}
        theadList={theadList}
        dataList={dataList}
        pagination={pagination}
        onPageChange={handlePageClick}
        buttonList={tableButtonList}
        sortBy={sortBy.key}
        sortOrder={sortBy.order}
        onRowClick={handleRedirect}
      />
    </>
  )
}
