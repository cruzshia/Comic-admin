import React, { useRef, useMemo } from 'react'
import { useIntl } from 'react-intl'
import { Form, Field } from 'react-final-form'
import {
  CoinProductKeys,
  CoinProductStatusType,
  CoinProductRequestBody,
  CoinProduct
} from '@src/models/application/coinProduct'
import { TextInputAdapter, SelectAdapter } from '@src/components/finalForm'
import DataTable, { toDataSet } from '@src/components/table/DataTable'
import StartEndForm from '@src/components/form/StartEndForm'
import ScrollTo from '@src/components/scroll/ScrollTo'
import commonMessages from '@src/messages'
import applicationMessages from '../../messages'
import messages from '../messages'
import { validateCoinProduct } from '../utils'

interface Props {
  currentProduct?: CoinProduct
  onSubmit: (data: CoinProductRequestBody) => void
  formRef?: React.RefObject<HTMLFormElement>
}

export enum ScrollAnchor {
  Release = 'release'
}

export default function CoinProductForm({ currentProduct, onSubmit, formRef }: Props) {
  const { formatMessage } = useIntl()
  const releaseRef = useRef<HTMLDivElement>(null)
  const anchorRefs = {
    [ScrollAnchor.Release]: releaseRef
  }

  const typeOptions = useMemo(
    () =>
      Object.values(CoinProductStatusType).map(type => ({
        label: formatMessage(messages[type]),
        value: type
      })),
    [formatMessage]
  )

  return (
    <>
      <ScrollTo anchorRef={anchorRefs} />
      <Form
        onSubmit={onSubmit}
        initialValues={currentProduct}
        validate={validateCoinProduct}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit} ref={formRef}>
            <DataTable
              title={formatMessage(commonMessages.basicInfo)}
              dataSet={[
                toDataSet(formatMessage(messages.productId), currentProduct ? currentProduct[CoinProductKeys.Id] : ''),
                toDataSet(
                  formatMessage(applicationMessages.applicationId),
                  <Field
                    name={CoinProductKeys.AppId}
                    component={SelectAdapter}
                    options={[
                      { label: 'app', value: 1 },
                      { label: 'app_api', value: 31 }
                    ]}
                  />
                ),
                toDataSet(
                  formatMessage(messages.paidCoin),
                  <Field
                    name={CoinProductKeys.PayCoin}
                    component={TextInputAdapter}
                    placeholder={formatMessage(applicationMessages.inputCoinNum)}
                    short
                  />
                ),
                toDataSet(
                  formatMessage(messages.givenCoin),
                  <Field
                    name={CoinProductKeys.PayBonusCoin}
                    component={TextInputAdapter}
                    placeholder={formatMessage(applicationMessages.inputCoinNum)}
                    short
                  />
                ),
                toDataSet(
                  formatMessage(applicationMessages.status),
                  <Field name={CoinProductKeys.Status} component={SelectAdapter} options={typeOptions} isShort />
                )
              ]}
              marginBottom
            />
            <StartEndForm
              innerRef={releaseRef}
              title={formatMessage(commonMessages.releaseDuration)}
              startLabel={formatMessage(commonMessages.publicStartTime)}
              startName={CoinProductKeys.PublishBeginAt}
              endLabel={formatMessage(commonMessages.publicEndTime)}
              endName={CoinProductKeys.PublishEndAt}
            />
          </form>
        )}
      />
    </>
  )
}
