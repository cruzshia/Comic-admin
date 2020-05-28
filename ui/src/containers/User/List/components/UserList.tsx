import React, { useCallback, useMemo, useContext, useEffect } from 'react'
import { useIntl } from 'react-intl'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core'
import { routePath } from '@src/common/appConfig'
import ContentHeader, { Breadcrumb } from '@src/components/ContentHeader/ContentHeader'
import ListTable from '@src/components/table/ListTable'
import Button, { Theme } from '@src/components/Button/Button'
import { useSort, usePaging } from '@src/hooks'
import { ReactComponent as SaveIcon } from '@src/assets/form/button_save.svg'
import { ReactComponent as DownloadIcon } from '@src/assets/common/download.svg'
import { backgroundColorGray } from '@src/common/styles'
import UserContext, { ActionContext } from '../context/UserContext'
import SearchBlock from './SearchBlock'
import { BREADCRUMBS, ListTableProp } from '../constants'
import commonMessages from '@src/messages'
import userMessages from '../../messages'
import messages from '../messages'

const useStyles = makeStyles({
  table: {
    '& .ListTable-col-3': {
      width: 260
    },
    '& .ListTable-col-4': {
      width: 220
    },
    '& .ListTable-col-5': {
      width: 180
    }
  },
  dark: {
    backgroundColor: backgroundColorGray
  }
})

export default function UserList() {
  const classes = useStyles()
  const { formatMessage } = useIntl()
  const history = useHistory()
  const { userList, userTotal } = useContext(UserContext)
  const { onGetUserList } = useContext(ActionContext)
  const { sortBy, handleSort } = useSort('createDateTime')
  const { pagination, handlePageChange } = usePaging({ total: userTotal })

  useEffect(() => {
    onGetUserList()
  }, [sortBy, onGetUserList])

  const breadcrumbList: Breadcrumb[] = BREADCRUMBS.map(({ title }) => ({ title: formatMessage(title) }))
  const titleText = formatMessage(userMessages.list)

  const handleSearch = useCallback((data: any) => {}, [])

  const buttonList = useMemo(
    () => [
      <Button
        buttonText={formatMessage(commonMessages.csvImport)}
        theme={Theme.DARK_BORDER}
        icon={SaveIcon}
        onClick={() => history.push(routePath.user.userCsvImport)}
      />,
      <Button
        buttonText={formatMessage(commonMessages.csvImportLogs)}
        onClick={() => history.push(routePath.user.userImportLogs)}
      />
    ],
    [formatMessage, history]
  )

  const tableButtonList = [
    <Button
      buttonText={formatMessage(commonMessages.csvExportLogs)}
      onClick={() => {
        history.push(routePath.user.userExportLogs)
      }}
    />,
    <Button buttonText={formatMessage(commonMessages.csvExport)} icon={DownloadIcon} />
  ]
  const theadList = useMemo(
    () => [
      {
        id: ListTableProp.CreateDateTime,
        label: formatMessage(commonMessages.createDateTime),
        onSort: handleSort
      },
      {
        id: ListTableProp.LastLoginTime,
        label: formatMessage(messages.lastLoginTime),
        onSort: handleSort
      },
      { id: ListTableProp.EmailAddress, label: formatMessage(commonMessages.email) },
      { id: ListTableProp.NickName, label: formatMessage(messages.nickName) },
      { id: ListTableProp.UserId, label: formatMessage(userMessages.userId) },
      { id: ListTableProp.Status, label: formatMessage(userMessages.status) }
    ],
    [formatMessage, handleSort]
  )
  const displayData = useMemo(
    () =>
      userList
        .map(user => ({
          ...user,
          classnames: user.status === '退会済み' ? classes.dark : undefined
        }))
        .sort((a, b) => (Date.parse(a[sortBy.key]) - Date.parse(b[sortBy.key])) * sortBy.multiplier),
    [sortBy, userList, classes.dark]
  )

  const handleRowClick = useCallback(id => history.push(routePath.user.userDetail.replace(':id', id)), [history])

  return (
    <>
      <ContentHeader breadcrumbList={breadcrumbList} titleText={titleText} buttonList={buttonList} />
      <SearchBlock onSubmit={handleSearch} />
      <ListTable
        tableClass={classes.table}
        theadList={theadList}
        onPageChange={handlePageChange}
        buttonList={tableButtonList}
        dataList={displayData}
        pagination={pagination}
        sortOrder={sortBy.order}
        sortBy={sortBy.key}
        onRowClick={handleRowClick}
      />
    </>
  )
}
