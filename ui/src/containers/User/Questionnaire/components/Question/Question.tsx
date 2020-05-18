import React, { useMemo, useEffect } from 'react'
import { useIntl } from 'react-intl'
import { Field, useField } from 'react-final-form'
import { makeStyles, Grid } from '@material-ui/core'
import { TextInputAdapter, SelectAdapter } from '@src/components/finalForm'
import InputBlock, { InputRow } from '@src/components/InputBlock'
import Condition from '@src/components/finalForm/Condition'
import useDnD, { DnDProp } from '../useDnD'
import messages from '../../messages'
import { QuestionType } from '../../utils'
import { InputAnswerLimit, InputOptions, InputLine } from './QuestionInputs'

export interface QuestionProps {
  dndIdx?: number
  name: string
  onDelete?: () => void
  onDrop?: (props: DnDProp) => void
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

export default function Question({ dndIdx, name, onDelete, onDrop }: QuestionProps) {
  const { formatMessage } = useIntl()
  const classes = useStyle()
  const { value } = useField(`${name}.type`).input
  const { onChange: lineOnChange } = useField(`${name}.line`).input
  const dndProp = useDnD({
    accept: 'question',
    index: dndIdx || 0,
    onDrop
  })

  useEffect(() => {
    if (new RegExp(`^((?!(${QuestionType.MultipleTextBox}|${QuestionType.MultipleDropdown})).)*$`).test(value)) {
      lineOnChange(undefined)
    }
  }, [lineOnChange, value])

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
    <InputBlock onDelete={onDelete} dndProp={dndProp} key={name}>
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
          <Field name={`${name}.type`} component={SelectAdapter} options={TYPE_OPTIONS} />
        </InputRow>

        <Condition when={`${name}.type`} is={QuestionType.MultipleDropdown}>
          <InputLine name={`${name}`} />
          <InputOptions name={name} />
          <InputAnswerLimit name={name} limitType='answerLimit' />
        </Condition>

        <Condition when={`${name}.type`} is={QuestionType.DropDown}>
          <InputOptions name={name} />
          <InputAnswerLimit name={name} limitType='answerLimit' />
        </Condition>

        <Condition when={`${name}.type`} is={QuestionType.TextBoxSingleLine}>
          <InputAnswerLimit name={name} limitType='inputLimit' />
        </Condition>

        <Condition when={`${name}.type`} is={QuestionType.MultipleTextBox}>
          <InputRow title={formatMessage(messages.optionShuffle)}>
            <Field name={`${name}.optionShuffle`} component={SelectAdapter} isShort options={[]} />
          </InputRow>
          <InputLine name={name} />
          <InputRow title={formatMessage(messages.answerLimit)}>
            <Field name={`${name}.actionLimit`} component={SelectAdapter} isShort options={[]} />
          </InputRow>
          <InputAnswerLimit name={name} limitType='inputLimit' />
        </Condition>

        <Condition when={`${name}.type`} is={QuestionType.RadioButton}>
          <InputOptions name={name} />
        </Condition>

        <Condition when={`${name}.type`} is={QuestionType.TextBoxMultipleLine}>
          <InputAnswerLimit name={name} limitType='inputLimit' />
        </Condition>

        {Object.values(QuestionType).includes(value) && (
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
