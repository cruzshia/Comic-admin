import React, { useCallback, useState, useMemo } from 'react'
import { useIntl } from 'react-intl'
import { Field, useField } from 'react-final-form'
import { Grid, makeStyles } from '@material-ui/core'
import InputBlock, { InputRow } from '@src/components/InputBlock'
import { TimeSpanInput, ImagePreview } from '@src/components/form'
import { SelectAdapter, TextInputAdapter } from '@src/components/finalForm'
import Button from '@src/components/Button/Button'
import Condition from '@src/components/finalForm/Condition'
import {
  AdType,
  AdSetting,
  AdSettingKeys,
  AdPosition,
  Advertisement as AdModel
} from '@src/models/comics/advertisement'
import { required, validDateTime, INVALID_FORMAT } from '@src/utils/validation'
import commonMessages from '@src/messages'
import messages from '../messages'

interface Props {
  type: AdType
  name: string
  onDelete?: () => void
}

const useStyle = makeStyles(() => ({
  rowContainer: {
    maxWidth: 655
  },
  button: {
    marginLeft: '10px'
  },
  lastRow: {
    marginBottom: 0
  }
}))
function validateAdTime(ads?: AdModel[]) {
  return ads?.map(setting => {
    const isOriginal = setting[AdSettingKeys.Type] === AdType.Original
    const [begin, end] = [setting[AdSettingKeys.BeginAt], setting[AdSettingKeys.EndAt]]
    return {
      type: required(setting[AdSettingKeys.Type]),
      [AdSettingKeys.BeginAt]: !isOriginal || (begin && validDateTime(begin!)) ? undefined : INVALID_FORMAT,
      [AdSettingKeys.EndAt]: !isOriginal || (end && validDateTime(end!)) ? undefined : INVALID_FORMAT
    }
  })
}

export function validateAd(adSetting: AdSetting) {
  return {
    [AdSettingKeys.AdDevice]: required(adSetting[AdSettingKeys.AdDevice]),
    [AdPosition.Front]: validateAdTime(adSetting[AdPosition.Front]),
    [AdPosition.Back]: validateAdTime(adSetting[AdPosition.Back])
  }
}

export default function Advertisement({ type, name, onDelete }: Props) {
  const classes = useStyle()
  const { formatMessage } = useIntl()
  const [previewImage, setPreviewImage] = useState<string | undefined>()
  const { preview, enterUrl, enterButtonName, deliveryDuration } = commonMessages
  const urlPlaceholder = formatMessage(enterUrl)
  const image = useField(`${name}.${AdSettingKeys.ImageUrl}`).input.value

  const adType = useField(`${name}.${AdSettingKeys.Type}`).input.value
  const isOriginal = adType === AdType.Original

  const AD_OPTIONS = useMemo(
    () =>
      Object.values(AdType).map(type => ({
        label: formatMessage(messages[type]),
        value: type
      })),
    [formatMessage]
  )

  const handleClick = useCallback(() => {
    setPreviewImage(image)
  }, [setPreviewImage, image])

  return (
    <InputBlock onDelete={onDelete} key={name + adType}>
      <Grid className={classes.rowContainer} container direction='row'>
        <InputRow title={formatMessage(messages.adCategory)} classnames={!isOriginal ? classes.lastRow : ''}>
          <Field name={`${name}.${AdSettingKeys.Type}`} component={SelectAdapter} options={AD_OPTIONS} />
        </InputRow>
        <Condition when={`${name}.${AdSettingKeys.Type}`} is={AdType.Original}>
          <InputRow title={formatMessage(messages.imageUrl)}>
            <Field
              name={`${name}.${AdSettingKeys.ImageUrl}`}
              component={TextInputAdapter}
              placeholder={urlPlaceholder}
            />
            <Button buttonText={formatMessage(preview)} classnames={classes.button} onClick={handleClick} />
          </InputRow>
          <InputRow title={formatMessage(messages.link)}>
            <Field
              name={`${name}.${AdSettingKeys.ActionUrl}`}
              component={TextInputAdapter}
              placeholder={urlPlaceholder}
            />
          </InputRow>
          <InputRow title={formatMessage(messages.buttonName)}>
            <Field
              name={`${name}.${AdSettingKeys.Button}`}
              component={TextInputAdapter}
              placeholder={formatMessage(enterButtonName)}
            />
          </InputRow>
          <InputRow
            title={formatMessage(deliveryDuration)}
            children={
              <TimeSpanInput
                nameStart={`${name}.${AdSettingKeys.BeginAt}`}
                nameEnd={`${name}.${AdSettingKeys.EndAt}`}
              />
            }
          />
        </Condition>
      </Grid>
      {isOriginal && <ImagePreview imageUrl={previewImage} />}
    </InputBlock>
  )
}
