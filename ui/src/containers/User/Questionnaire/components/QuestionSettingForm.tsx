import React from 'react'
import { useIntl } from 'react-intl'
import { useFieldArray } from 'react-final-form-arrays'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { Box, makeStyles } from '@material-ui/core'
import Button, { Theme } from '@src/components/Button/Button'
import { ReactComponent as ArrowIcon } from '@src/assets/common/arrow_forward.svg'
import { ReactComponent as AddIcon } from '@src/assets/common/add_circle.svg'
import DataTable from '@src/components/table/DataTable'
import { Question as QuestionModel } from '@src/models/user/questionnaire'
import messages from '../messages'
import Question from './Question'

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
  const { fields } = useFieldArray<QuestionModel>(name)

  const createDeleteHandler = (idx: number) => () => fields.remove(idx)
  const handleDragEnd = (result: any) => {
    if (!result.destination) return
    fields.swap(result.source.index, result.destination.index)
  }

  const handleAdd = () => fields.push({})

  return (
    <DataTable
      title={formatMessage(messages.questionSetting)}
      dataSet={[
        {
          label: formatMessage(messages.question),
          content: (
            <Box>
              <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId='questions'>
                  {provided => (
                    <div ref={provided.innerRef}>
                      {fields.map((name, index) => {
                        return (
                          <React.Fragment key={name}>
                            <>
                              <Draggable draggableId={name} index={index}>
                                {provided => (
                                  <div
                                    key={name}
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                  >
                                    <Question name={name} onDelete={createDeleteHandler(index)} />
                                  </div>
                                )}
                              </Draggable>
                              {index !== fields.value.length - 1 && Arrow}
                            </>
                          </React.Fragment>
                        )
                      })}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
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
