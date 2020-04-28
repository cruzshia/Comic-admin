import React, { useMemo, useRef, useContext } from 'react'
import { useIntl } from 'react-intl'
import Button, { Theme } from '@src/components/Button/Button'
import ContentHeader from '@src/components/ContentHeader'
import { submitForm } from '@src/utils/validation'
import { BREADCRUMBS } from '../constants'
import ApplicationInfoForm from './ApplicationInfoForm'
import messages from '../messages'
import commonMessages from '@src/messages'
import { ActionContext } from '../context/ApplicationInfoContext'

export default function ApplicationInfoCreation() {
  const { formatMessage } = useIntl()
  const formRef = useRef<HTMLFormElement>(null)
  const { onCreateApplicationInfo } = useContext(ActionContext)

  const breadcrumbList = useMemo(
    () =>
      BREADCRUMBS.map(({ title, route }) => ({ title: formatMessage(title), route })).concat([
        {
          title: formatMessage(messages.creation),
          route: undefined
        }
      ]),
    [formatMessage]
  )

  const buttonList = useMemo(
    () => [
      <Button
        theme={Theme.DARK}
        buttonText={formatMessage(commonMessages.create)}
        onClick={() => submitForm(formRef)}
      />
    ],
    [formatMessage]
  )

  return (
    <>
      <ContentHeader
        breadcrumbList={breadcrumbList}
        titleText={formatMessage(messages.creation)}
        buttonList={buttonList}
      />
      <ApplicationInfoForm onSubmit={onCreateApplicationInfo} formRef={formRef} />
    </>
  )
}
