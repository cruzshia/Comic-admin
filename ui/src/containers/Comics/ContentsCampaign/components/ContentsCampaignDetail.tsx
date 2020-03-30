import React, { useMemo } from 'react'
import { useIntl } from 'react-intl'
import ContentHeader from '@src/components/ContentHeader'
import Button, { Theme } from '@src/components/Button/Button'
import { ReactComponent as IconEdit } from '@src/assets/form/button_edit.svg'
import { BREADCRUMBS } from '../constants'
import messages from '../messages'

export default function ContentCampaignDetail() {
  const { formatMessage } = useIntl()
  const titleText = formatMessage(messages.detail)
  const breadcrumbList = useMemo(
    () =>
      BREADCRUMBS.map(({ title, route }) => ({
        title: formatMessage(title),
        route
      })).concat([{ title: titleText, route: undefined }]),
    [formatMessage, titleText]
  )
  const buttonList = useMemo(
    () => [<Button theme={Theme.DARK_BORDER} icon={IconEdit} buttonText={formatMessage(messages.edit)} />],
    [formatMessage]
  )
  return (
    <>
      <ContentHeader breadcrumbList={breadcrumbList} titleText={titleText} buttonList={buttonList} />
      <div>ContentCampaignDetail</div>
    </>
  )
}
