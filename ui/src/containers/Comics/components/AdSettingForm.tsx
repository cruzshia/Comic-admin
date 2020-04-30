import React, { useCallback } from 'react'
import { useIntl } from 'react-intl'
import { Field, useField } from 'react-final-form'
import { Box, makeStyles } from '@material-ui/core'
import SelectAdapter from '@src/components/finalForm/SelectAdapter'
import DataTable from '@src/components/table/DataTable'
import Button, { Theme } from '@src/components/Button/Button'
import { ReactComponent as ArrowIcon } from '@src/assets/common/arrow_forward.svg'
import { ReactComponent as AddIcon } from '@src/assets/common/add_circle.svg'
import { AdCategory } from '@src/reducers/comics/constant'
import commonMessages from '@src/messages'
import comicMessages from '../messages'
import { DnDProp } from './useDnD'
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
  const { value: openArr, onChange: openOnChange } = useField(`${adKey}.${AdCategory.Opening}`).input
  const { value: contentArr, onChange: contentOnChange } = useField(`${adKey}.${AdCategory.Content}`).input
  const inputs = {
    [AdCategory.Content]: {
      value: contentArr,
      onChange: contentOnChange
    },
    [AdCategory.Opening]: {
      value: openArr,
      onChange: openOnChange
    }
  }

  const createDeleteHandler = (name: AdCategory, idx: number) => () => {
    const { value, onChange } = inputs[name]
    value.splice(idx, 1)
    onChange([...value])
  }

  const handleAdd = useCallback(() => contentOnChange(contentArr.concat([{}])), [contentArr, contentOnChange])

  const handleDrop = useCallback(
    ({ dragName, dragIndex, dropName, dropIndex }: DnDProp) => {
      const { value: dragValue, onChange: dragOnChange } = inputs[dragName]
      const { value: dropValue, onChange: dropOnChange } = inputs[dropName]
      if (dragName === dropName) {
        const tmpA = dragValue[dragIndex]
        dragValue[dragIndex] = dragValue[dropIndex]
        dragValue[dropIndex] = tmpA
        dragOnChange([...dragValue])
        return
      }
      const drag = dragValue[dragIndex]
      dragValue.splice(dragIndex, 1)
      dropValue.splice(dropIndex, 0, drag)
      dragOnChange([...dragValue])
      dropOnChange([...dropValue])
    },
    [inputs]
  )

  function genFieldArray(type: AdCategory) {
    return inputs[type]?.value?.map((_: any, idx: number) => (
      <React.Fragment key={idx}>
        <Advertisement
          dndIdx={idx}
          type={type}
          name={`${adKey}.${type}[${idx}]`}
          onDelete={createDeleteHandler(type, idx)}
          onDrop={handleDrop}
        />
        {idx !== inputs[type].value.length - 1 && Arrow}
      </React.Fragment>
    ))
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
          {genFieldArray(AdCategory.Opening)}
          {inputs[AdCategory.Opening]?.value.length > 0 && Arrow}
          <ContentLabel />
          {Arrow}
          {genFieldArray(AdCategory.Content)}
          <Button
            classnames={classes.button}
            theme={Theme.DARK_BORDER}
            icon={AddIcon}
            buttonText={formatMessage(comicMessages.addAds)}
            onClick={handleAdd}
          />
        </Box>
      )
    }
  ]
  return <DataTable title={tableTitle} dataSet={dataSet} innerRef={adSettingRef} marginBottom={marginBottom} />
}
