import React, { useContext, useCallback, useMemo, useState } from 'react'
import { useIntl } from 'react-intl'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core'
import Checkbox from '@material-ui/core/Checkbox'
import ContentHeader, { Breadcrumb } from '@src/components/ContentHeader/ContentHeader'
import ListTable, { SortOrder, Padding } from '@src/components/table/ListTable'
import Button from '@src/components/Button/Button'
import { routePath } from '@src/common/appConfig'
import { ReactComponent as PublishIco } from '@src/assets/common/publish.svg'
import { ReactComponent as DeleteIco } from '@src/assets/common/delete.svg'
import { ReactComponent as UserIco } from '@src/assets/common/user.svg'
import { ReactComponent as CheckboxIco } from '@src/assets/common/checkbox.svg'
import Context from '../context/CommentContext'
import { COMMENT_BREADCRUMBS, ListTableProp, toListTableData } from '../utils'
import commonMessages from '@src/messages'
import userMessages from '../../messages'
import messages from '../messages'

const LIMIT = 10

const useStyle = makeStyles({
  checkbox: {
    padding: 0
  },
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
  const [page] = useState<number>(Math.ceil(commentTotal / LIMIT))
  const [sortKey, setSortKey] = useState<ListTableProp>(ListTableProp.ReportCount)
  const [order, setOrder] = useState<SortOrder>(SortOrder.Desc)
  const [checkedList, setCheckedList] = useState<{ [key: string]: boolean }>({})

  const breadcrumbList: Breadcrumb[] = COMMENT_BREADCRUMBS.map(({ title }) => ({ title: formatMessage(title) }))
  const handleSort = useCallback(
    (id: string, order?: SortOrder) => {
      setOrder(order === SortOrder.Asc ? SortOrder.Desc : SortOrder.Asc)
      setSortKey(id as ListTableProp)
    },
    [setOrder, setSortKey]
  )

  const handleStopBubble = useCallback((e: React.MouseEvent) => e.stopPropagation(), [])
  const handleRowClick = useCallback((id: string) => history.push(routePath.user.commentDetail.replace(':id', id)), [
    history
  ])
  const handleCheckAll = useCallback(
    (_: React.ChangeEvent<HTMLInputElement>, checked) =>
      setCheckedList(commentList.reduce((acc, comment) => ({ ...acc, [comment.id]: checked }), {})),
    [commentList]
  )
  const handleChecked = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, checked) => {
      setCheckedList(preCheckedList => ({
        ...preCheckedList,
        [e.currentTarget.value]: checked
      }))
    },
    [setCheckedList]
  )

  const StyledCheckBox = ({ value, checked, checkAll }: { value: string; checked?: boolean; checkAll?: boolean }) => (
    <Checkbox
      className={classes.checkbox}
      icon={<CheckboxIco />}
      color='primary'
      value={value}
      checked={checked}
      onClick={handleStopBubble}
      onChange={checkAll ? handleCheckAll : handleChecked}
    />
  )

  const theadList = useMemo(
    () => [
      { id: 'checkbox', label: <StyledCheckBox checkAll value='' />, padding: Padding.Checkbox },
      { id: ListTableProp.CreateDateTime, label: formatMessage(commonMessages.createDateTime), onSort: handleSort },
      { id: ListTableProp.UserId, label: formatMessage(userMessages.userId), onSort: handleSort },
      { id: ListTableProp.Content, label: formatMessage(messages.content), onSort: handleSort },
      { id: ListTableProp.Message, label: formatMessage(messages.message) },
      { id: ListTableProp.Likes, label: formatMessage(messages.likes), onSort: handleSort },
      { id: ListTableProp.ReportCount, label: formatMessage(messages.reportCount), onSort: handleSort },
      { id: ListTableProp.Status, label: formatMessage(messages.status) }
    ],
    [formatMessage, handleSort]
  )

  const buttonList = useMemo(
    () => [
      <Button buttonText={formatMessage(commonMessages.csvExport)} icon={PublishIco} />,
      <Button buttonText={formatMessage(commonMessages.delete)} icon={DeleteIco} />,
      <Button buttonText={formatMessage(messages.selfVisibleOnly)} icon={UserIco} />
    ],
    [formatMessage]
  )

  const displayData = useMemo(
    () =>
      commentList
        .map(comment => ({
          id: comment.id,
          data: {
            checkbox: <StyledCheckBox value={comment.id} checked={!!checkedList[comment.id]} />,
            ...toListTableData(comment)
          }
        }))
        .sort((a: any, b: any) => (a.data[sortKey] - b.data[sortKey]) * (order === SortOrder.Asc ? 1 : -1)),
    [commentList, order, sortKey, checkedList]
  )

  const pagination = useMemo(() => {
    const start = (page - 1) * LIMIT
    return {
      start: start + 1,
      total: start + displayData.length
    }
  }, [page, displayData.length])

  return (
    <>
      <ContentHeader breadcrumbList={breadcrumbList} titleText={formatMessage(messages.commentList)} />
      <ListTable
        tableClass={classes.table}
        theadList={theadList}
        dataList={displayData}
        pagination={pagination}
        buttonList={buttonList}
        sortBy={sortKey}
        sortOrder={order}
        onRowClick={handleRowClick}
      />
    </>
  )
}
