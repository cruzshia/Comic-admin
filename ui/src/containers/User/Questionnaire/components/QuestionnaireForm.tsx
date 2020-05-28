import React from 'react'
import { useIntl } from 'react-intl'
import { Form, Field } from 'react-final-form'
import arrayMutators from 'final-form-arrays'
import { Questionnaire } from '@src/models/user/questionnaire'
import { emptyQuestionnaire } from '@src/reducers/user/questionnaire/questionnaireReducer'
import DataTable, { toDataSet } from '@src/components/table/DataTable'
import TextFieldAdapter from '@src/components/finalForm/TextInputAdapter'
import { SearchInputAdapter, TextAreaAdapter } from '@src/components/finalForm'
import { StartEndForm } from '@src/components/form'
import commonMessages from '@src/messages'
import messages from '../messages'
import QuestionSettingForm from './QuestionSettingForm'

interface Props {
  formRef: React.RefObject<HTMLFormElement>
  onSubmit: (data: Questionnaire) => void
  currentQuestionnaire?: Questionnaire
}

export default function QuestionnaireForm({ formRef, onSubmit, currentQuestionnaire }: Props) {
  const { formatMessage } = useIntl()

  return (
    <Form
      onSubmit={onSubmit}
      mutators={{ ...arrayMutators }}
      initialValues={currentQuestionnaire || emptyQuestionnaire}
      subscription={{ pristine: true }}
    >
      {({ handleSubmit }) => (
        <form ref={formRef} onSubmit={handleSubmit}>
          <DataTable
            title={formatMessage(commonMessages.basicInfo)}
            dataSet={[
              toDataSet(formatMessage(messages.id), currentQuestionnaire ? currentQuestionnaire.id : ''),
              toDataSet(formatMessage(messages.name), <Field name='name' component={TextFieldAdapter} />),
              toDataSet(formatMessage(messages.category), <Field name='category' component={TextFieldAdapter} />),
              toDataSet(
                formatMessage(commonMessages.contentId),
                <Field name='contentId' component={SearchInputAdapter} />
              ),
              toDataSet(
                formatMessage(messages.answerReward),
                <Field name='answerReward' component={TextFieldAdapter} short />
              ),
              toDataSet(formatMessage(messages.externalUrl), <Field name='externalUrl' component={TextFieldAdapter} />),
              toDataSet(formatMessage(messages.bannerUrl), <Field name='bannerUrl' component={TextFieldAdapter} />),
              toDataSet(
                formatMessage(messages.descriptionTitle),
                <Field name='descriptionTitle' component={TextFieldAdapter} />
              ),
              toDataSet(
                formatMessage(commonMessages.introduction),
                <Field name='description' component={TextAreaAdapter} />
              ),
              toDataSet(formatMessage(messages.footer), <Field name='footer' component={TextAreaAdapter} />),
              toDataSet(
                formatMessage(messages.answerCompletedMessage),
                <Field name='answerCompletedMessage' component={TextAreaAdapter} />
              )
            ]}
            marginBottom
          />
          <StartEndForm
            title={formatMessage(commonMessages.deliveryDuration)}
            startLabel={formatMessage(messages.answerStartTime)}
            startName='answerStartTime'
            endLabel={formatMessage(messages.answerEndTime)}
            endName='answerEndTime'
            marginBottom
          />
          <QuestionSettingForm name='questions' />
        </form>
      )}
    </Form>
  )
}
