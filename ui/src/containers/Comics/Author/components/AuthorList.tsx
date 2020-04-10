import React, { useMemo, useCallback, useContext } from 'react'
import { useIntl } from 'react-intl'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core'
import ContentHeader, { Breadcrumb } from '@src/components/ContentHeader/ContentHeader'
import ListTable from '@src/components/table/ListTable'
import Button, { Theme } from '@src/components/Button/Button'
import { ReactComponent as IconEdit } from '@src/assets/form/button_edit.svg'
import commonMessages from '@src/messages'
import useSort from '@src/hooks/useSort'
import usePaging from '@src/hooks/usePaging'
import AuthorContext from '../context/AuthorContext'
import SearchBlock from './SearchBlock'
import { BREADCRUMBS } from '../utils'
import messages from '../messages'
import { routePath } from '@src/common/appConfig'

const useStyle = makeStyles({
  table: {
    '& .ListTable-col-1': {
      width: 170
    },
    '& .ListTable-col-4': {
      width: '50%'
    }
  }
})

export default function AuthorList() {
  const { authorList, authorTotal } = useContext(AuthorContext)
  const classes = useStyle()
  const { formatMessage } = useIntl()
  const history = useHistory()
  const { sortBy, handleSort } = useSort('createAt')
  const { pagination, handlePageChange } = usePaging({ total: authorTotal })
  const breadcrumbList: Breadcrumb[] = useMemo(
    () => BREADCRUMBS.map(({ title }) => ({ title: formatMessage(title) })),
    [formatMessage]
  )

  const buttonList = useMemo(
    () => [
      <Button
        theme={Theme.DARK_BORDER}
        buttonText={formatMessage(commonMessages.authorCreateStart)}
        onClick={() => history.push(routePath.comics.authorCreation)}
        icon={IconEdit}
      />
    ],
    [formatMessage, history]
  )
  const handleSearch = useCallback(() => {}, [])

  const theadList = useMemo(
    () => [
      { id: 'createAt', label: formatMessage(commonMessages.createDateTime), onSort: handleSort },
      { id: 'id', label: formatMessage(commonMessages.id) },
      { id: 'name', label: formatMessage(commonMessages.authorName) },
      { id: 'spacer', label: '' }
    ],
    [handleSort, formatMessage]
  )

  const displayData = useMemo(
    () =>
      authorList
        .map(author => ({
          id: author.id,
          data: {
            createAt: author.createAt,
            id: author.id,
            name: author.name,
            spacer: ''
          }
        }))
        .sort((a: any, b: any) => a.data[sortBy.key].localeCompare(b.data[sortBy.key]) * sortBy.multiplier),
    [authorList, sortBy]
  )
  const handleRowClick = useCallback((id: string) => history.push(routePath.comics.authorDetail.replace(':id', id)), [
    history
  ])

  return (
    <>
      <ContentHeader breadcrumbList={breadcrumbList} titleText={formatMessage(messages.list)} buttonList={buttonList} />
      <SearchBlock onSubmit={handleSearch} />
      <ListTable
        tableClass={classes.table}
        theadList={theadList}
        dataList={displayData}
        pagination={pagination}
        onPageChange={handlePageChange}
        buttonList={[]}
        sortBy={sortBy.key}
        sortOrder={sortBy.order}
        onRowClick={handleRowClick}
      />
    </>
  )
}
