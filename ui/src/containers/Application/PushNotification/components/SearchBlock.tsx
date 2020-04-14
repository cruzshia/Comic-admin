import React, { useMemo } from 'react'
import { Field } from 'react-final-form'
import { useIntl } from 'react-intl'
import SearchFilter from '@src/components/SearchFilter'
import commonMessages from '@src/messages'
import { SelectAdapter, TextInputAdapter } from '@src/components/finalForm'
import { TimeSpanInput } from '@src/components/form'
import applicationMessages from '../../messages'

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
          label: formatMessage(commonMessages.message),
          input: <Field name='message' component={TextInputAdapter} />
        },
        {
          label: formatMessage(commonMessages.deliveryStartDateTime),
          input: <TimeSpanInput name='deliveryTime' />
        }
      ],
      right: [
        {
          label: formatMessage(applicationMessages.applicationId),
          input: <Field name='display' component={SelectAdapter} options={[]} />
        }
      ]
    }),
    [formatMessage]
  )
  return <SearchFilter onSubmit={onSubmit} formRef={formRef} conditions={conditions} />
}
