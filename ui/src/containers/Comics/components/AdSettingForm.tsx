import React from 'react'
import { useIntl } from 'react-intl'
import { Field } from 'react-final-form'
import { Box } from '@material-ui/core'
import { Select } from '@src/components/form'
import DataTable from '@src/components/table/DataTable'
import { required, checkError } from '@src/utils/validation'
import commonMessages from '@src/messages'

export default function AdSettingForm() {
  const { formatMessage } = useIntl()

  const tableTitle = formatMessage(commonMessages.advertisementSetting)
  const dataSet = [
    {
      label: formatMessage(commonMessages.deviceCategory),
      content: (
        <Field name='device' validate={required}>
          {({ input, meta }) => (
            <Select
              {...input}
              error={checkError(meta)}
              options={[{ label: 1, value: 1 }]}
              isShort
              placeholder={formatMessage(commonMessages.common)}
            />
          )}
        </Field>
      )
    },
    { label: tableTitle, content: <Field name='ad_setting'>{() => <Box height='1024px' />}</Field> }
  ]
  return <DataTable title={tableTitle} dataSet={dataSet} />
}
