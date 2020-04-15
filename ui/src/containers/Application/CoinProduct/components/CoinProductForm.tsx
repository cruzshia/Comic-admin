import React, { useRef } from 'react'
import { useIntl } from 'react-intl'
import { Form, Field } from 'react-final-form'
import { TextInputAdapter, SelectAdapter } from '@src/components/finalForm'
import DataTable, { toDataSet } from '@src/components/table/DataTable'
import StartEndForm from '@src/components/form/StartEndForm'
import ScrollTo from '@src/components/scroll/ScrollTo'
import commonMessages from '@src/messages'
import applicationMessages from '../../messages'
import messages from '../messages'

interface Props {
  coinProduct?: any
  onSubmit: (data: any) => void
  formRef?: React.RefObject<HTMLFormElement>
}

export enum ScrollAnchor {
  Release = 'release'
}

export default function CoinProductForm({ coinProduct, onSubmit, formRef }: Props) {
  const { formatMessage } = useIntl()
  const releaseRef = useRef<HTMLDivElement>(null)
  const anchorRefs = {
    [ScrollAnchor.Release]: releaseRef
  }

  return (
    <>
      <ScrollTo anchorRef={anchorRefs} />
      <Form
        onSubmit={onSubmit}
        initialValues={coinProduct}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit} ref={formRef}>
            <DataTable
              title={formatMessage(commonMessages.basicInfo)}
              dataSet={[
                toDataSet(
                  formatMessage(messages.productId),
                  coinProduct ? coinProduct.productId : <Field name='productId' component={TextInputAdapter} />
                ),
                toDataSet(
                  formatMessage(applicationMessages.applicationId),
                  <Field name='applicationId' component={SelectAdapter} options={[]} />
                ),
                toDataSet(
                  formatMessage(messages.paidCoin),
                  <Field
                    name='paidCoin'
                    component={TextInputAdapter}
                    placeholder={formatMessage(applicationMessages.inputCoinNum)}
                    short
                  />
                ),
                toDataSet(
                  formatMessage(messages.givenCoin),
                  <Field
                    name='givenCoin'
                    component={TextInputAdapter}
                    placeholder={formatMessage(applicationMessages.inputCoinNum)}
                    short
                  />
                ),
                toDataSet(
                  formatMessage(applicationMessages.status),
                  <Field name='status' component={SelectAdapter} options={[]} isShort />
                )
              ]}
              marginBottom
            />
            <StartEndForm
              innerRef={releaseRef}
              title={formatMessage(commonMessages.releaseDuration)}
              startLabel={formatMessage(messages.releaseStartTime)}
              startName='releaseStartTime'
              endLabel={formatMessage(messages.releaseEndTime)}
              endName='releaseEndTime'
            />
          </form>
        )}
      />
    </>
  )
}
