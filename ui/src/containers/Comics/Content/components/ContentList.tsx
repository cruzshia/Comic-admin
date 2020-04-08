import React, { useMemo, useCallback, useContext, useState, useEffect } from 'react'
import { useIntl } from 'react-intl'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core'
import ContentHeader from '@src/components/ContentHeader'
import Button, { Theme } from '@src/components/Button/Button'
import ListTable from '@src/components/table/ListTable'
import { ReactComponent as IconEdit } from '@src/assets/form/button_edit.svg'
import { ReactComponent as IconSave } from '@src/assets/form/button_save.svg'
import { ReactComponent as IconPublish } from '@src/assets/common/publish.svg'
import { routePath } from '@src/common/appConfig'
import { PAGE_LIMIT } from '@src/common/constants'
import useSort from '@src/hooks/useSort'
import commonMessages from '@src/messages'
import messages from '../messages'
import comicMessages from '../../messages'
import { CONTENT_BREADCRUMBS } from '../constants'
import ContentContext from '../context/ContentContext'
import SearchBlock from './SearchBlock'

const useStyle = makeStyles(() => ({
  table: {
    '& .ListTable-col-1': {
      width: 90
    }
  }
}))

export default function ContentList() {
  const history = useHistory()
  const { formatMessage } = useIntl()
  const classes = useStyle()
  const { contentList, totalContent } = useContext(ContentContext)
  const { sortBy, handleSort } = useSort<string>('createAt')
  const [page, setPage] = useState<number>(1)

  useEffect(() => {
    // dispatch get action
  }, [sortBy, page])

  const handleSearch = useCallback(() => {}, [])
  const breadcrumbList = useMemo(() => CONTENT_BREADCRUMBS.map(({ title }) => ({ title: formatMessage(title) })), [
    formatMessage
  ])
  const buttonList = useMemo(
    () => [
      <Button
        theme={Theme.DARK_BORDER}
        icon={IconEdit}
        buttonText={formatMessage(messages.startCreate)}
        onClick={() => {
          history.push(routePath.comics.contentCreation)
        }}
      />,
      <Button
        theme={Theme.DARK_BORDER}
        icon={IconSave}
        buttonText={formatMessage(commonMessages.csvImport)}
        onClick={() => {}}
      />
    ],
    [formatMessage, history]
  )

  const theadList = useMemo(
    () => [
      { id: 'image', label: formatMessage(commonMessages.photo) },
      { id: 'contentId', label: formatMessage(comicMessages.contentId) },
      { id: 'title', label: formatMessage(messages.title) },
      { id: 'category', label: formatMessage(messages.category) },
      { id: 'price', label: formatMessage(comicMessages.contentPrice) },
      { id: 'campaignPrice', label: formatMessage(comicMessages.campaignPrice) },
      { id: 'sort', label: formatMessage(messages.sort) },
      { id: 'createAt', label: formatMessage(commonMessages.createDateTime), onSort: handleSort },
      { id: 'spacer', label: '' }
    ],
    [formatMessage, handleSort]
  )

  const dataList = contentList.map(content => ({
    id: content.contentId,
    data: {
      ...content,
      image: <img src={content.image} alt='content img' />,
      spacer: ''
    }
  }))

  const handlePageChange = useCallback((_, page) => setPage(page), [setPage])
  const pagination = useMemo(
    () => ({
      start: (page - 1) * PAGE_LIMIT + 1,
      total: totalContent
    }),
    [page, totalContent]
  )

  const tableButtonList = useMemo(
    () => [
      <Button
        theme={Theme.LIGHT}
        buttonText={formatMessage(commonMessages.csvExport)}
        icon={IconPublish}
        onClick={() => {}}
      />
    ],
    [formatMessage]
  )

  return (
    <>
      <ContentHeader
        breadcrumbList={breadcrumbList}
        titleText={formatMessage(messages.management)}
        buttonList={buttonList}
      />
      <SearchBlock onSubmit={handleSearch} />
      <ListTable
        tableClass={classes.table}
        theadList={theadList}
        dataList={dataList}
        pagination={pagination}
        onPageChange={handlePageChange}
        buttonList={tableButtonList}
        sortBy={sortBy.key}
        sortOrder={sortBy.order}
      />
    </>
  )
}
