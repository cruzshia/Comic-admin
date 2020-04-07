import React, { useMemo } from 'react'
import { Field } from 'react-final-form'
import { useIntl } from 'react-intl'
import SearchFilter from '@src/components/SearchFilter'
import commonMessages from '@src/messages'
import { DATE_TIME_PLACEHOLDER } from '@src/common/constants'
import { SelectAdapter, TextInputAdapter } from '@src/components/finalForm'
import messages from '../messages'

interface Props {
  onSubmit: (data: any) => void
  formRef?: React.RefObject<HTMLFormElement>
}

export default function SearchBlock({ onSubmit, formRef }: Props) {
  const { formatMessage } = useIntl()
  const conditions = useMemo(
    () => ({
      left: [
        {
          label: formatMessage(messages.display),
          input: <Field name='display' component={SelectAdapter} options={[]} />
        },
        {
          label: formatMessage(commonMessages.deliveryStartDateTime),
          input: <Field name='deliveryTimeStart' component={TextInputAdapter} placeholder={DATE_TIME_PLACEHOLDER} />
        }
      ],
      right: [
        {
          label: formatMessage(messages.display),
          input: <Field name='display' component={SelectAdapter} options={[]} />
        },
        {
          label: formatMessage(commonMessages.deliveryEndDateTime),
          input: <Field name='deliveryTimeStart' component={TextInputAdapter} placeholder={DATE_TIME_PLACEHOLDER} />
        }
      ]
    }),
    [formatMessage]
  )
  return <SearchFilter onSubmit={onSubmit} formRef={formRef} conditions={conditions} />
}
