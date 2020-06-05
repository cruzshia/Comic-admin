import React, { useMemo, useCallback, useContext, useEffect } from 'react'
import { useIntl } from 'react-intl'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core'
import Button, { Theme } from '@src/components/Button/Button'
import { ReactComponent as IconEdit } from '@src/assets/form/button_edit.svg'
import { routePath } from '@src/common/appConfig'
import usePaging from '@src/hooks/usePaging'
import ListTable from '@src/components/table/ListTable'
import HeadBlock from './HeadBlock'
import SearchBlock from './SearchBlock'
import messages from '../messages'
import QuestionnaireContext, { ActionContext } from '../context/QuestionnaireContext'

const useStyle = makeStyles(() => ({
  table: {
    '& .ListTable-col-1': {
      width: 180
    },
    '& .ListTable-col-3, .ListTable-col-4': {
      width: 150
    }
  }
}))

export default function QuestionnaireList() {
  const { questionnaireList, questionnaireTotal } = useContext(QuestionnaireContext)
  const { onGetQuestionnaireList } = useContext(ActionContext)
  const classes = useStyle()
  const { formatMessage } = useIntl()
  const history = useHistory()
  const { pagination, handlePageChange } = usePaging({ total: questionnaireTotal })

  useEffect(() => {
    onGetQuestionnaireList()
  }, [onGetQuestionnaireList])

  const buttonList = useMemo(
    () => [
      <Button
        theme={Theme.DARK_BORDER}
        buttonText={formatMessage(messages.startCreate)}
        onClick={() => history.push(routePath.user.questionnaireCreation)}
        icon={IconEdit}
      />
    ],
    [formatMessage, history]
  )

  const handleSearch = useCallback(() => {}, [])

  const theadList = useMemo(
    () => [
      { id: 'id', label: formatMessage(messages.questionId) },
      { id: 'name', label: formatMessage(messages.name) },
      { id: 'answerStartTime', label: formatMessage(messages.answerStartTime) },
      { id: 'answerEndTime', label: formatMessage(messages.answerEndTime) },
      { id: 'answerReward', label: formatMessage(messages.answerReward) },
      { id: 'spacer', label: '' }
    ],
    [formatMessage]
  )

  return (
    <div>
      <HeadBlock title={formatMessage(messages.questionnaireList)} buttonList={buttonList} />
      <SearchBlock onSubmit={handleSearch} />
      <ListTable
        tableClass={classes.table}
        theadList={theadList}
        dataList={questionnaireList}
        pagination={pagination}
        onPageChange={handlePageChange}
        onRowClick={useCallback((id: string) => history.push(routePath.user.questionnaireDetail.replace(':id', id!)), [
          history
        ])}
      />
    </div>
  )
}
