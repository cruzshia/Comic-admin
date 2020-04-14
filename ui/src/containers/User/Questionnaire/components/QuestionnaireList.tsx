import React, { useMemo, useCallback, useContext } from 'react'
import { useIntl } from 'react-intl'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core'
import Button, { Theme } from '@src/components/Button/Button'
import { ReactComponent as IconEdit } from '@src/assets/form/button_edit.svg'
import { routePath } from '@src/common/appConfig'
import useSort from '@src/hooks/useSort'
import usePaging from '@src/hooks/usePaging'
import ListTable from '@src/components/table/ListTable'
import HeadBlock from './HeadBlock'
import SearchBlock from './SearchBlock'
import commonMessages from '@src/messages'
import messages from '../messages'
import QuestionnaireContext from '../context/QuestionnaireContext'

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
  const classes = useStyle()
  const { formatMessage } = useIntl()
  const history = useHistory()
  const { sortBy, handleSort } = useSort('deliverStart')
  const { pagination, handlePageChange } = usePaging({ total: questionnaireTotal })
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
      { id: 'id', label: formatMessage(messages.id) },
      { id: 'name', label: formatMessage(messages.name) },
      { id: 'deliverStart', label: formatMessage(commonMessages.deliveryStartDateTime), onSort: handleSort },
      { id: 'deliverEnd', label: formatMessage(commonMessages.deliveryEndStartTime) },
      { id: 'answerReward', label: formatMessage(messages.answerReward) },
      { id: 'spacer', label: '' }
    ],
    [formatMessage, handleSort]
  )

  const dataList = questionnaireList
    .map(questionnaire => ({
      id: questionnaire.id,
      data: {
        ...questionnaire,
        spacer: ''
      }
    }))
    .sort((a: any, b: any) => a.data[sortBy.key].localeCompare(b.data[sortBy.key]) * sortBy.multiplier)

  return (
    <div>
      <HeadBlock title={formatMessage(messages.questionnaireList)} buttonList={buttonList} />
      <SearchBlock onSubmit={handleSearch} />
      <ListTable
        tableClass={classes.table}
        theadList={theadList}
        dataList={dataList}
        pagination={pagination}
        onPageChange={handlePageChange}
        sortBy={sortBy.key}
        sortOrder={sortBy.order}
        onRowClick={useCallback((id: string) => history.push(routePath.user.questionnaireDetail.replace(':id', id!)), [
          history
        ])}
      />
    </div>
  )
}
