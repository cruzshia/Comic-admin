import React, { useContext, useCallback, useMemo, useEffect } from 'react'
import { useIntl } from 'react-intl'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core'
import ContentHeader, { Breadcrumb } from '@src/components/ContentHeader/ContentHeader'
import ListTable, { Padding } from '@src/components/table/ListTable'
import Button from '@src/components/Button/Button'
import { StyledCheckBox } from '@src/components/form'
import { routePath } from '@src/common/appConfig'
import { ReactComponent as DownloadIco } from '@src/assets/common/download.svg'
import { ReactComponent as DeleteIco } from '@src/assets/common/delete.svg'
import { ReactComponent as UserIco } from '@src/assets/common/user.svg'
import { usePaging, useCheckbox } from '@src/hooks'
import Context, { ActionContext } from '../context/CommentContext'
import { COMMENT_BREADCRUMBS, ListTableProp } from '../utils'
import commonMessages from '@src/messages'
import userMessages from '../../messages'
import messages from '../messages'
import SearchBlock from './SearchBlock'
import { successSubject } from '@src/utils/responseSubject'
import { CommentActionType } from '@src/reducers/user/comment/commentAction'

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
  const { onGetCommentList, onDeleteComment } = useContext(ActionContext)
  const { pagination, handlePageChange } = usePaging({ total: commentTotal })
  const { onCheckAll, handleCheck, checkedList, isChecked, onResetCheck, isCheckAll } = useCheckbox()

  useEffect(() => {
    onGetCommentList()
  }, [onGetCommentList])

  useEffect(() => {
    const subscription = successSubject.subscribe([CommentActionType.DELETE_SUCCESS], () => {
      onResetCheck()
      onGetCommentList()
    })
    return () => subscription.unsubscribe()
  }, [onGetCommentList, onResetCheck])

  useEffect(() => {
    onGetCommentList()
  }, [onGetCommentList])

  const breadcrumbList: Breadcrumb[] = COMMENT_BREADCRUMBS.map(({ title }) => ({ title: formatMessage(title) }))

  const handleRowClick = useCallback((id: string) => history.push(routePath.user.commentDetail.replace(':id', id)), [
    history
  ])

  const displayData = useMemo(
    () =>
      commentList.map(comment => ({
        ...comment,
        checkbox: <StyledCheckBox value={comment.id} checked={isChecked(comment.id)} onCheck={handleCheck} />
      })),
    [commentList, isChecked, handleCheck]
  )

  const handleCheckAll = useCallback(() => onCheckAll(displayData), [onCheckAll, displayData])
  const theadList = useMemo(
    () => [
      {
        id: 'checkbox',
        label: <StyledCheckBox value='' onCheck={handleCheckAll} checked={isCheckAll} />,
        padding: Padding.Checkbox
      },
      { id: ListTableProp.CreateDateTime, label: formatMessage(commonMessages.createDateTime) },
      { id: ListTableProp.UserId, label: formatMessage(userMessages.userId) },
      { id: ListTableProp.Content, label: formatMessage(messages.content) },
      { id: ListTableProp.Message, label: formatMessage(commonMessages.message) },
      { id: ListTableProp.Likes, label: formatMessage(messages.likes) },
      { id: ListTableProp.Report, label: formatMessage(messages.report) },
      { id: ListTableProp.Status, label: formatMessage(userMessages.status) }
    ],
    [formatMessage, handleCheckAll, isCheckAll]
  )

  const buttonList = useMemo(
    () =>
      Object.keys(checkedList).length === 0
        ? [<Button buttonText={formatMessage(commonMessages.csvExport)} icon={DownloadIco} />]
        : [
            <Button buttonText={formatMessage(commonMessages.csvExport)} icon={DownloadIco} />,
            <Button
              buttonText={formatMessage(commonMessages.delete)}
              icon={DeleteIco}
              onClick={() => onDeleteComment(checkedList)}
            />,
            <Button buttonText={formatMessage(messages.selfVisibleOnly)} icon={UserIco} />
          ],
    [formatMessage, checkedList, onDeleteComment]
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
        onRowClick={handleRowClick}
      />
    </>
  )
}
