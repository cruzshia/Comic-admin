import React, { useMemo, useCallback, useEffect } from 'react'
import { useIntl } from 'react-intl'
import { useParams, useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core'
import ContentHeader from '@src/components/ContentHeader'
import { routePath } from '@src/common/appConfig'
import HistorySubscription from '@src/models/user/historySubscription'
import ListTable from '@src/components/table/ListTable'
import { useSort, usePaging } from '@src/hooks'
import { BREADCRUMBS } from '../utils'
import userMessages from '@src/containers/User/messages'
import messages from '../messages'
import commonMessages from '@src/messages'

const useStyle = makeStyles({
  table: {
    '& .ListTable-col-1': {
      width: 150
    },
    '& .ListTable-col-2': {
      width: 230
    },
    '& .ListTable-col-3': {
      width: 200
    },
    '& .ListTable-col-4, .ListTable-col-5': {
      width: 80
    },
    '& .ListTable-col-6, .ListTable-col-7': {
      width: 140
    }
  }
})

interface Props {
  historyTotal: number
  historyList: HistorySubscription[]
  onGetList: () => void
}

export default function HistorySubscriptionList({ historyTotal, historyList, onGetList }: Props) {
  const classes = useStyle()
  const { formatMessage } = useIntl()
  const history = useHistory()
  const { userId } = useParams()
  const { sortBy, handleSort } = useSort('createdAt')
  const { pagination, handlePageChange } = usePaging({ total: historyTotal })

  useEffect(() => {
    onGetList()
  }, [onGetList])

  const breadcrumbList = useMemo(
    () =>
      BREADCRUMBS.map(({ title, route }) => ({
        title: formatMessage(title),
        route
      })).concat([
        { title: formatMessage(userMessages.detail), route: routePath.user.userDetail.replace(':id', userId!) },
        {
          title: formatMessage(messages.subscription),
          route: undefined
        }
      ]),
    [formatMessage, userId]
  )

  const theadList = useMemo(
    () => [
      { id: 'createdAt', label: formatMessage(commonMessages.createDateTime), onSort: handleSort },
      { id: 'subscriptionId', label: formatMessage(commonMessages.subscriptionId) },
      { id: 'applicationId', label: formatMessage(commonMessages.appId) },
      { id: 'price', label: formatMessage(messages.price) },
      { id: 'currency', label: formatMessage(messages.currency) },
      { id: 'startAt', label: formatMessage(commonMessages.startDateTime) },
      { id: 'updateAt', label: formatMessage(commonMessages.updateDateTime) },
      { id: 'validityPeriod', label: formatMessage(userMessages.validityPeriod) }
    ],
    [formatMessage, handleSort]
  )

  const dataList = historyList
    .map(({ id, ...rest }) => ({
      id: id,
      data: rest
    }))
    .sort((a: any, b: any) => (Date.parse(a.data[sortBy.key]) - Date.parse(b.data[sortBy.key])) * sortBy.multiplier)

  return (
    <>
      <ContentHeader breadcrumbList={breadcrumbList} titleText={formatMessage(messages.subscription)} />
      <ListTable
        tableClass={classes.table}
        theadList={theadList}
        dataList={dataList}
        pagination={pagination}
        onPageChange={handlePageChange}
        sortBy={sortBy.key}
        sortOrder={sortBy.order}
        onRowClick={useCallback(
          (id: string) =>
            history.push(routePath.user.historySubscriptionDetail.replace(':id', id).replace(':userId', userId!)),
          [history, userId]
        )}
        noMarginTop
      />
    </>
  )
}
