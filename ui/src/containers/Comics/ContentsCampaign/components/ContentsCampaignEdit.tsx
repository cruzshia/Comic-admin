import React, { useMemo, useCallback, useRef } from 'react'
import { useIntl } from 'react-intl'
import ContentHeader from '@src/components/ContentHeader'
import Button, { Theme } from '@src/components/Button/Button'
import ContentsCampaignForm from './ContentsCampaignForm'
import { BREADCRUMBS } from '../constants'
import commonMessages from '@src/messages'
import messages from '../messages'

export default function ContentsCampaignEdit() {
  const { formatMessage } = useIntl()
  const formRef = useRef<HTMLFormElement>(null)
  const titleText = formatMessage(messages.create)
  const breadcrumbList = useMemo(
    () =>
      BREADCRUMBS.map(({ title, route }) => ({
        title: formatMessage(title),
        route
      })).concat([{ title: titleText, route: undefined }]),
    [formatMessage, titleText]
  )
  const buttonList = useMemo(
    () => [
      <Button
        theme={Theme.DARK}
        buttonText={formatMessage(commonMessages.create)}
        onClick={() => formRef.current?.dispatchEvent(new Event('submit', { cancelable: true }))}
      />
    ],
    [formatMessage]
  )
  const handleSubmit = useCallback(data => console.log(data), [])

  return (
    <>
      <ContentHeader breadcrumbList={breadcrumbList} titleText={titleText} buttonList={buttonList} />
      <ContentsCampaignForm onSubmit={handleSubmit} formRef={formRef} />
    </>
  )
}
