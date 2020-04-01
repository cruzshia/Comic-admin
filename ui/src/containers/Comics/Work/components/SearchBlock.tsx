import React, { useMemo } from 'react'
import { useIntl } from 'react-intl'
import { Field } from 'react-final-form'
import SearchFilter, { Conditions } from '@src/components/SearchFilter/SearchFilter'
import { SearchInput, Select, TimeSpanInput } from '@src/components/form'
import commonMessages from '@src/messages'
import messages from '../messages'

export default function SearchBlock({ onSubmit }: { onSubmit: (data: any) => void }) {
  const { formatMessage } = useIntl()

  const conditions: Conditions = useMemo(
    () => ({
      left: [
        {
          label: formatMessage(messages.workId),
          input: <Field name='workId'>{({ input }) => <SearchInput {...input} icon />}</Field>
        },
        {
          label: formatMessage(commonMessages.author),
          input: <Field name='author'>{({ input }) => <Select options={[]} {...input} />}</Field>
        },
        {
          label: formatMessage(messages.category),
          input: <Field name='category'>{({ input }) => <Select options={[]} {...input} />}</Field>
        },
        {
          label: formatMessage(messages.deliveryStartDateTime),
          input: <Field name='deliveryStartDateTime'>{({ input }) => <TimeSpanInput {...input} />}</Field>
        },
        {
          label: formatMessage(messages.deliveryEndDateTime),
          input: <Field name='deliveryEndDateTime'>{({ input }) => <TimeSpanInput {...input} />}</Field>
        },
        {
          label: formatMessage(messages.adUnit),
          input: <Field name='adUnit'>{({ input }) => <Select options={[]} {...input} isShort />}</Field>
        }
      ],
      right: [
        {
          label: formatMessage(messages.rensaiStatus),
          input: <Field name='rensaiStatus'>{({ input }) => <Select options={[]} {...input} isShort />}</Field>
        },
        {
          label: formatMessage(messages.rensaiMagazine),
          input: <Field name='rensaiMagazine'>{({ input }) => <Select options={[]} {...input} />}</Field>
        },
        {
          label: formatMessage(messages.rensaiFrequency),
          input: <Field name='rensaiFrequency'>{({ input }) => <Select options={[]} {...input} isShort />}</Field>
        },
        {
          label: formatMessage(messages.rensaiDay),
          input: <Field name='rensaiDay'>{({ input }) => <Select options={[]} {...input} isShort />}</Field>
        }
      ]
    }),
    [formatMessage]
  )
  return <SearchFilter conditions={conditions} onSubmit={onSubmit} />
}
