import React, { useRef, useContext } from 'react'
import { useIntl } from 'react-intl'
import ContentHeader from '@src/components/ContentHeader'
import Button, { Theme } from '@src/components/Button/Button'
import { ReactComponent as IconPhone } from '@src/assets/common/phone.svg'
import { ReactComponent as IconPC } from '@src/assets/common/pc.svg'
import { submitForm } from '@src/utils/validation'
import { ActionContext } from '../context/QuestionnaireContext'
import QuestionnaireForm from './QuestionnaireForm'
import { BREADCRUMBS } from '../utils'
import commonMessages from '@src/messages'
import messages from '../messages'

export default function QuestionnaireCreation() {
  const { formatMessage } = useIntl()
  const formRef = useRef<HTMLFormElement>(null)
  const { onCreateQuestionnaire } = useContext(ActionContext)

  const titleText = formatMessage(messages.creation)
  const breadcrumbList = BREADCRUMBS.map(({ title, route }) => ({
    title: formatMessage(title),
    route
  })).concat([{ title: titleText, route: undefined }])

  const buttonList = [
    <Button theme={Theme.DARK} buttonText={formatMessage(commonMessages.create)} onClick={() => submitForm(formRef)} />,
    <Button icon={IconPhone} theme={Theme.DARK_BORDER} buttonText={formatMessage(messages.previewPhone)} />,
    <Button icon={IconPC} theme={Theme.DARK_BORDER} buttonText={formatMessage(messages.previewPC)} />
  ]

  return (
    <>
      <ContentHeader breadcrumbList={breadcrumbList} titleText={titleText} buttonList={buttonList} />
      <QuestionnaireForm formRef={formRef} onSubmit={onCreateQuestionnaire} />
    </>
  )
}
