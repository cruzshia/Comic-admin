import React, { useEffect, useContext, useRef, useMemo } from 'react'
import { useIntl } from 'react-intl'
import { useParams } from 'react-router-dom'
import ContentHeader from '@src/components/ContentHeader'
import Button, { Theme } from '@src/components/Button/Button'
import { ReactComponent as IconPhone } from '@src/assets/common/phone.svg'
import { ReactComponent as IconPC } from '@src/assets/common/pc.svg'
import { submitForm } from '@src/utils/validation'
import { emptyQuestionnaire } from '@src/reducers/user/questionnaire/questionnaireReducer'
import commonMessages from '@src/messages'
import messages from '../messages'
import StickyHeader from '@src/components/StickyBar/StickyHeader'
import QuestionnaireContext, { ActionContext } from '../context/QuestionnaireContext'
import { BREADCRUMBS } from '../utils'
import QuestionnaireForm from './QuestionnaireForm'

export default function QuestionnaireEdit() {
  const { currentQuestionnaire = emptyQuestionnaire } = useContext(QuestionnaireContext)
  const { onGetQuestionnaire, onResetQuestionnaire, onUpdateQuestionnaire } = useContext(ActionContext)
  const { id } = useParams()
  const { formatMessage } = useIntl()
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    onGetQuestionnaire(id!)
    return () => onResetQuestionnaire()
  }, [onResetQuestionnaire, onGetQuestionnaire, id])

  const titleText = formatMessage(messages.creation)

  const breadcrumbList = useMemo(
    () =>
      BREADCRUMBS.map(({ title, route }) => ({
        title: formatMessage(title),
        route
      })).concat([{ title: titleText, route: undefined }]),
    [titleText, formatMessage]
  )

  const buttonList = useMemo(
    () => [
      <Button
        theme={Theme.DARK}
        buttonText={formatMessage(commonMessages.create)}
        onClick={() => submitForm(formRef)}
      />,
      <Button icon={IconPhone} theme={Theme.DARK_BORDER} buttonText={formatMessage(messages.previewPhone)} />,
      <Button icon={IconPC} theme={Theme.DARK_BORDER} buttonText={formatMessage(messages.previewPC)} />
    ],
    [formatMessage]
  )

  return (
    <>
      <StickyHeader title={titleText} button={buttonList} />
      <ContentHeader breadcrumbList={breadcrumbList} titleText={titleText} buttonList={buttonList} />
      <QuestionnaireForm
        formRef={formRef}
        onSubmit={onUpdateQuestionnaire}
        currentQuestionnaire={currentQuestionnaire}
      />
    </>
  )
}
