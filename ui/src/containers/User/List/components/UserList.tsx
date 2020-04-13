import React, { useCallback, useMemo, useContext } from 'react'
import { useIntl } from 'react-intl'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core'
import { routePath } from '@src/common/appConfig'
import ContentHeader, { Breadcrumb } from '@src/components/ContentHeader/ContentHeader'
import ListTable from '@src/components/table/ListTable'
import Button from '@src/components/Button/Button'
import useSort from '@src/hooks/useSort'
import usePaging from '@src/hooks/usePaging'
import UserContext from '../context/UserContext'
import SearchBlock from './SearchBlock'
import { BREADCRUMBS, ListTableProp } from '../constants'
import { toListTableData } from '../../utils'
import { ReactComponent as PublishIco } from '@src/assets/common/publish.svg'
import { backgroundColorGray } from '@src/common/styles'
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
  const { sortBy, handleSort } = useSort('createDateTime')
  const { pagination, handlePageChange } = usePaging({ total: userTotal })

  const breadcrumbList: Breadcrumb[] = BREADCRUMBS.map(({ title }) => ({ title: formatMessage(title) }))
  const titleText = formatMessage(messages.userList)

  const handleSearch = useCallback((data: any) => {}, [])

  const buttonList = [
    <Button buttonText={formatMessage(commonMessages.csvExport)} icon={PublishIco} />,
    <Button
      buttonText={formatMessage(commonMessages.csvExportLogs)}
      onClick={() => {
        history.push(routePath.user.userExportLogs)
      }}
    />
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
      { id: ListTableProp.EmailAddress, label: formatMessage(messages.email) },
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
          id: user.id,
          classnames: user.status === '退会済み' ? classes.dark : undefined,
          data: toListTableData(user, ListTableProp)
        }))
        .sort((a, b) => (Date.parse(a.data[sortBy.key]) - Date.parse(b.data[sortBy.key])) * sortBy.multiplier),
    [sortBy, userList, classes.dark]
  )

  const handleRowClick = useCallback(id => history.push(routePath.user.userDetail.replace(':id', id)), [history])

  return (
    <>
      <ContentHeader breadcrumbList={breadcrumbList} titleText={titleText} />
      <SearchBlock onSubmit={handleSearch} />
      <ListTable
        tableClass={classes.table}
        theadList={theadList}
        onPageChange={handlePageChange}
        buttonList={buttonList}
        dataList={displayData}
        pagination={pagination}
        sortOrder={sortBy.order}
        sortBy={sortBy.key}
        onRowClick={handleRowClick}
      />
    </>
  )
}
