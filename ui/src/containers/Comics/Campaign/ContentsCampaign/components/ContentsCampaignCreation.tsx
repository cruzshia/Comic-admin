import React, { useMemo, useCallback, useRef } from 'react'
import { useIntl } from 'react-intl'
import { useParams } from 'react-router-dom'
import ContentHeader from '@src/components/ContentHeader'
import StickyHeader from '@src/components/StickyBar/StickyHeader'
import Button, { Theme } from '@src/components/Button/Button'
import { BREADCRUMBS } from '../constants'
import ContentsCampaignForm from './ContentsCampaignForm'
import commonMessages from '@src/messages'
import messages from '../messages'

export default function ContentCampaignCreation() {
  const { formatMessage } = useIntl()
  const formRef = useRef<HTMLFormElement>(null)
  const { campaignId } = useParams()
  const titleText = formatMessage(messages.create)
  const breadcrumbList = useMemo(
    () =>
      BREADCRUMBS.map(({ title, route }) => ({
        title: formatMessage(title),
        route: route?.replace(':id', campaignId!)
      })).concat([{ title: titleText, route: undefined }]),
    [formatMessage, titleText, campaignId]
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
      <StickyHeader title={titleText} button={buttonList} />
      <ContentHeader breadcrumbList={breadcrumbList} titleText={titleText} buttonList={buttonList} />
      <ContentsCampaignForm onSubmit={handleSubmit} formRef={formRef} />
    </>
  )
}
