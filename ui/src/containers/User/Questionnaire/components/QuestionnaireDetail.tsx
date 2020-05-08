import React, { useMemo, useCallback, useContext, useEffect } from 'react'
import { useIntl } from 'react-intl'
import { useHistory, useParams } from 'react-router-dom'
import Button, { Theme } from '@src/components/Button/Button'
import { ReactComponent as IconEdit } from '@src/assets/form/button_edit.svg'
import { ReactComponent as IconPC } from '@src/assets/common/pc.svg'
import { ReactComponent as IconPhone } from '@src/assets/common/phone.svg'
import { routePath, ANCHOR_QUERY } from '@src/common/appConfig'
import DataTable, { toDataSet, toPreWrapDataSet } from '@src/components/table/DataTable'
import { emptyQuestionnaire } from '@src/reducers/user/questionnaire/questionnaireReducer'
import commonMessages from '@src/messages'
import QuestionTable from './QuestionTable'
import QuestionnaireContext, { ActionContext } from '../context/QuestionnaireContext'
import HeadBlock from './HeadBlock'
import messages from '../messages'

export default function QuestionnaireDetail() {
  const history = useHistory()
  const { formatMessage } = useIntl()
  const { currentQuestionnaire = emptyQuestionnaire } = useContext(QuestionnaireContext)
  const { onGetQuestionnaire, onResetQuestionnaire } = useContext(ActionContext)
  const { id } = useParams()

  useEffect(() => {
    onGetQuestionnaire(id!)
    return () => onResetQuestionnaire()
  }, [onResetQuestionnaire, onGetQuestionnaire, id])

  const handleRedirect = useCallback(
    (target?: string) =>
      history.push(routePath.user.questionnaireEdit.replace(':id', id!) + (target ? `?${ANCHOR_QUERY}=${target}` : '')),
    [history, id]
  )
  const buttonList = useMemo(
    () => [
      <Button
        theme={Theme.DARK_BORDER}
        buttonText={formatMessage(messages.startEdit)}
        onClick={() => handleRedirect()}
        icon={IconEdit}
      />,
      <Button
        theme={Theme.DARK_BORDER}
        buttonText={formatMessage(messages.previewPhone)}
        onClick={() => {}}
        icon={IconPhone}
      />,
      <Button
        theme={Theme.DARK_BORDER}
        buttonText={formatMessage(messages.previewPC)}
        onClick={() => {}}
        icon={IconPC}
      />
    ],
    [formatMessage, handleRedirect]
  )
  const title = formatMessage(messages.detail)

  return (
    <>
      <HeadBlock breadcrumb={title} title={title} buttonList={buttonList} />
      <DataTable
        title={formatMessage(commonMessages.basicInfo)}
        dataSet={[
          toDataSet(formatMessage(messages.id), currentQuestionnaire.id),
          toDataSet(formatMessage(messages.name), currentQuestionnaire.name),
          toDataSet(formatMessage(messages.category), currentQuestionnaire.category),
          toDataSet(formatMessage(commonMessages.contentId), currentQuestionnaire.content),
          toDataSet(formatMessage(commonMessages.contentName), currentQuestionnaire.contentName),
          toDataSet(formatMessage(messages.answerReward), currentQuestionnaire.answerReward),
          toDataSet(formatMessage(messages.externalUrl), currentQuestionnaire.externalUrl),
          toDataSet(formatMessage(messages.bannerUrl), currentQuestionnaire.bannerUrl),
          toDataSet(formatMessage(messages.descriptionTitle), currentQuestionnaire.descriptionTitle),
          toPreWrapDataSet(formatMessage(commonMessages.introduction), currentQuestionnaire.description),
          toPreWrapDataSet(formatMessage(messages.footer), currentQuestionnaire.footer),
          toPreWrapDataSet(formatMessage(messages.answerCompletedMessage), currentQuestionnaire.answerCompletedMessage),
          toDataSet(formatMessage(messages.questionnaireResponse), currentQuestionnaire.response),
          toDataSet(formatMessage(commonMessages.createDateTime), currentQuestionnaire.createAt)
        ]}
        marginBottom
      />
      <DataTable
        title={formatMessage(commonMessages.deliveryDuration)}
        dataSet={[
          toDataSet(formatMessage(messages.answerStartTime), currentQuestionnaire.answerStartTime),
          toDataSet(formatMessage(messages.answerEndTime), currentQuestionnaire.answerEndTime)
        ]}
        marginBottom
      />
      <DataTable
        title={formatMessage(messages.question)}
        dataSet={currentQuestionnaire.questions.map((question: any, idx: number) => ({
          label: `${formatMessage(messages.question)}${idx + 1}`,
          content: <QuestionTable question={question} />
        }))}
      />
    </>
  )
}
