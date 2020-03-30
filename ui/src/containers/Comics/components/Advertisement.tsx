import React, { useCallback, useState, useMemo } from 'react'
import { useIntl } from 'react-intl'
import { Field, useField } from 'react-final-form'
import { Grid, Typography, Box } from '@material-ui/core'
import { TimeSpanInput } from '@src/components/form'
import { SelectAdapter, TextInputAdapter } from '@src/components/finalForm'
import Button from '@src/components/Button/Button'
import Condition from '@src/components/finalForm/Condition'
import menuIcon from '@src/assets/common/menu.svg'
import closeIcon from '@src/assets/common/close.svg'
import commonMessages from '@src/messages'
import messages from '../messages'
import useAdStyle from './useAdStyle'
import clsx from 'clsx'

interface Props {
  name: string
  onDelete?: () => void
}

interface RowProps {
  title: string | JSX.Element
  classnames?: string
  children: React.ReactNode
}

export enum AdType {
  Original = 'original',
  Map = 'map',
  Admob = 'admob'
}

function AdDataRow({ title, classnames, children }: RowProps) {
  const classes = useAdStyle()
  return (
    <Grid className={clsx(classes.row, classnames)} container direction='row' alignItems='center'>
      <Typography className={classes.label} variant='body1'>
        {title}
      </Typography>
      <Box fontWeight='normal' display='flex'>
        {children}
      </Box>
    </Grid>
  )
}

export default function Advertisement({ name, onDelete }: Props) {
  const classes = useAdStyle()
  const { formatMessage } = useIntl()
  const [previewImage, setPreviewImage] = useState<string | undefined>()
  const { preview, enterUrl, enterButtonName, deliveryDuration } = commonMessages
  const urlPlaceholder = formatMessage(enterUrl)
  const image = useField(`${name}.imageUrl`).input.value
  const isOriginal = useField(`${name}.adCategory`).input.value === AdType.Original

  const AD_OPTIONS = useMemo(
    () => [
      {
        label: formatMessage(messages.adOriginal),
        value: AdType.Original
      },
      {
        label: formatMessage(messages.adAdmob),
        value: AdType.Admob
      },
      {
        label: formatMessage(messages.adMap),
        value: AdType.Map
      }
    ],
    [formatMessage]
  )

  const handleClick = useCallback(() => {
    setPreviewImage(image)
  }, [setPreviewImage, image])
  const handleImageError = useCallback(() => {
    setPreviewImage(undefined)
  }, [setPreviewImage])

  return (
    <div className={clsx(classes.root, { min_height: isOriginal })}>
      <Grid container>
        <img className={classes.menu} src={menuIcon} alt='menu' />
        <img className={classes.delete} onClick={onDelete} src={closeIcon} alt='del' data-testid='del-ico' />
        <Grid className={classes.rowContainer} container direction='row'>
          <AdDataRow title={formatMessage(messages.adCategory)} classnames={!isOriginal ? classes.lastRow : ''}>
            <Field name={`${name}.adCategory`} component={SelectAdapter} options={AD_OPTIONS} />
          </AdDataRow>
          <Condition when={`${name}.adCategory`} is={AdType.Original}>
            <AdDataRow title={formatMessage(messages.imageUrl)}>
              <Field name={`${name}.imageUrl`} component={TextInputAdapter} placeholder={urlPlaceholder} />
              <Button buttonText={formatMessage(preview)} classnames={classes.button} onClick={handleClick} />
            </AdDataRow>
            <AdDataRow title={formatMessage(messages.link)}>
              <Field name={`${name}.link`} component={TextInputAdapter} placeholder={urlPlaceholder} />
            </AdDataRow>
            <AdDataRow title={formatMessage(messages.buttonName)}>
              <Field
                name={`${name}.buttonName`}
                component={TextInputAdapter}
                placeholder={formatMessage(enterButtonName)}
              />
            </AdDataRow>
            <AdDataRow title={formatMessage(deliveryDuration)} children={<TimeSpanInput />} />
          </Condition>
        </Grid>
        {isOriginal && (
          <div className={clsx(classes.preview, { no_border: !!previewImage })} data-testid='preview-block'>
            {previewImage && (
              <img src={previewImage} alt='preview' onError={handleImageError} data-testid='preview-image' />
            )}
          </div>
        )}
      </Grid>
    </div>
  )
}
