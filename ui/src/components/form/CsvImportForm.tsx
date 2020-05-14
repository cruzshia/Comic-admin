import React from 'react'
import { Form, Field } from 'react-final-form'
import { useIntl } from 'react-intl'
import DataTable, { toDataSet } from '@src/components/table/DataTable'
import { DATE_TIME_PLACEHOLDER } from '@src/common/constants'
import TextInputAdapter from '../finalForm/TextInputAdapter'
import UploadButton from './UploadButton'
import commonMessages from '@src/messages'

interface Props {
  formRef?: React.RefObject<HTMLFormElement>
  onSubmit: (data: any) => void
  fileName?: string
  timeName?: string
}

export default function CsvImportForm({ onSubmit, formRef, fileName, timeName }: Props) {
  const { formatMessage } = useIntl()

  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit} ref={formRef}>
          <DataTable
            title={formatMessage(commonMessages.basicInfo)}
            dataSet={[
              toDataSet(
                formatMessage(commonMessages.csvFile),
                <UploadButton text={formatMessage(commonMessages.selectFile)} name={fileName || 'file'} accept='.csv' />
              ),
              toDataSet(
                formatMessage(commonMessages.schedule),
                <Field name={timeName || 'schedule'} placeholder={DATE_TIME_PLACEHOLDER} component={TextInputAdapter} />
              )
            ]}
          />
        </form>
      )}
    />
  )
}
