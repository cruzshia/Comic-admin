import React, { useContext, useMemo, useCallback, useEffect } from 'react'
import { useIntl } from 'react-intl'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core'
import Button, { Theme } from '@src/components/Button/Button'
import { ReactComponent as IconSave } from '@src/assets/form/button_save.svg'
import { ReactComponent as IconEdit } from '@src/assets/form/button_edit.svg'
import { ReactComponent as IconDownload } from '@src/assets/common/download.svg'
import ListTable from '@src/components/table/ListTable'
import ContentHeader, { Breadcrumb } from '@src/components/ContentHeader/ContentHeader'
import { routePath } from '@src/common/appConfig'
import useSort from '@src/hooks/useSort'
import usePaging from '@src/hooks/usePaging'
import commonMessages from '@src/messages'
import SearchBlock from './SearchBlock'
import { BREADCRUMBS } from '../constants'
import comicMessages from '../../messages'
import messages from '../messages'
import WorkContext, { ActionContext } from '../context/WorkContext'

const useStyle = makeStyles({
  table: {
    '& .ListTable-col-1': {
      width: 90
    }
  }
})

export default function WorkList() {
  const { formatMessage } = useIntl()
  const classes = useStyle()
  const history = useHistory()
  const { onGetWorkList } = useContext(ActionContext)
  const { workList, workTotal } = useContext(WorkContext)
  const { sortBy, handleSort } = useSort<string>('releaseDate')
  const { page, pagination, handlePageChange } = usePaging({ total: workTotal })

  useEffect(() => {
    // dispatch getAction(sortBy.key, sortBy.order, page)
    onGetWorkList()
  }, [sortBy, page, onGetWorkList])

  const breadcrumbList: Breadcrumb[] = useMemo(
    () => BREADCRUMBS.map(({ title }) => ({ title: formatMessage(title) })),
    [formatMessage]
  )
  const buttonList = useMemo(
    () => [
      <Button
        theme={Theme.DARK_BORDER}
        buttonText={formatMessage(messages.startCreate)}
        onClick={() => history.push(routePath.comics.workCreation)}
        icon={IconEdit}
      />,
      <Button
        theme={Theme.DARK_BORDER}
        buttonText={formatMessage(commonMessages.csvImport)}
        onClick={() => {}}
        icon={IconSave}
      />,
      <Button
        buttonText={formatMessage(commonMessages.csvImportLogs)}
        onClick={() => history.push(routePath.comics.workImportLogs)}
      />
    ],
    [formatMessage, history]
  )

  const handleSearch = useCallback(() => {}, [])

  const workDataList = workList
    .map(item => ({
      id: item.workID,
      data: {
        ...item,
        image: <img src={item.image} alt='work-img' />,
        spacer: ''
      }
    }))
    .sort((a: any, b: any) => a.data[sortBy.key].localeCompare(b.data[sortBy.key]) * sortBy.multiplier)

  const tableButtonList = useMemo(
    () => [
      <Button
        theme={Theme.LIGHT}
        buttonText={formatMessage(commonMessages.csvExport)}
        icon={IconDownload}
        onClick={() => history.push(routePath.comics.workExport)}
      />
    ],
    [formatMessage, history]
  )
  const theadList = useMemo(
    () => [
      { id: 'image', label: formatMessage(commonMessages.photo) },
      { id: 'workID', label: formatMessage(comicMessages.workId) },
      { id: 'title', label: formatMessage(messages.workTitle) },
      {
        id: 'releaseDate',
        label: formatMessage(commonMessages.createDateTime),
        onSort: handleSort
      },
      { id: 'category', label: formatMessage(messages.category) },
      { id: 'episodeCategory', label: formatMessage(messages.episodeCategory) },
      { id: 'updateFrequency', label: formatMessage(messages.updateFrequency) },
      { id: 'space', label: '' }
    ],
    [handleSort, formatMessage]
  )
  const handleRowClick = useCallback(id => history.push(routePath.comics.workDetail.replace(':id', id)), [history])

  return (
    <>
      <ContentHeader breadcrumbList={breadcrumbList} titleText={formatMessage(messages.list)} buttonList={buttonList} />
      <SearchBlock onSubmit={handleSearch} />
      <ListTable
        tableClass={classes.table}
        theadList={theadList}
        dataList={workDataList}
        pagination={pagination}
        onPageChange={handlePageChange}
        buttonList={tableButtonList}
        sortBy={sortBy.key}
        sortOrder={sortBy.order}
        onRowClick={handleRowClick}
      />
    </>
  )
}
