import React, { useMemo } from 'react'
import { Field } from 'react-final-form'
import { useIntl } from 'react-intl'
import SearchFilter from '@src/components/SearchFilter'
import commonMessages from '@src/messages'
import { SelectAdapter, TextInputAdapter } from '@src/components/finalForm'
import { TimeSpanInput } from '@src/components/form'
import { SearchKeys } from '@src/models/application/pushNotification'
import { searchParamsValidator } from '../utils'
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
          input: <Field name={SearchKeys.NotificationMessage} component={TextInputAdapter} />
        },
        {
          label: formatMessage(commonMessages.deliveryDateTime),
          input: <TimeSpanInput nameStart={SearchKeys.DeliveryStartDateTime} nameEnd={SearchKeys.DeliveryEndDateTime} />
        }
      ],
      right: [
        {
          label: formatMessage(applicationMessages.applicationId),
          input: <Field name={SearchKeys.AppId} component={SelectAdapter} options={[]} />
        }
      ]
    }),
    [formatMessage]
  )

  return <SearchFilter onSubmit={onSubmit} formRef={formRef} conditions={conditions} validate={searchParamsValidator} />
}
