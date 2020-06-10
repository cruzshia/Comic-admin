import React, { useMemo, useCallback, useContext, useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core'
import ContentHeader, { Breadcrumb } from '@src/components/ContentHeader/ContentHeader'
import ListTable from '@src/components/table/ListTable'
import Button, { Theme } from '@src/components/Button/Button'
import { ReactComponent as IconEdit } from '@src/assets/form/button_edit.svg'
import commonMessages from '@src/messages'
import usePaging from '@src/hooks/usePaging'
import { AuthorKey, ListParam } from '@src/models/comics/author'
import AuthorContext, { ActionContext } from '../context/AuthorContext'
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
  const { onGetAuthorList } = useContext(ActionContext)
  const { authorList, authorTotal } = useContext(AuthorContext)
  const classes = useStyle()
  const { formatMessage } = useIntl()
  const history = useHistory()
  const { pagination, handlePageChange, query } = usePaging({ total: authorTotal })
  const [searchParam, setSearchParam] = useState<Partial<ListParam>>({})

  useEffect(() => {
    onGetAuthorList({ ...searchParam, ...query })
  }, [onGetAuthorList, query, searchParam])

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
  const handleSearch = useCallback(({ nameId: keyword }) => {
    setSearchParam({ keyword })
  }, [])

  const theadList = useMemo(
    () => [
      { id: AuthorKey.CreateAt, label: formatMessage(commonMessages.createDateTime) },
      { id: AuthorKey.Id, label: formatMessage(commonMessages.id) },
      { id: AuthorKey.Name, label: formatMessage(commonMessages.authorName) },
      { id: 'spacer', label: '' }
    ],
    [formatMessage]
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
        dataList={authorList}
        pagination={pagination}
        onPageChange={handlePageChange}
        onRowClick={handleRowClick}
      />
    </>
  )
}
