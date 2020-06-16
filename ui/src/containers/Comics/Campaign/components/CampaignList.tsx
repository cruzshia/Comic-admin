import React, { useMemo, useContext, useCallback, useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core'
import ContentHeader from '@src/components/ContentHeader'
import Button, { Theme } from '@src/components/Button/Button'
import ListTable from '@src/components/table/ListTable'
import { routePath } from '@src/common/appConfig'
import { ReactComponent as penIcon } from '@src/assets/common/pen.svg'
import { useSort, usePaging } from '@src/hooks'
import { SearchParam, CampaignKeys } from '@src/models/comics/campaign'
import { toDateTime } from '@src/utils/functions'
import CampaignContext, { ActionContext } from '../context/CampaignContext'
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
  const classes = useStyle()
  const { campaignList, campaignTotal } = useContext(CampaignContext)
  const { onGetCampaignList } = useContext(ActionContext)
  const { formatMessage } = useIntl()
  const history = useHistory()
  const { sortBy, handleSort } = useSort(CampaignKeys.BeginAt)
  const { pagination, handlePageChange, query } = usePaging({ total: campaignTotal })
  const [params, setParam] = useState<Partial<SearchParam>>({})

  useEffect(() => {
    onGetCampaignList({ ...query, ...params })
  }, [onGetCampaignList, query, params])

  const handleSearch = useCallback(
    data => {
      handlePageChange(null, 1)
      setParam(data)
    },
    [setParam, handlePageChange]
  )

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
      { id: CampaignKeys.Name, label: formatMessage(messages.name) },
      {
        id: CampaignKeys.BeginAt,
        label: formatMessage(commonMessages.startDateTime),
        onSort: handleSort,
        formatter: toDateTime
      },
      {
        id: CampaignKeys.EndAt,
        label: formatMessage(commonMessages.endDateTime),
        onSort: handleSort,
        formatter: toDateTime
      },
      { id: 'spacer', label: '' }
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
        dataList={campaignList}
        pagination={pagination}
        onPageChange={handlePageChange}
        sortBy={sortBy.key}
        sortOrder={sortBy.order}
        onRowClick={useCallback((id: string) => history.push(routePath.comics.campaignDetail.replace(':id', id!)), [
          history
        ])}
      />
    </>
  )
}
