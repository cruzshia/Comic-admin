import React, { useMemo } from 'react'
import { Field } from 'react-final-form'
import { useIntl } from 'react-intl'
import SearchFilter from '@src/components/SearchFilter'
import commonMessages from '@src/messages'
import { SelectAdapter, TextInputAdapter, SearchInputAdapter } from '@src/components/finalForm'
import messages from '../messages'
import applicationMessages from '../../messages'
import { DATE_TIME_PLACEHOLDER } from '@src/common/constants'

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
          label: formatMessage(messages.productId),
          input: <Field name='message' component={SearchInputAdapter} />
        },
        {
          label: formatMessage(commonMessages.deliveryStartDateTime),
          input: <Field name='deliveryStartTime' component={TextInputAdapter} placeholder={DATE_TIME_PLACEHOLDER} />
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
