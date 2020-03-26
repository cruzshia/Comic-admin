import React, { useCallback, useRef, useState } from 'react'
import { useIntl } from 'react-intl'
import { Form, Field, FieldMetaState } from 'react-final-form'
import { makeStyles } from '@material-ui/core'
import { Grid } from '@material-ui/core'
import { TextInput, Select, TimeSpanInput } from '@src/components/form'
import Button from '@src/components/Button/Button'
import menuIcon from '@src/assets/common/menu.svg'
import closeIcon from '@src/assets/common/close.svg'
import { borderColor } from '@src/common/styles'
import commonMessages from '@src/messages'
import AdDataRow from './AdDataRow'
import messages from '../messages'
import clsx from 'clsx'

interface Props {
  type?: AdType
  initialValue: { [key: string]: any }
  onDelete?: () => void
  onSubmit: (data: any) => void
  formRef?: React.RefObject<HTMLFormElement>
}

export enum AdType {
  Original = 'original',
  Map = 'map',
  Admob = 'Admob'
}

const useStyle = makeStyles(() => ({
  root: {
    position: 'relative',
    width: 920,
    padding: '20px 40px 21px 15px',
    backgroundColor: '#FAFAFA',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.1)',
    borderRadius: '4px',
    '& .min_height': {
      minHeight: 230
    }
  },
  menu: {
    marginRight: '30px'
  },
  delete: {
    position: 'absolute',
    right: '-12px',
    top: '-12px',
    cursor: 'pointer'
  },
  rowContainer: {
    maxWidth: 655
  },
  button: {
    marginLeft: '10px'
  },
  preview: {
    position: 'absolute',
    top: 20,
    right: 40,
    width: 126,
    height: 189,
    border: `1px dashed ${borderColor}`,
    '&.no_border': {
      border: 'none'
    }
  }
}))

export default function Advertisement({ initialValue, type, formRef, onDelete, onSubmit }: Props) {
  const classes = useStyle()
  const { formatMessage } = useIntl()
  const [previewImage, setPreviewImage] = useState<string | undefined>()
  const image = useRef<string>(initialValue.imageUrl)
  const urlPlaceholder = formatMessage(commonMessages.enterUrl)
  const isOriginal = type === AdType.Original
  const checkError = useCallback((meta: FieldMetaState<any>) => {
    return meta.error && meta.touched ? meta.error : undefined
  }, [])

  const handleClick = useCallback(() => {
    setPreviewImage(image.current)
  }, [setPreviewImage, image])
  const handleImageError = useCallback(() => {
    setPreviewImage(undefined)
  }, [setPreviewImage])

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={initialValue}
      render={({ handleSubmit, form, values }) => {
        image.current = values?.imageUrl
        return (
          <form onSubmit={handleSubmit} ref={formRef}>
            <div className={clsx(classes.root, { min_height: isOriginal })}>
              <Grid container>
                <img className={classes.menu} src={menuIcon} alt='menu' />
                <img className={classes.delete} onClick={onDelete} src={closeIcon} alt='del' data-testid='del_ico' />
                <Grid className={classes.rowContainer} container direction='row'>
                  <AdDataRow
                    title={formatMessage(messages.adCategory)}
                    children={
                      <Field name='adCategory'>
                        {({ input, meta }) => <Select {...input} error={checkError(meta)} options={[]} />}
                      </Field>
                    }
                  />
                  {isOriginal && (
                    <>
                      <AdDataRow
                        title={formatMessage(messages.imageUrl)}
                        children={
                          <>
                            <Field name='imageUrl'>
                              {({ input, meta }) => (
                                <TextInput placeholder={urlPlaceholder} {...input} error={checkError(meta)} />
                              )}
                            </Field>
                            <Button
                              buttonText={formatMessage(commonMessages.preview)}
                              classnames={classes.button}
                              onClick={handleClick}
                            />
                          </>
                        }
                      />
                      <AdDataRow
                        title={formatMessage(messages.link)}
                        children={
                          <Field name='link'>
                            {({ input, meta }) => (
                              <TextInput placeholder={urlPlaceholder} {...input} error={checkError(meta)} />
                            )}
                          </Field>
                        }
                      />
                      <AdDataRow
                        title={formatMessage(messages.buttonName)}
                        children={
                          <Field name='buttonName'>
                            {({ input, meta }) => (
                              <TextInput
                                placeholder={formatMessage(commonMessages.enterButtonName)}
                                {...input}
                                error={checkError(meta)}
                              />
                            )}
                          </Field>
                        }
                      />
                      <AdDataRow title={formatMessage(commonMessages.deliveryDuration)} children={<TimeSpanInput />} />
                    </>
                  )}
                </Grid>
                {isOriginal && (
                  <div className={clsx(classes.preview, { no_border: !!previewImage })} data-testid='preview_block'>
                    {previewImage && (
                      <img src={previewImage} alt='preview' onError={handleImageError} data-testid='preview_image' />
                    )}
                  </div>
                )}
              </Grid>
            </div>
          </form>
        )
      }}
    />
  )
}
