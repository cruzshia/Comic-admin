import React, { useMemo, useRef, useContext } from 'react'
import { useIntl } from 'react-intl'
import Button, { Theme } from '@src/components/Button/Button'
import ContentHeader from '@src/components/ContentHeader'
import { submitForm } from '@src/utils/validation'
import CampaignForm from './CampaignForm'
import CampaignContext from '../context/CampaignContext'
import { BREADCRUMBS } from '../utils'
import commonMessages from '@src/messages'
import messages from '../messages'

export default function CampaignEdit() {
  const { currentCampaign } = useContext(CampaignContext)
  const { formatMessage } = useIntl()
  const formRef = useRef<HTMLFormElement>(null)

  const titleText = formatMessage(messages.creation)
  const breadcrumbList = useMemo(
    () =>
      BREADCRUMBS.map(({ title, route }) => ({
        title: formatMessage(title),
        route
      })).concat({ title: titleText, route: undefined }),
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
      <CampaignForm formRef={formRef} onSubmit={console.log} campaign={currentCampaign} />
    </>
  )
}
