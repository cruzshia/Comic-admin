import React from 'react'
import { useIntl } from 'react-intl'
import { Form, Field } from 'react-final-form'
import DataTable, { toDataSet } from '@src/components/table/DataTable'
import { TextInputAdapter, TextAreaAdapter } from '@src/components/finalForm'
import Campaign from '@src/models/comics/campaign'
import { DATE_TIME_PLACEHOLDER } from '@src/common/constants'
import commonMessages from '@src/messages'
import comicMessages from '../../messages'
import messages from '../messages'

interface Props {
  onSubmit: (data: any) => void
  formRef: React.RefObject<HTMLFormElement> | null
  campaign?: Campaign
}

export default function CampaignForm({ onSubmit, formRef, campaign }: Props) {
  const { formatMessage } = useIntl()
  return (
    <>
      <Form
        onSubmit={onSubmit}
        initialValues={campaign}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit} ref={formRef}>
            <DataTable
              title={formatMessage(commonMessages.basicInfo)}
              dataSet={[
                toDataSet(formatMessage(comicMessages.campaignId), campaign?.campaignId),
                toDataSet(formatMessage(messages.name), <Field name='name' component={TextInputAdapter} />),
                toDataSet(formatMessage(messages.adminComment), <Field name='comment' component={TextAreaAdapter} />),
                toDataSet(
                  `${formatMessage(commonMessages.startDateTime)}（${formatMessage(messages.adminUsage)}）`,
                  <Field name='startAt' component={TextInputAdapter} placeholder={DATE_TIME_PLACEHOLDER} />
                ),
                toDataSet(
                  `${formatMessage(commonMessages.endDateTime)}（${formatMessage(messages.adminUsage)}）`,
                  <Field name='endAt' component={TextInputAdapter} placeholder={DATE_TIME_PLACEHOLDER} />
                )
              ]}
            />
          </form>
        )}
      />
    </>
  )
}
