import React from 'react'
import { useIntl } from 'react-intl'
import { Field } from 'react-final-form'
import { FieldArray } from 'react-final-form-arrays'
import { Mutators } from 'final-form-arrays'
import { Box } from '@material-ui/core'
import { Select } from '@src/components/form'
import DataTable from '@src/components/table/DataTable'
import { checkError } from '@src/utils/validation'
import commonMessages from '@src/messages'
import Advertisement from './Advertisement'

const AD_COLUMN = 'contents'

export default function AdSettingForm({
  adSettingRef,
  mutators
}: {
  adSettingRef?: React.RefObject<HTMLDivElement>
  mutators: Mutators
}) {
  const { formatMessage } = useIntl()
  const createDeleteHandler = (idx: number) => () => mutators && mutators.remove(AD_COLUMN, idx)
  const tableTitle = formatMessage(commonMessages.advertisementSetting)
  const dataSet = [
    {
      label: formatMessage(commonMessages.deviceCategory),
      content: (
        <Field name='device'>
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
    {
      label: tableTitle,
      content: (
        <Box height={1024}>
          <FieldArray name={AD_COLUMN}>
            {({ fields }) =>
              fields.map((name, index) => (
                <Advertisement key={name} name={name} onDelete={createDeleteHandler(index)} />
              ))
            }
          </FieldArray>
        </Box>
      )
    }
  ]
  return <DataTable title={tableTitle} dataSet={dataSet} innerRef={adSettingRef} />
}
