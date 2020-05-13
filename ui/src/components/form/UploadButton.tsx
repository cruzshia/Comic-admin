import React, { useRef, useCallback } from 'react'
import { Field, useField } from 'react-final-form'
import { makeStyles, Grid } from '@material-ui/core'
import Button, { Theme } from '@src/components/Button/Button'
import FailedMsg from '../styled/FailedMsg'

interface Props {
  text: string
  name: string
  accept?: string
  theme?: Theme
  validate?: (value: any) => any
}

const useStyle = makeStyles({
  container: {
    marginBottom: '10px'
  },
  button: {
    marginRight: '15px'
  },
  input: {
    display: 'none'
  }
})

export default function UploadButton({ text, name, theme, accept, validate }: Props) {
  const classes = useStyle()
  const inputRef = useRef<HTMLInputElement>(null)
  const {
    input: { value, onChange },
    meta: { error }
  } = useField(name)
  const handleChange = useCallback(
    ({ currentTarget }: React.ChangeEvent<HTMLInputElement>) => {
      onChange(currentTarget.files ? currentTarget.files[0] : '')
    },
    [onChange]
  )

  return (
    <>
      <Grid className={error ? classes.container : ''} container alignItems='center'>
        <Button
          classnames={classes.button}
          theme={theme}
          buttonText={text}
          onClick={() => {
            inputRef.current?.click()
          }}
        />
        <Field
          name={name}
          type='file'
          validate={validate}
          render={({ input: { value, ...inputProps } }) => (
            <input className={classes.input} {...inputProps} accept={accept} onChange={handleChange} ref={inputRef} />
          )}
        />
        {value?.name}
      </Grid>
      {error && <FailedMsg msg={error} />}
    </>
  )
}
