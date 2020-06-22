import React from 'react'
import { Grid } from '@material-ui/core'
import App from '@src/models/comics/app'
import LabelCheckbox from './LabelCheckbox'

interface Props {
  name: string
  options: App[]
}

export default function CheckboxGroupMUI({ name, options }: Props) {
  return (
    <Grid container alignItems='center'>
      {options.map(({ id, name: optionLabel }) => (
        <LabelCheckbox key={id} name={name} value={id} label={optionLabel} />
      ))}
    </Grid>
  )
}
