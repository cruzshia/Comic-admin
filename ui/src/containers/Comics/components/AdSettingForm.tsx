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
import AdsModel, { AdPosition, AdSettingKeys } from '@src/models/comics/advertisement'
import { _uuid } from '@src/utils/functions'
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
  <Box height={20} margin='10px 0 10px 85px' data-testid='arrow-icon'>
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
  const { fields: fieldsFront } = useFieldArray<AdsModel>(`${adKey}.${AdPosition.Front}`)
  const { fields: fieldsBack } = useFieldArray<AdsModel>(`${adKey}.${AdPosition.Back}`)
  const ads = {
    [AdPosition.Front]: fieldsFront,
    [AdPosition.Back]: fieldsBack
  }

  const handleDragEnd = (result: any) => {
    if (!result.destination) return
    const { index: sourceIndex, droppableId: sourceDragId } = result.source
    const { index: targetIndex, droppableId: targetDragId } = result.destination
    const [sourceFields, targetFields] = [ads[sourceDragId as AdPosition], ads[targetDragId as AdPosition]]
    if (sourceDragId !== targetDragId) {
      targetFields.insert(targetIndex, sourceFields.value[sourceIndex])
      sourceFields.remove(sourceIndex)
      return
    }
    sourceFields.swap(sourceIndex, targetIndex)
  }

  const createDelete = (type: AdPosition, idx: number) => () => ads[type].remove(idx)
  const handleAdd = () =>
    fieldsBack.push({
      [AdSettingKeys.ID]: _uuid()
    } as any)

  const genDroppableBlock = (type: AdPosition) => {
    const fields = ads[type]
    return (
      <Droppable droppableId={type}>
        {provided => {
          const { value } = fields
          return (
            <div ref={provided.innerRef}>
              {fields.map((name, index) => {
                return (
                  <React.Fragment key={name}>
                    <Draggable draggableId={name} index={index}>
                      {provided => (
                        <div
                          key={value[index][AdSettingKeys.ID]}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <Advertisement name={name} onDelete={createDelete(type, index)} />
                        </div>
                      )}
                    </Draggable>
                    {index <= value.length - (type === AdPosition.Front ? 1 : 2) && Arrow}
                  </React.Fragment>
                )
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
          name={`${adKey}.${AdSettingKeys.AdDevice}`}
          component={SelectAdapter}
          options={[
            { label: 1, value: 1 },
            { label: 'iOS', value: 'ios' }
          ]}
          isShort
          placeholder={formatMessage(commonMessages.common)}
        />
      )
    },
    {
      label: tableTitle,
      content: (
        <Box paddingBottom='30px'>
          <DragDropContext onDragEnd={handleDragEnd}>
            {genDroppableBlock(AdPosition.Front)}
            <ContentLabel />
            {fieldsBack.value.length > 0 && Arrow}
            {genDroppableBlock(AdPosition.Back)}
            <Button
              classnames={classes.button}
              theme={Theme.DARK_BORDER}
              icon={AddIcon}
              buttonText={formatMessage(comicMessages.addAds)}
              onClick={handleAdd}
            />
          </DragDropContext>
        </Box>
      )
    }
  ]
  return <DataTable title={tableTitle} dataSet={dataSet} innerRef={adSettingRef} marginBottom={marginBottom} />
}
