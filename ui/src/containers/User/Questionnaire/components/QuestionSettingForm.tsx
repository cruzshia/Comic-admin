import React, { useCallback } from 'react'
import { useIntl } from 'react-intl'
import { useField, Field } from 'react-final-form'
import { Box, makeStyles, Grid } from '@material-ui/core'
import Button, { Theme } from '@src/components/Button/Button'
import { ReactComponent as ArrowIcon } from '@src/assets/common/arrow_forward.svg'
import { ReactComponent as AddIcon } from '@src/assets/common/add_circle.svg'
import DataTable from '@src/components/table/DataTable'
import InputBlock, { InputRow } from '@src/components/InputBlock'
import useDnD, { DnDProp } from './useDnD'
import messages from '../messages'
import { TextInputAdapter, SelectAdapter } from '@src/components/finalForm'

interface QuestionProps {
  dndIdx?: number
  name: string
  onDelete?: () => void
  onDrop?: (props: DnDProp) => void
}

const useStyle = makeStyles({
  button: {
    marginTop: '30px'
  }
})

const useBlockStyle = makeStyles({
  rowContainer: {
    maxWidth: 700
  }
})

const Arrow = (
  <Box height={20} margin='10px 0 10px 85px'>
    <ArrowIcon />
  </Box>
)

function Question({ dndIdx, name, onDelete, onDrop }: QuestionProps) {
  const { formatMessage } = useIntl()
  const classes = useBlockStyle()
  const dndProp = useDnD({
    accept: 'question',
    index: dndIdx || 0,
    onDrop
  })
  return (
    <InputBlock onDelete={onDelete} dndProp={dndProp} key={name}>
      <Grid container direction='row' className={classes.rowContainer}>
        <InputRow title={formatMessage(messages.questionContent)}>
          <Field name={`${name}.content`} component={TextInputAdapter} />
        </InputRow>
        <InputRow title={formatMessage(messages.answerRequired)}>
          <Field name={`${name}.required`} component={SelectAdapter} options={[]} isShort />
        </InputRow>
        <InputRow title={formatMessage(messages.questionType)}>
          <Field name={`${name}.type`} component={SelectAdapter} options={[]} />
        </InputRow>
      </Grid>
    </InputBlock>
  )
}

export default function QuestionSettingForm({ name }: { name: string }) {
  const classes = useStyle()
  const { formatMessage } = useIntl()
  const { value, onChange: questionOnChange } = useField(name).input
  const questionArr = value

  const createDeleteHandler = (idx: number) => () => {
    questionArr.splice(idx, 1)
    questionOnChange([...questionArr])
  }

  const handleDrop = useCallback(
    ({ dragIndex, dropIndex }: DnDProp) => {
      questionArr.splice(dropIndex, 0, questionArr.splice(dragIndex, 1)[0])
      questionOnChange([...questionArr])
    },
    [questionArr, questionOnChange]
  )

  function genFieldArray(questionArr: any[]) {
    return questionArr.map((question: any, idx: number) => (
      <React.Fragment key={`${idx}${question?.type}`}>
        <Question dndIdx={idx} name={`${name}[${idx}]`} onDelete={createDeleteHandler(idx)} onDrop={handleDrop} />
        {idx !== questionArr.length - 1 && Arrow}
      </React.Fragment>
    ))
  }

  const handleAdd = useCallback(() => questionOnChange(questionArr.concat([{}])), [questionArr, questionOnChange])

  return (
    <DataTable
      title={formatMessage(messages.questionSetting)}
      dataSet={[
        {
          label: formatMessage(messages.question),
          content: (
            <Box>
              {genFieldArray(questionArr)}
              <Button
                classnames={classes.button}
                theme={Theme.DARK_BORDER}
                icon={AddIcon}
                buttonText={formatMessage(messages.addQuestion)}
                onClick={handleAdd}
              />
            </Box>
          )
        }
      ]}
    />
  )
}
