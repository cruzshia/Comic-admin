import React, { useMemo } from 'react'
import { Field } from 'react-final-form'
import { useIntl } from 'react-intl'
import SearchFilter from '@src/components/SearchFilter'
import commonMessages from '@src/messages'
import { SelectAdapter, TextInputAdapter, SearchInputAdapter } from '@src/components/finalForm'
import { DATE_TIME_PLACEHOLDER } from '@src/common/constants'
import { CoinProductStatusType, CoinProductSearchKeys, SearchParam } from '@src/models/application/coinProduct'
import messages from '../messages'
import applicationMessages from '../../messages'
import { searchParamsValidator } from '../utils'
interface Props {
  onSubmit: (data: Partial<SearchParam>) => void
  formRef?: React.RefObject<HTMLFormElement>
}

export default function SearchBlock({ onSubmit, formRef }: Props) {
  const { formatMessage } = useIntl()

  const typeOptions = useMemo(
    () =>
      Object.values(CoinProductStatusType).map(type => ({
        label: formatMessage(messages[type]),
        value: type
      })),
    [formatMessage]
  )

  const conditions = useMemo(
    () => ({
      left: [
        {
          label: formatMessage(messages.productId),
          input: <Field name={CoinProductSearchKeys.ProductIdToken} component={SearchInputAdapter} />
        },
        {
          label: formatMessage(commonMessages.publicStartTime),
          input: (
            <Field
              name={CoinProductSearchKeys.PublishBeginAt}
              component={TextInputAdapter}
              placeholder={DATE_TIME_PLACEHOLDER}
            />
          )
        }
      ],
      right: [
        {
          label: formatMessage(applicationMessages.status),
          input: <Field name={CoinProductSearchKeys.Status} component={SelectAdapter} options={typeOptions} isShort />
        }
      ]
    }),
    [formatMessage, typeOptions]
  )
  return <SearchFilter onSubmit={onSubmit} formRef={formRef} conditions={conditions} validate={searchParamsValidator} />
}
