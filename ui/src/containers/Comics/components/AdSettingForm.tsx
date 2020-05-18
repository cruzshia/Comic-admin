import React from 'react'
import { useIntl } from 'react-intl'
import { Field } from 'react-final-form'
import { useFieldArray } from 'react-final-form-arrays'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { Box, makeStyles } from '@material-ui/core'
import SelectAdapter from '@src/components/finalForm/SelectAdapter'
import DataTable from '@src/components/table/DataTable'
import Button, { Theme } from '@src/components/Button/Button'
import { ReactComponent as ArrowIcon } from '@src/assets/common/arrow_forward.svg'
import { ReactComponent as AddIcon } from '@src/assets/common/add_circle.svg'
import AdsModel, { AdType } from '@src/models/comics/advertisement'
import commonMessages from '@src/messages'
import comicMessages from '../messages'
import Advertisement from './Advertisement'
import ContentLabel from './ContentLabel'

interface Props {
  adKey?: string
  adSettingRef?: React.RefObject<HTMLDivElement>
  marginBottom?: boolean
}

const Arrow = (
  <Box height={20} margin='10px 0 10px 85px'>
    <ArrowIcon />
  </Box>
)

const useStyle = makeStyles({
  button: {
    marginTop: '30px'
  }
})

const DEFAULT_ADS_KEY = 'advertisement'

export default function AdSettingForm({ adKey = DEFAULT_ADS_KEY, adSettingRef, marginBottom }: Props) {
  const classes = useStyle()
  const { formatMessage } = useIntl()
  const { fields } = useFieldArray<AdsModel>(adKey)

  const makeOnDragEndFunction = (fields: any) => (result: any) => {
    if (!result.destination) return
    fields.update(result.source.index, {
      ...fields.value[result.source.index],
      type: result.destination.droppableId
    })
    const targetIdx = (result.destination.index -=
      result.destination.droppableId === AdType.Content && result.source.droppableId === AdType.Opening ? 1 : 0)
    fields.move(result.source.index, targetIdx)
  }

  const createDelete = (fields: any, idx: number) => () => fields.remove(idx)
  const createAdd = (fields: any) => () => fields.push({ type: AdType.Content })

  const LabelWithArrow = () => (
    <>
      <ContentLabel />
      {Arrow}
    </>
  )

  const genDroppableBlock = (type: AdType) => {
    return (
      <Droppable droppableId={type}>
        {provided => {
          const { value } = fields
          return (
            <div ref={provided.innerRef}>
              {fields.map((name, index) => {
                return value[index].type === type ? (
                  <React.Fragment key={name}>
                    <Draggable draggableId={name} index={index}>
                      {provided => (
                        <div
                          key={name}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <Advertisement type={value[index].type} name={name} onDelete={createDelete(fields, index)} />
                        </div>
                      )}
                    </Draggable>
                    {index < value.length - 1 && Arrow}
                  </React.Fragment>
                ) : null
              })}
              {provided.placeholder}
            </div>
          )
        }}
      </Droppable>
    )
  }

  const tableTitle = formatMessage(commonMessages.advertisementSetting)
  const dataSet = [
    {
      label: formatMessage(commonMessages.deviceCategory),
      content: (
        <Field
          name='device'
          component={SelectAdapter}
          options={[{ label: 1, value: 1 }]}
          isShort
          placeholder={formatMessage(commonMessages.common)}
        />
      )
    },
    {
      label: tableTitle,
      content: (
        <Box paddingBottom='30px'>
          <DragDropContext onDragEnd={makeOnDragEndFunction(fields)}>
            {genDroppableBlock(AdType.Opening)}
            <LabelWithArrow />
            {genDroppableBlock(AdType.Content)}
            <Button
              classnames={classes.button}
              theme={Theme.DARK_BORDER}
              icon={AddIcon}
              buttonText={formatMessage(comicMessages.addAds)}
              onClick={createAdd(fields)}
            />
          </DragDropContext>
        </Box>
      )
    }
  ]
  return <DataTable title={tableTitle} dataSet={dataSet} innerRef={adSettingRef} marginBottom={marginBottom} />
}
