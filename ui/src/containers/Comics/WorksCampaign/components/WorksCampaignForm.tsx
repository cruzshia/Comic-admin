import React from 'react'
import { useIntl } from 'react-intl'
import { Form, Field } from 'react-final-form'
import arrayMutators from 'final-form-arrays'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core'
import DataTable from '@src/components/table/DataTable'
import { TextInput } from '@src/components/form'
import commonMessages from '@src/messages'
import { required, checkError } from '@src/utils/validation'
import { DATE_TIME_PLACEHOLDER } from '@src/common/constants'
import AdSettingForm from '../../components/AdSettingForm'
import messages from '../messages'

interface Props {
  onSubmit: (data: any) => void
  formRef?: React.RefObject<HTMLFormElement> | null
}

const useStyle = makeStyles({
  tableClass: {
    '& .MuiGrid-container:not(.display) .MuiGrid-item': {
      padding: '15px 20px'
    }
  },
  tableMargin: {
    marginBottom: '30px'
  }
})

export default function WorksCampaignForm({ onSubmit, formRef }: Props) {
  const classes = useStyle()
  const { formatMessage } = useIntl()

  return (
    <>
      <Form
        onSubmit={onSubmit}
        mutators={{ ...arrayMutators }}
        render={({ handleSubmit, form }) => (
          <form onSubmit={handleSubmit} ref={formRef}>
            <DataTable
              title={formatMessage(commonMessages.deliveryDuration)}
              tableClass={clsx(classes.tableClass, classes.tableMargin)}
              dataSet={[
                {
                  label: formatMessage(messages.startDateTime),
                  content: (
                    <Field name='startDateTime' validate={required}>
                      {({ input, meta }) => (
                        <TextInput {...input} error={checkError(meta)} placeholder={DATE_TIME_PLACEHOLDER} />
                      )}
                    </Field>
                  )
                },
                {
                  label: formatMessage(messages.endDateTime),
                  content: (
                    <Field name='endDateTime' validate={required}>
                      {({ input, meta }) => (
                        <TextInput {...input} error={checkError(meta)} placeholder={DATE_TIME_PLACEHOLDER} />
                      )}
                    </Field>
                  )
                }
              ]}
            />
            <AdSettingForm />
          </form>
        )}
      />
    </>
  )
}
