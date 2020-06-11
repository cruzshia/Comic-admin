import React from 'react'
import { useIntl } from 'react-intl'
import { Form, Field } from 'react-final-form'
import TextInputAdapter from '@src/components/finalForm/TextInputAdapter'
import DataTable, { toDataSet } from '@src/components/table/DataTable'
import AuthorDetail, { AuthorKey } from '@src/models/comics/author'
import commonMessages from '@src/messages'
import { validateAuthor } from '../utils'

interface Props {
  author?: AuthorDetail
  onSubmit: (data: AuthorDetail) => void
  formRef?: React.RefObject<HTMLFormElement>
}

export default function AuthorForm({ author, onSubmit, formRef }: Props) {
  const { formatMessage } = useIntl()

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={author}
      validate={validateAuthor}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit} ref={formRef}>
          <DataTable
            title={formatMessage(commonMessages.basicInfo)}
            dataSet={[
              toDataSet(formatMessage(commonMessages.id), author ? author.id : ''),
              toDataSet(
                formatMessage(commonMessages.authorName),
                <Field name={AuthorKey.Name} component={TextInputAdapter} />
              ),
              toDataSet(
                formatMessage(commonMessages.authorNameKana),
                <Field name={AuthorKey.NameKana} component={TextInputAdapter} />
              )
            ]}
          />
        </form>
      )}
    />
  )
}
