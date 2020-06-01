import React, { useMemo, useRef, useContext } from 'react'
import { useIntl } from 'react-intl'
import Button, { Theme } from '@src/components/Button/Button'
import ContentHeader from '@src/components/ContentHeader'
import StickyHeader from '@src/components/StickyBar/StickyHeader'
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

  const title = useMemo(() => formatMessage(messages.creation), [formatMessage])

  const breadcrumbList = useMemo(
    () =>
      BREADCRUMBS.map(({ title, route }) => ({ title: formatMessage(title), route })).concat([
        {
          title: title,
          route: undefined
        }
      ]),
    [formatMessage, title]
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
      <ContentHeader breadcrumbList={breadcrumbList} titleText={title} buttonList={buttonList} />
      <StickyHeader title={title} button={buttonList} />
      <ApplicationInfoForm onSubmit={onCreateApplicationInfo} formRef={formRef} />
    </>
  )
}
