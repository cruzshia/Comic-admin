import React, { useRef } from 'react'
import { useIntl } from 'react-intl'
import { Form, Field } from 'react-final-form'
import { TextInputAdapter, SelectAdapter } from '@src/components/finalForm'
import DataTable, { toDataSet } from '@src/components/table/DataTable'
import StartEndForm from '@src/components/form/StartEndForm'
import ScrollTo from '@src/components/scroll/ScrollTo'
import { emptyCoinProduct } from '@src/reducers/application/coinProduct/coinProductReducer'
import commonMessages from '@src/messages'
import applicationMessages from '../../messages'
import messages from '../messages'

interface Props {
  currentProduct?: any
  onSubmit: (data: any) => void
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

  return (
    <>
      <ScrollTo anchorRef={anchorRefs} />
      <Form
        onSubmit={onSubmit}
        initialValues={currentProduct || emptyCoinProduct}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit} ref={formRef}>
            <DataTable
              title={formatMessage(commonMessages.basicInfo)}
              dataSet={[
                toDataSet(
                  formatMessage(messages.productId),
                  currentProduct ? currentProduct.productId : <Field name='productId' component={TextInputAdapter} />
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
              startLabel={formatMessage(commonMessages.publicStartTime)}
              startName='releaseStartTime'
              endLabel={formatMessage(commonMessages.publicEndTime)}
              endName='releaseEndTime'
            />
          </form>
        )}
      />
    </>
  )
}