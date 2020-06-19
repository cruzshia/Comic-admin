import React from 'react'
import { useIntl } from 'react-intl'
import { Form, Field } from 'react-final-form'
import DataTable, { toDataSet } from '@src/components/table/DataTable'
import { TextInputAdapter, TextAreaAdapter } from '@src/components/finalForm'
import { CampaignKeys, Campaign } from '@src/models/comics/campaign'
import { DATE_TIME_PLACEHOLDER } from '@src/common/constants'
import commonMessages from '@src/messages'
import { validateCampaign } from '../utils'
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
        validate={validateCampaign}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit} ref={formRef}>
            <DataTable
              title={formatMessage(commonMessages.basicInfo)}
              dataSet={[
                toDataSet(formatMessage(comicMessages.campaignId), campaign ? campaign[CampaignKeys.ID] : ''),
                toDataSet(
                  formatMessage(messages.name),
                  <Field name={CampaignKeys.Name} component={TextInputAdapter} />
                ),
                toDataSet(
                  formatMessage(messages.adminComment),
                  <Field name={CampaignKeys.Note} component={TextAreaAdapter} />
                ),
                toDataSet(
                  `${formatMessage(commonMessages.startDateTime)}（${formatMessage(messages.adminUsage)}）`,
                  <Field name={CampaignKeys.BeginAt} component={TextInputAdapter} placeholder={DATE_TIME_PLACEHOLDER} />
                ),
                toDataSet(
                  `${formatMessage(commonMessages.endDateTime)}（${formatMessage(messages.adminUsage)}）`,
                  <Field name={CampaignKeys.EndAt} component={TextInputAdapter} placeholder={DATE_TIME_PLACEHOLDER} />
                )
              ]}
            />
          </form>
        )}
      />
    </>
  )
}
