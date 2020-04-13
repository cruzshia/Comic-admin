import React from 'react'
import { useIntl } from 'react-intl'
import { Form, Field } from 'react-final-form'
import arrayMutators from 'final-form-arrays'
import { TextInputAdapter, SelectAdapter, TextAreaAdapter, DropZoneAdapter } from '@src/components/finalForm'
import DataTable, { toDataSet } from '@src/components/table/DataTable'
import commonMessages from '@src/messages'
import AdSettingForm from '../../components/AdSettingForm'
import comicMessages from '../../messages'
import messages from '../messages'
import AuthorEditForm from '../../components/AuthorEditForm'

interface Props {
  content?: any
  onFormSubmit: (data: {}) => void
  formRef?: React.RefObject<HTMLFormElement> | null
}

export default function ContentForm({ content, onFormSubmit, formRef }: Props) {
  const { formatMessage } = useIntl()

  return (
    <>
      <Form
        onSubmit={onFormSubmit}
        mutators={{ ...arrayMutators }}
        initialValues={content || { author: [''] }}
        render={({ handleSubmit, form }) => (
          <form onSubmit={handleSubmit} ref={formRef}>
            <DataTable
              title={formatMessage(commonMessages.basicInfo)}
              dataSet={[
                toDataSet(formatMessage(messages.title), <Field name='title' component={TextInputAdapter} />),
                toDataSet(formatMessage(messages.titleKana), <Field name='titleKana' component={TextInputAdapter} />),
                toDataSet(
                  formatMessage(messages.category),
                  <Field name='category' component={SelectAdapter} options={[]} isShort />
                ),
                toDataSet(
                  formatMessage(commonMessages.introduction),
                  <Field name='description' component={TextAreaAdapter} options={[]} isShort />
                ),
                toDataSet(formatMessage(commonMessages.author), <AuthorEditForm mutators={form.mutators as any} />),
                toDataSet(
                  formatMessage(commonMessages.appId),
                  <Field name='appId' component={SelectAdapter} options={[]} />
                ),
                toDataSet(formatMessage(comicMessages.workId), <Field name='workId' component={TextAreaAdapter} />),
                toDataSet(
                  formatMessage(comicMessages.contentPrice),
                  <Field name='price' component={TextInputAdapter} short />
                ),
                toDataSet(
                  formatMessage(messages.openAdUrl),
                  <Field name='openingAdUrl' component={TextInputAdapter} />
                ),
                toDataSet(formatMessage(messages.sort), <Field name='sort' component={TextInputAdapter} short />),
                toDataSet(
                  formatMessage(messages.limitedTimeFree),
                  <Field name='limitedTimeFree' component={SelectAdapter} options={[]} isShort />
                ),
                toDataSet(
                  formatMessage(comicMessages.episodeNumber),
                  <Field name='episodeNumber' component={TextInputAdapter} short />
                ),
                toDataSet(
                  formatMessage(messages.thumbnailImage),
                  <Field name='thumbnail' component={DropZoneAdapter} />
                ),
                toDataSet(formatMessage(messages.openAdImage), <Field name='adImage' component={DropZoneAdapter} />),
                toDataSet(
                  formatMessage(commonMessages.appId),
                  <Field name='requestId' component={SelectAdapter} options={[]} />
                )
              ]}
              marginBottom
            />
            <AdSettingForm mutators={form.mutators as any} />
          </form>
        )}
      ></Form>
    </>
  )
}
