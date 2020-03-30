import React, { useMemo } from 'react'
import { useIntl } from 'react-intl'
import ContentHeader from '@src/components/ContentHeader'
import Button, { Theme } from '@src/components/Button/Button'
import { BREADCRUMBS } from '../constants'
import commonMessages from '@src/messages'
import messages from '../messages'

export default function ContentCampaignCreation() {
  const { formatMessage } = useIntl()
  const titleText = formatMessage(messages.create)
  const breadcrumbList = useMemo(
    () =>
      BREADCRUMBS.map(({ title, route }) => ({
        title: formatMessage(title),
        route
      })).concat([{ title: titleText, route: undefined }]),
    [formatMessage, titleText]
  )
  const buttonList = useMemo(() => [<Button theme={Theme.DARK} buttonText={formatMessage(commonMessages.create)} />], [
    formatMessage
  ])
  return (
    <>
      <ContentHeader breadcrumbList={breadcrumbList} titleText={titleText} buttonList={buttonList} />
      <div>ContentCampaignCreation</div>
    </>
  )
}
