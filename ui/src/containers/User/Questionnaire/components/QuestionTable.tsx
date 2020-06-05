import React from 'react'
import { useIntl } from 'react-intl'
import DataTable, { toDataSet, toPreWrapDataSet } from '@src/components/table/DataTable'
import messages from '../messages'

export default function QuestionTable({ question }: { question: any }) {
  const { formatMessage } = useIntl()

  return (
    <DataTable
      dataSet={[
        toPreWrapDataSet(formatMessage(messages.questionContent), question.content),
        toDataSet(formatMessage(messages.answerRequired), question.required),
        toDataSet(formatMessage(messages.questionType), question.type),
        ...(question.line ? [toPreWrapDataSet(formatMessage(messages.line), question.line)] : []),
        ...(question.option ? [toPreWrapDataSet(formatMessage(messages.option), question.option)] : []),
        ...(question.shuffle ? [toDataSet(formatMessage(messages.optionShuffle), question.shuffle)] : []),
        ...(question.limitation
          ? [toPreWrapDataSet(formatMessage(messages.answerLimitation), question.limitation)]
          : []),
        ...(question.inputRange ? [toDataSet(formatMessage(messages.inputRange), question.inputRange)] : [])
      ]}
      innerTable
    />
  )
}
