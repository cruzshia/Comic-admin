import React, { useMemo, useCallback, useEffect } from 'react'
import { useIntl } from 'react-intl'
import { useParams, useHistory } from 'react-router-dom'
import { makeStyles, Box } from '@material-ui/core'
import HistoryMagazine from '@src/models/user/historyMagazine'
import ContentHeader from '@src/components/ContentHeader'
import { routePath } from '@src/common/appConfig'
import ListTable from '@src/components/table/ListTable'
import { usePaging } from '@src/hooks'
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
    '& .ListTable-col-4': {
      width: 110
    }
  }
})

interface Props {
  historyTotal: number
  historyList: HistoryMagazine[]
  onGetMagazineList: () => void
}

export default function HistoryMagazineList({ historyTotal, historyList, onGetMagazineList }: Props) {
  const classes = useStyle()
  const { formatMessage } = useIntl()
  const history = useHistory()
  const { userId } = useParams()
  const { pagination, handlePageChange } = usePaging({ total: historyTotal })

  useEffect(() => {
    onGetMagazineList()
  }, [onGetMagazineList])

  const breadcrumbList = useMemo(
    () =>
      BREADCRUMBS.map(({ title, route }) => ({
        title: formatMessage(title),
        route
      })).concat([
        { title: formatMessage(userMessages.detail), route: routePath.user.userDetail.replace(':id', userId!) },
        {
          title: formatMessage(messages.magazinePurchase),
          route: undefined
        }
      ]),
    [formatMessage, userId]
  )

  const theadList = useMemo(
    () => [
      { id: 'createdAt', label: formatMessage(commonMessages.createDateTime) },
      { id: 'content', label: formatMessage(commonMessages.contents) },
      { id: 'applicationId', label: formatMessage(commonMessages.appId) },
      { id: 'coinChangeTotal', label: formatMessage(messages.coinChangeTotal) },
      { id: 'coinChangeDetail', label: formatMessage(messages.coinChangeDetail) }
    ],
    [formatMessage]
  )

  const dataList = historyList.map(({ coinChangeDetail, ...data }) => ({
    ...data,
    coinChangeDetail: <Box whiteSpace='pre-wrap'>{coinChangeDetail}</Box>
  }))

  return (
    <>
      <ContentHeader breadcrumbList={breadcrumbList} titleText={formatMessage(messages.magazinePurchase)} />
      <ListTable
        tableClass={classes.table}
        theadList={theadList}
        dataList={dataList}
        pagination={pagination}
        onPageChange={handlePageChange}
        onRowClick={useCallback(
          (id: string) =>
            history.push(routePath.user.historyMagazineDetail.replace(':id', id).replace(':userId', userId!)),
          [history, userId]
        )}
        noMarginTop
      />
    </>
  )
}
