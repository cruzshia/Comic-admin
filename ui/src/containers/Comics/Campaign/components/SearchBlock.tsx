import React, { useMemo } from 'react'
import { useIntl } from 'react-intl'
import { Field } from 'react-final-form'
import SearchFilter, { Conditions } from '@src/components/SearchFilter/SearchFilter'
import { SearchInputAdapter } from '@src/components/finalForm'
import TimeSpanInput from '@src/components/form/TimeSpanInput'
import { CampaignSearchKeys } from '@src/models/comics/campaign'
import commonMessages from '@src/messages'
import messages from '../messages'

export default function SearchBlock({ onSubmit }: { onSubmit: (data: any) => void }) {
  const { formatMessage } = useIntl()
  const conditions: Conditions = useMemo(
    () => ({
      left: [
        {
          label: formatMessage(messages.name),
          input: <Field name={CampaignSearchKeys.Name} component={SearchInputAdapter} />
        }
      ],
      right: [
        {
          label: formatMessage(commonMessages.startDateTime),
          input: <TimeSpanInput nameStart={CampaignSearchKeys.BeginAtFrom} nameEnd={CampaignSearchKeys.BeginAtTo} />
        },
        {
          label: formatMessage(commonMessages.endDateTime),
          input: <TimeSpanInput nameStart={CampaignSearchKeys.EndAtFrom} nameEnd={CampaignSearchKeys.EndAtTo} />
        }
      ]
    }),
    [formatMessage]
  )

  return <SearchFilter conditions={conditions} onSubmit={onSubmit} />
}
