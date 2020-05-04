import React, { useMemo, useContext, useCallback } from 'react'
import { useIntl } from 'react-intl'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core'
import ContentHeader from '@src/components/ContentHeader'
import Button, { Theme } from '@src/components/Button/Button'
import ListTable from '@src/components/table/ListTable'
import { routePath } from '@src/common/appConfig'
import { ReactComponent as penIcon } from '@src/assets/common/pen.svg'
import { useSort, usePaging } from '@src/hooks'
import CampaignContext from '../context/CampaignContext'
import SearchBlock from './SearchBlock'
import commonMessages from '@src/messages'
import messages from '../messages'
import { BREADCRUMBS } from '../utils'

const useStyle = makeStyles({
  table: {
    '& .ListTable-col-1': {
      width: 260
    },
    '& .ListTable-col-2, .ListTable-col-3': {
      width: 160
    }
  }
})

export default function CampaignList() {
  const { campaignList, campaignTotal } = useContext(CampaignContext)
  const { formatMessage } = useIntl()
  const history = useHistory()
  const { sortBy, handleSort } = useSort('startAt')
  const { pagination, handlePageChange } = usePaging({ total: campaignTotal })
  const classes = useStyle()

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
        theme={Theme.DARK_BORDER}
        buttonText={formatMessage(messages.create)}
        icon={penIcon}
        onClick={() => history.push(routePath.comics.campaignCreation)}
      />
    ],
    [formatMessage, history]
  )

  const theadList = useMemo(
    () => [
      { id: 'name', label: formatMessage(messages.name) },
      { id: 'startAt', label: formatMessage(commonMessages.startDateTime), onSort: handleSort },
      { id: 'endAt', label: formatMessage(commonMessages.endDateTime), onSort: handleSort },
      { id: 'spacer', label: '' }
    ],
    [formatMessage, handleSort]
  )

  const dataList = campaignList
    .map(({ id, ...campaign }) => ({
      id,
      data: {
        ...campaign,
        spacer: ''
      }
    }))
    .sort((a: any, b: any) => a.data[sortBy.key].localeCompare(b.data[sortBy.key]) * sortBy.multiplier)

  return (
    <>
      <ContentHeader breadcrumbList={breadcrumbList} titleText={formatMessage(messages.list)} buttonList={buttonList} />
      <SearchBlock onSubmit={console.log} />
      <ListTable
        tableClass={classes.table}
        theadList={theadList}
        dataList={dataList}
        pagination={pagination}
        onPageChange={handlePageChange}
        sortBy={sortBy.key}
        sortOrder={sortBy.order}
        onRowClick={useCallback((id: string) => history.push(routePath.comics.contentDetail.replace(':id', id!)), [
          history
        ])}
      />
    </>
  )
}
