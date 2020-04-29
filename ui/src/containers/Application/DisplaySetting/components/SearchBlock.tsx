import React, { useMemo } from 'react'
import { Field } from 'react-final-form'
import { useIntl } from 'react-intl'
import SearchFilter from '@src/components/SearchFilter'
import commonMessages from '@src/messages'
import { SelectAdapter } from '@src/components/finalForm'
import { TimeSpanInput } from '@src/components/form'
import applicationMessages from '../../messages'
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
          label: formatMessage(messages.screen),
          input: <Field name='display' component={SelectAdapter} options={[]} />
        },
        {
          label: formatMessage(commonMessages.deliveryStartDateTime),
          input: <TimeSpanInput />
        }
      ],
      right: [
        {
          label: formatMessage(applicationMessages.status),
          input: <Field name='status' component={SelectAdapter} options={[]} isShort />
        }
      ]
    }),
    [formatMessage]
  )
  return <SearchFilter onSubmit={onSubmit} formRef={formRef} conditions={conditions} />
}
