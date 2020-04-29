import React, { useMemo, useCallback, useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useIntl } from 'react-intl'
import { makeStyles } from '@material-ui/core'
import Button, { Theme } from '@src/components/Button/Button'
import { routePath } from '@src/common/appConfig'
import ContentHeader from '@src/components/ContentHeader'
import ListTable from '@src/components/table/ListTable'
import { ReactComponent as EditIcon } from '@src/assets/common/pen.svg'
import usePaging from '@src/hooks/usePaging'
import useSort from '@src/hooks/useSort'
import CoinProductContext, { ActionContext } from '../context/CoinProductContext'
import { BREADCRUMBS } from '../constants'
import commonMessages from '@src/messages'
import messages from '../messages'
import applicationMessages from '../../messages'
import SearchBlock from './SearchBlock'

const useStyle = makeStyles({
  table: {
    '& .ListTable-col-1, .ListTable-col-2': {
      width: 150
    },
    '& .ListTable-col-5, .ListTable-col-6': {
      padding: '9px 5px',
      width: 130
    }
  }
})

export default function CoinProductList() {
  const { productList, productTotal } = useContext(CoinProductContext)
  const { onGetCoinProductList } = useContext(ActionContext)
  const history = useHistory()
  const { formatMessage } = useIntl()
  const classes = useStyle()
  const { sortBy, handleSort } = useSort('createdAt')
  const { pagination, handlePageChange } = usePaging({ total: productTotal })

  useEffect(() => {
    onGetCoinProductList()
  }, [onGetCoinProductList])

  const breadcrumbList = useMemo(() => BREADCRUMBS.map(({ title }) => ({ title: formatMessage(title) })), [
    formatMessage
  ])
  const buttonList = useMemo(
    () => [
      <Button
        theme={Theme.DARK_BORDER}
        icon={EditIcon}
        buttonText={formatMessage(messages.create)}
        onClick={() => {
          history.push(routePath.application.coinProductCreation)
        }}
      />
    ],
    [formatMessage, history]
  )
  const handleSearch = useCallback(data => console.log(data), [])

  const theadList = useMemo(
    () => [
      { id: 'createdAt', label: formatMessage(commonMessages.createDateTime), onSort: handleSort },
      { id: 'releaseStartTime', label: formatMessage(commonMessages.publicStartTime), onSort: handleSort },
      { id: 'productId', label: formatMessage(messages.productId) },
      { id: 'applicationId', label: formatMessage(commonMessages.appId) },
      { id: 'paidCoin', label: formatMessage(messages.paidCoin), onSort: handleSort },
      { id: 'givenCoin', label: formatMessage(messages.givenCoin), onSort: handleSort },
      { id: 'status', label: formatMessage(applicationMessages.status) }
    ],
    [formatMessage, handleSort]
  )

  const dataList = productList
    .map(product => ({
      id: product.productId,
      data: product
    }))
    .sort((a: any, b: any) => {
      return typeof a.data[sortBy.key] === 'string'
        ? a.data[sortBy.key].localeCompare(b.data[sortBy.key]) * sortBy.multiplier
        : (a.data[sortBy.key] - b.data[sortBy.key]) * sortBy.multiplier
    })

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
          (id: string) => history.push(routePath.application.coinProductDetail.replace(':id', id!)),
          [history]
        )}
      />
    </>
  )
}
