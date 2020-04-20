import React, { useMemo, useCallback, useContext } from 'react'
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
import CoinEventContext from '../context/CoinDeliveryEventContext'
import { BREADCRUMBS } from '../constants'
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
  const history = useHistory()
  const { formatMessage } = useIntl()
  const { sortBy, handleSort } = useSort('releaseStartAt')
  const { pagination, handlePageChange } = usePaging({ total: eventTotal })

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
      { id: 'eventId', label: formatMessage(messages.eventId) },
      { id: 'eventName', label: formatMessage(messages.eventName) },
      { id: 'eventType', label: formatMessage(messages.eventType) },
      { id: 'releaseStartAt', label: formatMessage(messages.eventStartAt), onSort: handleSort },
      { id: 'releaseEndAt', label: formatMessage(messages.eventEndAt), onSort: handleSort },
      { id: 'spacer', label: '' }
    ],
    [formatMessage, handleSort]
  )
  const handleSearch = useCallback(data => console.log(data), [])
  const dataList = eventList
    .map(event => ({
      id: event.eventId,
      data: {
        ...event,
        spacer: ''
      }
    }))
    .sort((a: any, b: any) => (Date.parse(a.data[sortBy.key]) - Date.parse(b.data[sortBy.key])) * sortBy.multiplier)

  return (
    <>
      <ContentHeader breadcrumbList={breadcrumbList} titleText={formatMessage(messages.list)} buttonList={buttonList} />
      <SearchBlock onSubmit={handleSearch} />
      <ListTable
        tableClass={classes.table}
        theadList={theadList}
        dataList={dataList}
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
