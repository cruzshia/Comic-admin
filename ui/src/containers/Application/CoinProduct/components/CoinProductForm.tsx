import React, { useRef, useMemo } from 'react'
import { useIntl } from 'react-intl'
import { Form, Field } from 'react-final-form'
import { CoinProductKeys, CoinProductStatusType } from '@src/models/application/coinProduct'
import { TextInputAdapter, SelectAdapter } from '@src/components/finalForm'
import DataTable, { toDataSet } from '@src/components/table/DataTable'
import StartEndForm from '@src/components/form/StartEndForm'
import ScrollTo from '@src/components/scroll/ScrollTo'
import commonMessages from '@src/messages'
import userMessages from '@src/containers/User/List/messages'
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
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit} ref={formRef}>
            <DataTable
              title={formatMessage(commonMessages.basicInfo)}
              dataSet={[
                toDataSet(formatMessage(messages.productId), currentProduct ? currentProduct.productId : ''),
                toDataSet(
                  formatMessage(applicationMessages.applicationId),
                  <Field name={CoinProductKeys.AppId} component={SelectAdapter} options={[]} />
                ),
                toDataSet(
                  formatMessage(userMessages.paidCoins),
                  <Field
                    name={CoinProductKeys.PayCoin}
                    component={TextInputAdapter}
                    placeholder={formatMessage(applicationMessages.inputCoinNum)}
                    short
                  />
                ),
                toDataSet(
                  formatMessage(userMessages.paidBonusCoins),
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
