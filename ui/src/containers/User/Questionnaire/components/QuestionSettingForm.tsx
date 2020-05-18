import React, { useCallback } from 'react'
import { useIntl } from 'react-intl'
import { useField } from 'react-final-form'
import { Box, makeStyles } from '@material-ui/core'
import Button, { Theme } from '@src/components/Button/Button'
import { ReactComponent as ArrowIcon } from '@src/assets/common/arrow_forward.svg'
import { ReactComponent as AddIcon } from '@src/assets/common/add_circle.svg'
import DataTable from '@src/components/table/DataTable'
import { Question as QuestionModel } from '@src/models/user/questionnaire'
import { DnDProp } from './useDnD'
import messages from '../messages'
import Question from './Question/Question'

const useStyle = makeStyles({
  button: {
    marginTop: '30px'
  }
})

const Arrow = (
  <Box height={20} margin='10px 0 10px 85px'>
    <ArrowIcon />
  </Box>
)

export default function QuestionSettingForm({ name }: { name: string }) {
  const classes = useStyle()
  const { formatMessage } = useIntl()
  const { value: questionArr, onChange: questionOnChange } = useField(name).input

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

  function genFieldArray(questionArr: QuestionModel[]) {
    return questionArr.map((question: QuestionModel, idx: number) => (
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
