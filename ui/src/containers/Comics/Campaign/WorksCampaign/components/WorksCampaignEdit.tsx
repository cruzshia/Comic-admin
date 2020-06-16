import React, { useMemo, useRef, useContext, useEffect, useCallback } from 'react'
import { useIntl } from 'react-intl'
import { useParams } from 'react-router-dom'
import ContentHeader, { Breadcrumb } from '@src/components/ContentHeader/ContentHeader'
import StickyHeader from '@src/components/StickyBar/StickyHeader'
import Button, { Theme } from '@src/components/Button/Button'
import { submitForm } from '@src/utils/validation'
import { WorkCampaignCreate } from '@src/models/comics/worksCampaign'
import commonMessages from '@src/messages'
import messages from '../messages'
import WorksCampaignContext, { ActionContext } from '../context/worksCampaignContext'
import { BREADCRUMBS } from '../utils'
import WorksCampaignForm from './WorksCampaignForm'

export default function WorksCampaignEdit() {
  const { formatMessage } = useIntl()
  const { id, campaignId } = useParams()
  const formRef = useRef<HTMLFormElement>(null)
  const { currentCampaign } = useContext(WorksCampaignContext)
  const { onGetWorksCampaign, onUpdateWorksCampaign, onResetWorksCampaign } = useContext(ActionContext)

  useEffect(() => {
    onGetWorksCampaign(id!)
    return () => onResetWorksCampaign()
  }, [id, onGetWorksCampaign, onResetWorksCampaign])

  const titleText = formatMessage(messages.edit)
  const breadcrumbList: Breadcrumb[] = useMemo(
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
        onClick={() => submitForm(formRef)}
      />
    ],
    [formatMessage]
  )

  const handleSubmit = useCallback(
    (data: Partial<WorkCampaignCreate>) => {
      onUpdateWorksCampaign(data as WorkCampaignCreate)
    },
    [onUpdateWorksCampaign]
  )

  return (
    <>
      <StickyHeader title={titleText} button={buttonList} />
      <ContentHeader breadcrumbList={breadcrumbList} titleText={titleText} buttonList={buttonList} />
      <WorksCampaignForm
        formRef={formRef}
        campaignId={campaignId!}
        onSubmit={handleSubmit}
        worksCampaign={currentCampaign}
      />
    </>
  )
}
