import React, { useMemo } from 'react'
import { useIntl } from 'react-intl'
import ContentHeader from '@src/components/ContentHeader'
import Button, { Theme } from '@src/components/Button/Button'
import commonMessages from '@src/messages'
import { CONTENT_BREADCRUMBS } from '../constants'
import messages from '../messages'

export default function ContentCreation() {
  const { formatMessage } = useIntl()

  const titleText = formatMessage(messages.startCreate)
  const breadcrumbList = useMemo(
    () =>
      CONTENT_BREADCRUMBS.map(({ title, route }) => ({
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
      <div>ContentCreation</div>
    </>
  )
}
