import React, { useCallback, useEffect } from 'react'
import { useIntl } from 'react-intl'
import { Field, useField } from 'react-final-form'
import { Grid } from '@material-ui/core'
import { InputRow } from '@src/components/InputBlock'
import { ReactComponent as AddIcon } from '@src/assets/common/add_circle.svg'
import Button, { Theme } from '@src/components/Button/Button'
import { TextInputAdapter, SelectAdapter, TextAreaAdapter } from '@src/components/finalForm'
import messages from '../messages'
import { QuestionType } from '../utils'

export enum InputLimit {
  Answer = 'answerLimit',
  Input = 'inputLimit'
}

export function InputAnswerLimit({ name, limitType }: { name: string; limitType: InputLimit }) {
  const { formatMessage } = useIntl()
  return (
    <InputRow
      title={
        limitType === InputLimit.Input ? formatMessage(messages.inputLimitation) : formatMessage(messages.answerLimit)
      }
    >
      <Field name={`${name}.${InputLimit.Answer}.action`} component={SelectAdapter} isShort options={[]} />
      <Field
        name={`${name}.${InputLimit.Answer}.count`}
        component={TextInputAdapter}
        short
        placeholder={formatMessage(messages.inputCount)}
        className='limitCount'
      />
    </InputRow>
  )
}

export function InputOptions({ name }: { name: string }) {
  const { formatMessage } = useIntl()
  return (
    <>
      <InputRow title={formatMessage(messages.option)} alignItems='flex-start'>
        <Field name={`${name}.option`} component={TextAreaAdapter} />
      </InputRow>
      <InputRow title={formatMessage(messages.optionShuffle)}>
        <Field name={`${name}.optionShuffle`} component={SelectAdapter} isShort options={[]} />
      </InputRow>
    </>
  )
}

export function InputLine({ name }: { name: string }) {
  const { formatMessage } = useIntl()
  const lineName = `${name}.line`
  const { value, onChange } = useField(lineName).input
  const { value: typeValue } = useField(`${name}.type`).input

  useEffect(() => {
    if (
      !Array.isArray(value) &&
      new RegExp(`${QuestionType.MultipleTextBox}|${QuestionType.MultipleDropdown}`).test(typeValue)
    ) {
      onChange(['', ''])
    }
  }, [onChange, value, typeValue])
  const handleAdd = useCallback(() => onChange([...value, '']), [onChange, value])

  return (
    <InputRow title={formatMessage(messages.line)} alignItems='flex-start'>
      <Grid container direction='column'>
        <Field name={lineName} subscription={{ value: true }}>
          {({ input: { value } }: { input: { value: any } }) =>
            Array.isArray(value)
              ? value.map((_: string, idx: number) => (
                  <Field
                    key={idx}
                    name={`${lineName}[${idx}]`}
                    component={TextInputAdapter}
                    className='long lineField'
                    placeholder={formatMessage(messages.inputAnswer)}
                  />
                ))
              : null
          }
        </Field>
        <Button
          classnames='addLineButton'
          theme={Theme.DARK_BORDER}
          icon={AddIcon}
          buttonText={formatMessage(messages.addLine)}
          onClick={handleAdd}
        />
      </Grid>
    </InputRow>
  )
}
