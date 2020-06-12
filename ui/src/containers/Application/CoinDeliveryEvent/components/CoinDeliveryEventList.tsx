import React, { useMemo, useCallback, useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useIntl } from 'react-intl'
import { makeStyles } from '@material-ui/core'
import Button, { Theme } from '@src/components/Button/Button'
import { routePath } from '@src/common/appConfig'
import ContentHeader from '@src/components/ContentHeader'
import ListTable from '@src/components/table/ListTable'
import { ReactComponent as EditIcon } from '@src/assets/common/pen.svg'
import useSort from '@src/hooks/useSort'
import usePaging from '@src/hooks/usePaging'
import { CoinDeliveryEventKeys, EventType } from '@src/models/application/coinDeliveryEvent'
import { toDateTime } from '@src/utils/functions'
import CoinEventContext, { ActionContext } from '../context/CoinDeliveryEventContext'
import { BREADCRUMBS } from '../constants'
import commonMessages from '@src/messages'
import messages from '../messages'
import SearchBlock from './SearchBlock'

const useStyle = makeStyles({
  table: {
    '& .ListTable-col-3': {
      width: 130
    },
    '& .ListTable-col-4, .ListTable-col-5': {
      width: 160
    },
    '& .ListTable-col-6': {
      width: '25%'
    }
  }
})

export default function CoinDeliveryEventList() {
  const classes = useStyle()
  const { eventList, eventTotal } = useContext(CoinEventContext)
  const { onGetCoinDeliveryEventList } = useContext(ActionContext)
  const history = useHistory()
  const { formatMessage } = useIntl()
  const [searchParams, setSearchParams] = useState<object>({})
  const { sortBy, handleSort } = useSort(CoinDeliveryEventKeys.PublishBeginAt)
  const { pagination, handlePageChange, query } = usePaging({ total: eventTotal })

  useEffect(() => {
    onGetCoinDeliveryEventList({ ...searchParams, ...query, sortBy: sortBy.key, order: sortBy.order })
  }, [onGetCoinDeliveryEventList, sortBy, query, searchParams])

  const breadcrumbList = useMemo(() => BREADCRUMBS.map(({ title }) => ({ title: formatMessage(title) })), [
    formatMessage
  ])
  const buttonList = useMemo(
    () => [
      <Button
        theme={Theme.DARK_BORDER}
        icon={EditIcon}
        buttonText={formatMessage(messages.create)}
        onClick={() => history.push(routePath.application.coinDeliveryEventCreation)}
      />
    ],
    [formatMessage, history]
  )
  const theadList = useMemo(
    () => [
      { id: CoinDeliveryEventKeys.ID, label: formatMessage(messages.eventId) },
      { id: CoinDeliveryEventKeys.Name, label: formatMessage(messages.eventName) },
      {
        id: CoinDeliveryEventKeys.EventType,
        label: formatMessage(messages.eventType),

        formatter: (data: EventType) => formatMessage(messages[data])
      },
      {
        id: CoinDeliveryEventKeys.PublishBeginAt,
        label: formatMessage(commonMessages.publicStartTime),
        onSort: handleSort,
        formatter: toDateTime
      },
      {
        id: CoinDeliveryEventKeys.PublishEndAt,
        label: formatMessage(commonMessages.publicEndTime),
        onSort: handleSort,
        formatter: toDateTime
      },
      { id: 'spacer', label: '' }
    ],
    [formatMessage, handleSort]
  )
  const handleSearch = useCallback(
    data => {
      handlePageChange(null, 1)
      setSearchParams(data)
    },
    [setSearchParams, handlePageChange]
  )

  return (
    <>
      <ContentHeader breadcrumbList={breadcrumbList} titleText={formatMessage(messages.list)} buttonList={buttonList} />
      <SearchBlock onSubmit={handleSearch} />
      <ListTable
        tableClass={classes.table}
        theadList={theadList}
        dataList={eventList}
        pagination={pagination}
        onPageChange={handlePageChange}
        sortBy={sortBy.key}
        sortOrder={sortBy.order}
        onRowClick={useCallback(
          (id: string) => history.push(routePath.application.coinDeliveryEventDetail.replace(':id', id)),
          [history]
        )}
      />
    </>
  )
}
