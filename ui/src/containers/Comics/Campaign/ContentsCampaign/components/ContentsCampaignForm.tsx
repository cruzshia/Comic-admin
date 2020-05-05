import React from 'react'
import { useIntl } from 'react-intl'
import { Form, Field } from 'react-final-form'
import DataTable, { toDataSet } from '@src/components/table/DataTable'
import StartEndForm from '@src/components/form/StartEndForm'
import { TextInputAdapter, SearchInputAdapter, SelectAdapter } from '@src/components/finalForm'
import ScrollTo from '@src/components/scroll/ScrollTo'
import { useComicsRef } from '@src/containers/Comics/utils'
import commonMessages from '@src/messages'
import comicMessages from '@src/containers/Comics/messages'
import messages from '../messages'

interface Props {
  contentCampaign?: any
  onSubmit: (data: {}) => void
  formRef?: React.RefObject<HTMLFormElement> | null
}

const CAMPAIGN_TIME_PLACEHOLDER = 'hh:mm'

export default function ContentsCampaignForm({ contentCampaign, onSubmit, formRef }: Props) {
  const { formatMessage } = useIntl()
  const { allAnchorRefs, deliveryRef, campaignTimeRef } = useComicsRef()

  return (
    <>
      <ScrollTo anchorRef={allAnchorRefs} withStickHeader />
      <Form
        onSubmit={onSubmit}
        initialValues={contentCampaign}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit} ref={formRef}>
            <DataTable
              title={formatMessage(commonMessages.basicInfo)}
              dataSet={[
                toDataSet(
                  formatMessage(messages.contentCampaignName),
                  <Field name='campaignName' component={TextInputAdapter} />
                ),
                toDataSet(formatMessage(messages.contentId), <Field name='contentId' component={SearchInputAdapter} />),
                toDataSet(
                  formatMessage(commonMessages.appId),
                  <Field name='appId' component={SelectAdapter} options={[]} />
                ),
                toDataSet(
                  formatMessage(comicMessages.priority),
                  <Field name='priority' component={TextInputAdapter} short />
                ),
                toDataSet(
                  formatMessage(comicMessages.contentPrice),
                  <Field name='contentPrice' component={TextInputAdapter} short />
                ),
                toDataSet(
                  formatMessage(messages.completeBonus),
                  <Field name='completeBonus' component={TextInputAdapter} short />
                )
              ]}
              marginBottom
            />
            <StartEndForm
              innerRef={deliveryRef}
              title={formatMessage(commonMessages.deliveryDuration)}
              startLabel={formatMessage(commonMessages.deliveryStartDateTime)}
              startName='deliverStart'
              endLabel={formatMessage(commonMessages.deliveryEndDateTime)}
              endName='deliverEnd'
              marginBottom
            />
            <StartEndForm
              innerRef={campaignTimeRef}
              title={formatMessage(messages.campaignPeriod)}
              startLabel={formatMessage(commonMessages.startTime)}
              startName='campaignStart'
              startPlaceholder={CAMPAIGN_TIME_PLACEHOLDER}
              endLabel={formatMessage(commonMessages.endTime)}
              endName='campaignEnd'
              endPlaceholder={CAMPAIGN_TIME_PLACEHOLDER}
            />
          </form>
        )}
      ></Form>
    </>
  )
}
