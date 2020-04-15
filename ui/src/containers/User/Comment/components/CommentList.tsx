import React, { useContext, useCallback, useMemo } from 'react'
import { useIntl } from 'react-intl'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core'
import ContentHeader, { Breadcrumb } from '@src/components/ContentHeader/ContentHeader'
import ListTable, { Padding } from '@src/components/table/ListTable'
import Button from '@src/components/Button/Button'
import { StyledCheckBox } from '@src/components/form'
import { routePath } from '@src/common/appConfig'
import { ReactComponent as PublishIco } from '@src/assets/common/publish.svg'
import { ReactComponent as DeleteIco } from '@src/assets/common/delete.svg'
import { ReactComponent as UserIco } from '@src/assets/common/user.svg'
import { useSort, usePaging, useCheckbox } from '@src/hooks'
import Context from '../context/CommentContext'
import { COMMENT_BREADCRUMBS, ListTableProp } from '../utils'
import { toListTableData } from '../../utils'
import commonMessages from '@src/messages'
import userMessages from '../../messages'
import messages from '../messages'
import SearchBlock from './SearchBlock'

const useStyle = makeStyles({
  table: {
    '& .ListTable-col-2': {
      width: 140
    },
    '& .ListTable-col-5': {
      width: '28%'
    },
    '& .ListTable-col-6, .ListTable-col-7, .ListTable-col-8': {
      width: 100
    }
  }
})
export default function CommentList() {
  const history = useHistory()
  const classes = useStyle()
  const { formatMessage } = useIntl()
  const { commentList, commentTotal } = useContext(Context)
  const { sortBy, handleSort } = useSort(ListTableProp.Report)
  const { pagination, handlePageChange } = usePaging({ total: commentTotal })
  const { onCheckAll, handleCheck, checkedList, isChecked } = useCheckbox()

  const breadcrumbList: Breadcrumb[] = COMMENT_BREADCRUMBS.map(({ title }) => ({ title: formatMessage(title) }))

  const handleRowClick = useCallback((id: string) => history.push(routePath.user.commentDetail.replace(':id', id)), [
    history
  ])

  const displayData = useMemo(
    () =>
      commentList
        .map(comment => ({
          id: comment.id,
          data: {
            checkbox: <StyledCheckBox value={comment.id} checked={isChecked(comment.id)} onCheck={handleCheck} />,
            ...toListTableData(comment, ListTableProp)
          }
        }))
        .sort((a: any, b: any) => (a.data[sortBy.key] - b.data[sortBy.key]) * sortBy.multiplier),
    [commentList, sortBy, isChecked, handleCheck]
  )

  const handleCheckAll = useCallback(() => onCheckAll(displayData), [onCheckAll, displayData])
  const theadList = useMemo(
    () => [
      {
        id: 'checkbox',
        label: <StyledCheckBox value='' onCheck={handleCheckAll} />,
        padding: Padding.Checkbox
      },
      { id: ListTableProp.CreateDateTime, label: formatMessage(commonMessages.createDateTime), onSort: handleSort },
      { id: ListTableProp.UserId, label: formatMessage(userMessages.userId), onSort: handleSort },
      { id: ListTableProp.Content, label: formatMessage(messages.content), onSort: handleSort },
      { id: ListTableProp.Message, label: formatMessage(commonMessages.message) },
      { id: ListTableProp.Likes, label: formatMessage(messages.likes), onSort: handleSort },
      { id: ListTableProp.Report, label: formatMessage(messages.report), onSort: handleSort },
      { id: ListTableProp.Status, label: formatMessage(userMessages.status) }
    ],
    [formatMessage, handleSort, handleCheckAll]
  )

  const buttonList = useMemo(
    () => [
      <Button buttonText={formatMessage(commonMessages.csvExport)} icon={PublishIco} />,
      <Button
        buttonText={formatMessage(commonMessages.delete)}
        icon={DeleteIco}
        onClick={() => console.log(checkedList)}
      />,
      <Button buttonText={formatMessage(messages.selfVisibleOnly)} icon={UserIco} />
    ],
    [formatMessage, checkedList]
  )
  const handleSearch = useCallback((data: any) => {}, [])

  return (
    <>
      <ContentHeader breadcrumbList={breadcrumbList} titleText={formatMessage(messages.commentList)} />
      <SearchBlock onSubmit={handleSearch} />
      <ListTable
        tableClass={classes.table}
        theadList={theadList}
        dataList={displayData}
        pagination={pagination}
        onPageChange={handlePageChange}
        buttonList={buttonList}
        sortBy={sortBy.key}
        sortOrder={sortBy.order}
        onRowClick={handleRowClick}
      />
    </>
  )
}
