import React, { useCallback, useMemo, useRef } from 'react'
import { useIntl } from 'react-intl'
import { Form, Field } from 'react-final-form'
import arrayMutators from 'final-form-arrays'
import { TextInputAdapter, SelectAdapter } from '@src/components/finalForm'
import StartEndForm from '@src/components/form/StartEndForm'
import Button, { Theme } from '@src/components/Button/Button'
import ContentHeader from '@src/components/ContentHeader'
import DataTable, { toDataSet } from '@src/components/table/DataTable'
import RewardForm from './RewardForm'
import { BREADCRUMBS } from '../constants'
import commonMessages from '@src/messages'
import applicationMessages from '../../messages'
import messages from '../messages'

interface Props {
  coinDeliveryEvent?: any
  onSubmit: (data: any) => void
}

export default function CoinDeliveryEventForm({ coinDeliveryEvent, onSubmit }: Props) {
  const { formatMessage } = useIntl()
  const formRef = useRef<HTMLFormElement>(null)
  const handleClickSubmit = useCallback(
    () => formRef.current?.dispatchEvent(new Event('submit', { cancelable: true })),
    []
  )

  const breadcrumbList = useMemo(
    () =>
      BREADCRUMBS.map(({ title, route }) => ({ title: formatMessage(title), route })).concat([
        {
          title: formatMessage(messages.creation),
          route: undefined
        }
      ]),
    [formatMessage]
  )

  const buttonList = useMemo(
    () => [<Button theme={Theme.DARK} buttonText={formatMessage(commonMessages.create)} onClick={handleClickSubmit} />],
    [formatMessage, handleClickSubmit]
  )

  return (
    <>
      <ContentHeader
        breadcrumbList={breadcrumbList}
        titleText={formatMessage(messages.creation)}
        buttonList={buttonList}
      />
      <Form
        onSubmit={onSubmit}
        initialValues={coinDeliveryEvent || { reward: [{}] }}
        mutators={{ ...arrayMutators }}
        render={({ handleSubmit, form: { mutators } }) => (
          <form onSubmit={handleSubmit} ref={formRef}>
            <DataTable
              title={formatMessage(commonMessages.basicInfo)}
              dataSet={[
                toDataSet(
                  formatMessage(commonMessages.id),
                  coinDeliveryEvent ? coinDeliveryEvent.id : <Field name='id' component={TextInputAdapter} />
                ),
                toDataSet(
                  formatMessage(messages.eventId),
                  coinDeliveryEvent ? coinDeliveryEvent.eventId : <Field name='eventId' component={TextInputAdapter} />
                ),
                toDataSet(formatMessage(messages.eventName), <Field name='eventName' component={TextInputAdapter} />),
                toDataSet(
                  formatMessage(messages.eventType),
                  <Field name='eventType' component={SelectAdapter} options={[]} isShort />
                ),
                toDataSet(
                  formatMessage(messages.eventRewardSetting),
                  <Field name='eventRewardSetting' component={SelectAdapter} options={[]} />
                )
              ]}
              marginBottom
            />
            <DataTable
              title={formatMessage(messages.eventRewardSetting)}
              dataSet={[toDataSet(formatMessage(messages.eventReward), <RewardForm mutators={mutators as any} />)]}
              marginBottom
            />
            <StartEndForm
              title={formatMessage(applicationMessages.releaseDuration)}
              startLabel={formatMessage(applicationMessages.releaseStartTime)}
              startName='releaseStartAt'
              endLabel={formatMessage(applicationMessages.releaseEndTime)}
              endName='releaseEndAt'
            />
          </form>
        )}
      />
    </>
  )
}
