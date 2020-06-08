import React, { useCallback } from 'react'
import { Form, Field } from 'react-final-form'
import { useIntl } from 'react-intl'
import DataTable, { toDataSet } from '@src/components/table/DataTable'
import { DATE_TIME_PLACEHOLDER } from '@src/common/constants'
import { validDateTime, required } from '@src/utils/validation'
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
  const fileKey = fileName || 'file'
  const timeKey = timeName || 'schedule'

  const validation = useCallback(
    (values: any) => ({
      [fileKey]: required(values[fileKey]),
      [timeKey]: required(values[timeKey]) || validDateTime(values[timeKey])
    }),
    [timeKey, fileKey]
  )

  return (
    <Form
      onSubmit={onSubmit}
      validate={validation}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit} ref={formRef}>
          <DataTable
            title={formatMessage(commonMessages.basicInfo)}
            dataSet={[
              toDataSet(
                formatMessage(commonMessages.csvFile),
                <UploadButton text={formatMessage(commonMessages.selectFile)} name={fileKey} accept='.csv' />
              ),
              toDataSet(
                formatMessage(commonMessages.schedule),
                <Field name={timeKey} placeholder={DATE_TIME_PLACEHOLDER} component={TextInputAdapter} />
              )
            ]}
          />
        </form>
      )}
    />
  )
}
