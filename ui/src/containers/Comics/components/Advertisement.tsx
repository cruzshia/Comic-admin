import React, { useCallback, useState, useMemo } from 'react'
import { useIntl } from 'react-intl'
import { Field, useField } from 'react-final-form'
import { Grid, makeStyles } from '@material-ui/core'
import InputBlock, { InputRow } from '@src/components/InputBlock'
import { TimeSpanInput, ImagePreview } from '@src/components/form'
import { SelectAdapter, TextInputAdapter } from '@src/components/finalForm'
import Button from '@src/components/Button/Button'
import Condition from '@src/components/finalForm/Condition'
import { AdType, AdSettingKeys } from '@src/models/comics/advertisement'
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
          <InputRow title={formatMessage(deliveryDuration)} children={<TimeSpanInput />} />
        </Condition>
      </Grid>
      {isOriginal && <ImagePreview imageUrl={previewImage} />}
    </InputBlock>
  )
}
