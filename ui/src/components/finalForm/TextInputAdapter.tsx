import React from 'react'
import { FieldRenderProps } from 'react-final-form'
import TextInput from '@src/components/form/TextInput'
import { checkError } from '@src/utils/validation'

export default function TextFieldAdapter({ input, meta, ...rest }: FieldRenderProps<string | number>) {
  return <TextInput {...input} {...rest} error={checkError(meta)} />
}
