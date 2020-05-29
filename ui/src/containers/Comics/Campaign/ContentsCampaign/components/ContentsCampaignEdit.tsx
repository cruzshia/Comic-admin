import React, { useMemo, useCallback, useRef, useEffect, useContext } from 'react'
import { useIntl } from 'react-intl'
import { useParams } from 'react-router-dom'
import ContentHeader from '@src/components/ContentHeader'
import StickyHeader from '@src/components/StickyBar/StickyHeader'
import Button, { Theme } from '@src/components/Button/Button'
import ContentsCampaignForm from './ContentsCampaignForm'
import { BREADCRUMBS } from '../constants'
import ContentsCampaignContext, { ActionContext } from '../context/ContentsCampaignContext'
import commonMessages from '@src/messages'
import messages from '../messages'

export default function ContentsCampaignEdit() {
  const { formatMessage } = useIntl()
  const { currentContentCampaign = {} } = useContext(ContentsCampaignContext)
  const { onGetContentCampaign, onResetContentCampaign } = useContext(ActionContext)
  const formRef = useRef<HTMLFormElement>(null)
  const { id, campaignId } = useParams()

  useEffect(() => {
    onGetContentCampaign(id!)
    return () => onResetContentCampaign()
  }, [onResetContentCampaign, onGetContentCampaign, id])

  const titleText = formatMessage(messages.edit)
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
      <ContentsCampaignForm onSubmit={handleSubmit} formRef={formRef} contentCampaign={currentContentCampaign} />
    </>
  )
}
