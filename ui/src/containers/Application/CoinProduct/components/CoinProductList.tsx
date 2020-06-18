import React, { useMemo, useCallback, useContext, useEffect, useState } from 'react'
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
import { CoinProductKeys, SearchParam, CoinProductStatusType } from '@src/models/application/coinProduct'
import { toDateTime } from '@src/utils/functions'
import commonMessages from '@src/messages'
import userMessages from '@src/containers/User/List/messages'
import Paging from '@src/models/paging'
import CoinProductContext, { ActionContext } from '../context/CoinProductContext'
import { BREADCRUMBS } from '../utils'
import SearchBlock from './SearchBlock'
import messages from '../messages'
import applicationMessages from '../../messages'

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
  const { sortBy, handleSort } = useSort(CoinProductKeys.InsertedAt)
  const { pagination, handlePageChange, query } = usePaging({ total: productTotal })
  const [search, setSearch] = useState<Partial<SearchParam & Paging>>({})

  useEffect(() => {
    onGetCoinProductList({ ...query, ...search, sortBy: sortBy.key, orderBy: sortBy.order })
  }, [onGetCoinProductList, query, search, sortBy])

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

  const handleSearch = useCallback(
    (searchParams: Partial<SearchParam>) => {
      handlePageChange(null, 1)
      setSearch(searchParams)
    },
    [setSearch, handlePageChange]
  )

  const theadList = useMemo(
    () => [
      {
        id: CoinProductKeys.InsertedAt,
        label: formatMessage(commonMessages.createDateTime),
        onSort: handleSort,
        formatter: toDateTime
      },
      {
        id: CoinProductKeys.PublishBeginAt,
        label: formatMessage(commonMessages.publicStartTime),
        onSort: handleSort,
        formatter: toDateTime
      },
      { id: CoinProductKeys.Id, label: formatMessage(messages.productId) },
      { id: CoinProductKeys.AppId, label: formatMessage(commonMessages.appId) },
      { id: CoinProductKeys.PayCoin, label: formatMessage(userMessages.paidCoins) },
      { id: CoinProductKeys.PayBonusCoin, label: formatMessage(userMessages.paidBonusCoins) },
      {
        id: CoinProductKeys.Status,
        label: formatMessage(applicationMessages.status),
        formatter: (value: CoinProductStatusType) => formatMessage(messages[value])
      }
    ],
    [formatMessage, handleSort]
  )

  return (
    <>
      <ContentHeader breadcrumbList={breadcrumbList} titleText={formatMessage(messages.list)} buttonList={buttonList} />
      <SearchBlock onSubmit={handleSearch} />
      <ListTable
        tableClass={classes.table}
        theadList={theadList}
        dataList={productList}
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
