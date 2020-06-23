import React, { useMemo, useRef, useContext, useCallback } from 'react'
import { useIntl } from 'react-intl'
import { useParams } from 'react-router-dom'
import ContentHeader, { Breadcrumb } from '@src/components/ContentHeader/ContentHeader'
import StickyHeader from '@src/components/StickyBar/StickyHeader'
import Button, { Theme } from '@src/components/Button/Button'
import { submitForm } from '@src/utils/validation'
import { WorkKeys } from '@src/models/comics/work'
import { WorkCampaignCreate } from '@src/models/comics/worksCampaign'
import commonMessages from '@src/messages'
import messages from '../messages'
import WorksCampaignContext, { ActionContext } from '../context/worksCampaignContext'
import { BREADCRUMBS } from '../utils'
import WorksCampaignForm from './WorksCampaignForm'

export default function WorksCampaignCreation() {
  const { formatMessage } = useIntl()
  const formRef = useRef<HTMLFormElement>(null)
  const { currentWork } = useContext(WorksCampaignContext)
  const { onCreateWorksCampaign, onGetWork } = useContext(ActionContext)
  const { campaignId } = useParams()
  const titleText = formatMessage(messages.creation)
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

  const handleWorkBlur = useCallback(
    (e: React.MouseEvent<HTMLInputElement>) => {
      onGetWork(e.currentTarget.value)
    },
    [onGetWork]
  )

  const handleSubmit = useCallback(
    (data: Partial<WorkCampaignCreate>) => {
      onCreateWorksCampaign(data as WorkCampaignCreate)
    },
    [onCreateWorksCampaign]
  )

  return (
    <>
      <StickyHeader title={titleText} button={buttonList} />
      <ContentHeader breadcrumbList={breadcrumbList} titleText={titleText} buttonList={buttonList} />
      <WorksCampaignForm
        formRef={formRef}
        campaignId={campaignId!}
        workType={currentWork?.[WorkKeys.WorkType]}
        onWorkBlur={handleWorkBlur}
        onSubmit={handleSubmit}
      />
    </>
  )
}
