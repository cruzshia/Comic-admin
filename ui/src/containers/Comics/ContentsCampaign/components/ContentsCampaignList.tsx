import React, { useMemo, useCallback, useContext } from 'react'
import { useIntl } from 'react-intl'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core'
import ContentHeader from '@src/components/ContentHeader'
import Button, { Theme } from '@src/components/Button/Button'
import { ReactComponent as IconEdit } from '@src/assets/form/button_edit.svg'
import { routePath } from '@src/common/appConfig'
import useSort from '@src/hooks/useSort'
import usePaging from '@src/hooks/usePaging'
import commonMessages from '@src/messages'
import ListTable from '@src/components/table/ListTable'
import SearchBlock from './SearchBlock'
import ContentCampaignContext from '../context/ContentsCampaignContext'
import { BREADCRUMBS } from '../constants'
import comicMessages from '../../messages'
import messages from '../messages'

const useStyle = makeStyles({
  table: {
    '& .ListTable-col-1, .ListTable-col-2': {
      width: 210
    },
    '& .ListTable-col-3, .ListTable-col-4, .ListTable-col-5': {
      width: 120
    }
  }
})

export default function ContentCampaignList() {
  const classes = useStyle()
  const { contentsCampaignList, contentCampaignTotal } = useContext(ContentCampaignContext)
  const { formatMessage } = useIntl()
  const history = useHistory()
  const { sortBy, handleSort } = useSort('deliverStart')
  const { pagination, handlePageChange } = usePaging({ total: contentCampaignTotal })
  const breadcrumbList = useMemo(
    () =>
      BREADCRUMBS.map(({ title }) => ({
        title: formatMessage(title)
      })),
    [formatMessage]
  )
  const buttonList = useMemo(
    () => [
      <Button
        icon={IconEdit}
        theme={Theme.DARK_BORDER}
        buttonText={formatMessage(messages.startCreate)}
        onClick={() => history.push(routePath.comics.contentsCampaignCreation)}
      />
    ],
    [formatMessage, history]
  )

  const handleSearch = useCallback(() => {}, [])
  const theadList = useMemo(
    () => [
      { id: 'campaignId', label: formatMessage(comicMessages.campaignId) },
      { id: 'contentId', label: formatMessage(commonMessages.contentId) },
      { id: 'priority', label: formatMessage(comicMessages.priority) },
      {
        id: 'contentPrice',
        label: formatMessage(comicMessages.contentPrice)
      },
      { id: 'completeBonus', label: formatMessage(messages.completeBonus) },
      { id: 'deliverStart', label: formatMessage(commonMessages.deliveryStartDateTime), onSort: handleSort },
      { id: 'deliverEnd', label: formatMessage(commonMessages.deliveryEndDateTime) },
      { id: 'spacer', label: '' }
    ],
    [handleSort, formatMessage]
  )
  const handleRowClick = useCallback(
    (id: string) => history.push(routePath.comics.contentsCampaignDetail.replace(':id', id!)),
    [history]
  )

  const displayDataList = useMemo(
    () =>
      contentsCampaignList
        .map(campaign => ({
          id: campaign.campaignId,
          data: {
            ...campaign,
            spacer: ''
          }
        }))
        .sort((a: any, b: any) => a.data[sortBy.key].localeCompare(b.data[sortBy.key]) * sortBy.multiplier),
    [contentsCampaignList, sortBy]
  )

  return (
    <>
      <ContentHeader
        breadcrumbList={breadcrumbList}
        titleText={formatMessage(messages.management)}
        buttonList={buttonList}
      />
      <SearchBlock onSubmit={handleSearch} />
      <ListTable
        tableClass={classes.table}
        theadList={theadList}
        dataList={displayDataList}
        pagination={pagination}
        onPageChange={handlePageChange}
        sortBy={sortBy.key}
        sortOrder={sortBy.order}
        onRowClick={handleRowClick}
      />
    </>
  )
}
