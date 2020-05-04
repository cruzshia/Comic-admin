import React, { useMemo, useRef, useContext } from 'react'
import { useIntl } from 'react-intl'
import ContentHeader, { Breadcrumb } from '@src/components/ContentHeader/ContentHeader'
import Button, { Theme } from '@src/components/Button/Button'
import { submitForm } from '@src/utils/validation'
import commonMessages from '@src/messages'
import messages from '../messages'
import { ActionContext } from '../context/worksCampaignContext'
import { BREADCRUMBS } from '../constants'
import WorksCampaignForm from './WorksCampaignForm'

export default function WorksCampaignCreation() {
  const { formatMessage } = useIntl()
  const formRef = useRef<HTMLFormElement>(null)
  const { onCreateWorksCampaign } = useContext(ActionContext)
  const titleText = formatMessage(messages.creation)
  const breadcrumbList: Breadcrumb[] = useMemo(
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
        onClick={() => submitForm(formRef)}
      />
    ],
    [formatMessage]
  )

  return (
    <>
      <ContentHeader breadcrumbList={breadcrumbList} titleText={titleText} buttonList={buttonList} />
      <WorksCampaignForm formRef={formRef} onSubmit={onCreateWorksCampaign} />
    </>
  )
}
