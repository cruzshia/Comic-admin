import React from 'react'
import { useIntl } from 'react-intl'
import { Form, Field } from 'react-final-form'
import DataTable, { toDataSet } from '@src/components/table/DataTable'
import StartEndForm from '@src/components/form/StartEndForm'
import { TextInputAdapter } from '@src/components/finalForm'
import ScrollTo from '@src/components/scroll/ScrollTo'
import { useComicsRef } from '../../utils'
import commonMessages from '@src/messages'
import comicMessages from '../../messages'
import messages from '../messages'

interface Props {
  contentCampaign?: any
  onSubmit: (data: {}) => void
  formRef?: React.RefObject<HTMLFormElement> | null
}

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
                  formatMessage(comicMessages.campaignId),
                  <Field name='campaignId' component={TextInputAdapter} />
                ),
                toDataSet(
                  formatMessage(commonMessages.contentId),
                  <Field name='contentId' component={TextInputAdapter} />
                ),
                toDataSet(formatMessage(commonMessages.appId), <Field name='appId' component={TextInputAdapter} />),
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
              endLabel={formatMessage(commonMessages.endTime)}
              endName='campaignEnd'
            />
          </form>
        )}
      ></Form>
    </>
  )
}
