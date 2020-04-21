import React from 'react'
import { Field, Form } from 'react-final-form'
import { useIntl } from 'react-intl'
import { ReactComponent as IconSave } from '@src/assets/form/button_save.svg'
import Button, { Theme } from '@src/components/Button/Button'
import DataTable, { toDataSet } from '@src/components/table/DataTable'
import { DATE_TIME_PLACEHOLDER } from '@src/common/constants'
import { TextInputAdapter } from '@src/components/finalForm'
import ContentHeader from '@src/components/ContentHeader'
import UploadButton from '../../components/UploadButton'
import { BREADCRUMBS } from '../constants'
import commonMessages from '@src/messages'
import userMessages from '../../messages'
import messages from '../messages'

export default function GiftCoinsCreation() {
  const { formatMessage } = useIntl()
  const breadcrumbList = BREADCRUMBS.map(({ title }) => ({ title: formatMessage(title) }))
  const buttonList = [
    <Button theme={Theme.DARK} buttonText={formatMessage(commonMessages.create)} />,
    <Button buttonText={formatMessage(userMessages.template)} icon={IconSave} />,
    <Button buttonText={formatMessage(commonMessages.csvImportLogs)} />
  ]

  return (
    <>
      <ContentHeader
        breadcrumbList={breadcrumbList}
        titleText={formatMessage(messages.csvBatchGift)}
        buttonList={buttonList}
      />
      <Form
        onSubmit={() => {}}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <DataTable
              title={formatMessage(commonMessages.basicInfo)}
              dataSet={[
                toDataSet(
                  formatMessage(userMessages.csvFile),
                  <UploadButton text={formatMessage(commonMessages.csvFile)} name='csv_file' />
                ),
                toDataSet(
                  formatMessage(commonMessages.schedule),
                  <Field name='schedule' component={TextInputAdapter} placeholder={DATE_TIME_PLACEHOLDER} />
                )
              ]}
            />
          </form>
        )}
      />
    </>
  )
}
