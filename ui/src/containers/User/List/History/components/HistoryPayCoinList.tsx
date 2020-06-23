import React, { useMemo, useCallback, useEffect } from 'react'
import { useIntl } from 'react-intl'
import { useParams, useHistory } from 'react-router-dom'
import { makeStyles, Box } from '@material-ui/core'
import ContentHeader from '@src/components/ContentHeader'
import { routePath } from '@src/common/appConfig'
import ListTable from '@src/components/table/ListTable'
import { usePaging } from '@src/hooks'
import HistoryPayCoin from '@src/models/user/historyPayCoin'
import { BREADCRUMBS } from '../utils'
import userMessages from '@src/containers/User/messages'
import messages from '../messages'
import commonMessages from '@src/messages'

interface Props {
  historyTotal: number
  historyList: HistoryPayCoin[]
  onGetHistoryPayCoinList: () => void
}

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
    '& .ListTable-col-4': {
      width: 110
    }
  }
})

export default function HistoryPayCoinList({ historyTotal, historyList, onGetHistoryPayCoinList }: Props) {
  const classes = useStyle()
  const { formatMessage } = useIntl()
  const history = useHistory()
  const { userId } = useParams()
  const { pagination, handlePageChange } = usePaging({ total: historyTotal })

  useEffect(() => {
    onGetHistoryPayCoinList()
  }, [onGetHistoryPayCoinList])

  const breadcrumbList = useMemo(
    () =>
      BREADCRUMBS.map(({ title, route }) => ({
        title: formatMessage(title),
        route
      })).concat([
        { title: formatMessage(userMessages.detail), route: routePath.user.userDetail.replace(':id', userId!) },
        {
          title: formatMessage(messages.payCoin),
          route: undefined
        }
      ]),
    [formatMessage, userId]
  )

  const theadList = useMemo(
    () => [
      { id: 'createdAt', label: formatMessage(commonMessages.createDateTime) },
      { id: 'logType', label: formatMessage(messages.logType) },
      { id: 'applicationId', label: formatMessage(commonMessages.appId) },
      { id: 'coinChangeTotal', label: formatMessage(messages.coinChangeTotal) },
      {
        id: 'coinChangeDetail',
        label: formatMessage(messages.coinChangeDetail),
        formatter: (data: string) => <Box whiteSpace='pre-wrap'>{data}</Box>
      }
    ],
    [formatMessage]
  )

  return (
    <>
      <ContentHeader breadcrumbList={breadcrumbList} titleText={formatMessage(messages.payCoin)} />
      <ListTable
        tableClass={classes.table}
        theadList={theadList}
        dataList={historyList}
        pagination={pagination}
        onPageChange={handlePageChange}
        onRowClick={useCallback(
          (id: string) =>
            history.push(routePath.user.historyPayCoinDetail.replace(':id', id).replace(':userId', userId!)),
          [history, userId]
        )}
        noMarginTop
      />
    </>
  )
}
