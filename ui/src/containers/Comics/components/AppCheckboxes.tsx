import React, { Fragment } from 'react'
import { Field } from 'react-final-form'
import { Grid, styled } from '@material-ui/core'
import Checkbox from '@src/components/finalForm/CheckboxInputAdapter'
import App from '@src/models/comics/app'

interface Props {
  name: string
  options: App[]
}

const Label = styled('label')({
  display: 'inline-block',
  margin: '0 40px 0 15px'
})

export default function CheckboxGroupMUI({ name, options }: Props) {
  return (
    <Grid container alignItems='center'>
      {options.map(({ id, name: optionLabel }) => (
        <Fragment key={id}>
          <Field name={name} id={`option-${id}`} type='checkbox' component={Checkbox} value={id} />
          <Label htmlFor={`option-${id}`}>{optionLabel}</Label>
        </Fragment>
      ))}
    </Grid>
  )
}
