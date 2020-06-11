import React, { useContext, useMemo, useCallback, useEffect, useState } from 'react'
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
import greyImg from '@src/assets/greyImg.png'
import { WorkKeys, WorkSearchKeys } from '@src/models/comics/work'
import usePaging from '@src/hooks/usePaging'
import commonMessages from '@src/messages'
import SearchBlock from './SearchBlock'
import { BREADCRUMBS, convertDateFormat } from '../utils'
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

type SearchParam = {
  [key in WorkSearchKeys]: any
}

export default function WorkList() {
  const { formatMessage } = useIntl()
  const classes = useStyle()
  const history = useHistory()
  const { onGetWorkList } = useContext(ActionContext)
  const { workList, workTotal } = useContext(WorkContext)
  const { page, pagination, handlePageChange, query } = usePaging({ total: workTotal })
  const [search, setSearch] = useState<Partial<SearchParam>>({})

  useEffect(() => {
    onGetWorkList({ ...query, ...convertDateFormat(search) })
  }, [page, onGetWorkList, query, search])

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
        onClick={() => history.push(routePath.comics.workImportCsv)}
        icon={IconSave}
      />,
      <Button
        buttonText={formatMessage(commonMessages.csvImportLogs)}
        onClick={() => history.push(routePath.comics.workImportLogs)}
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

  const workDataList = workList.map(({ images, ...item }) => ({
    ...item,
    [WorkKeys.Images]: images ? <img src={(images?.image1?.url as string) || greyImg} alt='work-img' /> : '',
    [WorkKeys.WorkType]: formatMessage(messages[item[WorkKeys.WorkType]]),
    [WorkKeys.EpisodeWorkType]: item[WorkKeys.EpisodeWorkType]
      ? formatMessage(messages[item[WorkKeys.EpisodeWorkType]!])
      : ''
  }))

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
      { id: WorkKeys.Images, label: formatMessage(commonMessages.photo) },
      { id: WorkKeys.ID, label: formatMessage(comicMessages.workId) },
      { id: WorkKeys.Title, label: formatMessage(comicMessages.workName) },
      {
        id: WorkKeys.CreateAt,
        label: formatMessage(commonMessages.createDateTime)
      },
      { id: WorkKeys.WorkType, label: formatMessage(messages.category) },
      { id: WorkKeys.EpisodeWorkType, label: formatMessage(messages.episodeCategory) },
      { id: WorkKeys.UpdateFrequency, label: formatMessage(messages.updateFrequency) },
      { id: 'spacer', label: '' }
    ],
    [formatMessage]
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
        onRowClick={handleRowClick}
      />
    </>
  )
}
