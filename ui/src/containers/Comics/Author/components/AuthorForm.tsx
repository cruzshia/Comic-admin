import React from 'react'
import { useIntl } from 'react-intl'
import { Form, Field } from 'react-final-form'
import TextInputAdapter from '@src/components/finalForm/TextInputAdapter'
import DataTable, { toDataSet } from '@src/components/table/DataTable'
import commonMessages from '@src/messages'

interface Props {
  author?: any
  onSubmit: (data: any) => void
  formRef?: React.RefObject<HTMLFormElement>
}

export default function AuthorForm({ author, onSubmit, formRef }: Props) {
  const { formatMessage } = useIntl()

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={{ ...author }}
      render={({ handleSubmit, form }) => (
        <form onSubmit={handleSubmit} ref={formRef}>
          <DataTable
            title={formatMessage(commonMessages.basicInfo)}
            dataSet={[
              toDataSet(
                formatMessage(commonMessages.id),
                author ? author.id : <Field name='id' component={TextInputAdapter} />
              ),
              toDataSet(
                formatMessage(commonMessages.authorName),
                <Field name='name' value={author?.name} component={TextInputAdapter} />
              ),
              toDataSet(
                formatMessage(commonMessages.authorName),
                <Field name='nameKana' value={author?.nameKana} component={TextInputAdapter} />
              )
            ]}
          />
        </form>
      )}
    />
  )
}
