import React, { useMemo, useEffect } from 'react'
import { useIntl } from 'react-intl'
import { Field, useField } from 'react-final-form'
import { makeStyles, Grid } from '@material-ui/core'
import { TextInputAdapter, SelectAdapter } from '@src/components/finalForm'
import InputBlock, { InputRow } from '@src/components/InputBlock'
import Condition from '@src/components/finalForm/Condition'
import messages from '../messages'
import { QuestionType } from '../utils'
import { InputAnswerLimit, InputOptions, InputLine, InputLimit } from './QuestionInputs'

export interface QuestionProps {
  name: string
  onDelete?: () => void
}

const useStyle = makeStyles({
  rowContainer: {
    maxWidth: 700,
    '& .MuiOutlinedInput-root.long': {
      maxWidth: 'unset'
    },
    '& .addLineButton': {
      maxWidth: '155px'
    },
    '& .lineField': {
      marginBottom: '10px'
    },
    '& .limitCount': {
      marginLeft: '10px'
    }
  }
})

export default function Question({ name, onDelete }: QuestionProps) {
  const TYPE_NAME = `${name}.type`
  const { formatMessage } = useIntl()
  const classes = useStyle()
  const { value: typeValue = '' } = useField(TYPE_NAME).input
  const { onChange: onLineChange } = useField(`${name}.line`).input

  useEffect(() => {
    if (new RegExp(`^((?!(${QuestionType.MultipleTextBox}|${QuestionType.MultipleDropdown})).)*$`).test(typeValue)) {
      onLineChange(undefined)
    }
  }, [onLineChange, typeValue])

  const TYPE_OPTIONS = useMemo(
    () => [
      {
        label: formatMessage(messages.multipleDropdown),
        value: QuestionType.MultipleDropdown
      },
      {
        label: formatMessage(messages.dropDown),
        value: QuestionType.DropDown
      },
      {
        label: formatMessage(messages.textBoxSingleLine),
        value: QuestionType.TextBoxSingleLine
      },
      {
        label: formatMessage(messages.textBoxMultipleLine),
        value: QuestionType.TextBoxMultipleLine
      },
      {
        label: formatMessage(messages.multipleTextBox),
        value: QuestionType.MultipleTextBox
      },
      {
        label: formatMessage(messages.radioButton),
        value: QuestionType.RadioButton
      }
    ],
    [formatMessage]
  )

  return (
    <InputBlock onDelete={onDelete} key={name}>
      <Grid container direction='row' className={classes.rowContainer}>
        <InputRow title={formatMessage(messages.questionContent)}>
          <Field
            name={`${name}.content`}
            component={TextInputAdapter}
            className='long'
            placeholder={formatMessage(messages.inputQuestion)}
          />
        </InputRow>
        <InputRow title={formatMessage(messages.answerRequired)}>
          <Field name={`${name}.required`} component={SelectAdapter} options={[]} isShort />
        </InputRow>
        <InputRow title={formatMessage(messages.questionType)}>
          <Field name={TYPE_NAME} component={SelectAdapter} options={TYPE_OPTIONS} />
        </InputRow>

        <Condition when={TYPE_NAME} is={QuestionType.MultipleDropdown}>
          <InputLine name={name} />
          <InputOptions name={name} />
          <InputAnswerLimit name={name} limitType={InputLimit.Answer} />
        </Condition>

        <Condition when={TYPE_NAME} is={QuestionType.DropDown}>
          <InputOptions name={name} />
          <InputAnswerLimit name={name} limitType={InputLimit.Answer} />
        </Condition>

        <Condition when={TYPE_NAME} is={QuestionType.TextBoxSingleLine}>
          <InputAnswerLimit name={name} limitType={InputLimit.Input} />
        </Condition>

        <Condition when={TYPE_NAME} is={QuestionType.MultipleTextBox}>
          <InputRow title={formatMessage(messages.optionShuffle)}>
            <Field name={`${name}.optionShuffle`} component={SelectAdapter} isShort options={[]} />
          </InputRow>
          <InputLine name={name} />
          <InputRow title={formatMessage(messages.answerLimit)}>
            <Field name={`${name}.actionLimit`} component={SelectAdapter} isShort options={[]} />
          </InputRow>
          <InputAnswerLimit name={name} limitType={InputLimit.Input} />
        </Condition>

        <Condition when={TYPE_NAME} is={QuestionType.RadioButton}>
          <InputOptions name={name} />
        </Condition>

        <Condition when={TYPE_NAME} is={QuestionType.TextBoxMultipleLine}>
          <InputAnswerLimit name={name} limitType={InputLimit.Input} />
        </Condition>

        {typeValue !== '' && (
          <InputRow title={formatMessage(messages.answerRequirement)}>
            <Field
              name={`${name}.answerRequirement`}
              component={SelectAdapter}
              options={[]}
              placeholder={formatMessage(messages.selectQuestion)}
            />
          </InputRow>
        )}
      </Grid>
    </InputBlock>
  )
}
