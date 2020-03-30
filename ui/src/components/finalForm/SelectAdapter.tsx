import React from 'react'
import { FieldRenderProps } from 'react-final-form'
import Select from '@src/components/form/Select'
import { checkError } from '@src/utils/validation'

export default function SelectAdapter({ input, meta, options, ...rest }: FieldRenderProps<string>) {
  return <Select {...input} {...rest} options={options} error={checkError(meta)} />
}
