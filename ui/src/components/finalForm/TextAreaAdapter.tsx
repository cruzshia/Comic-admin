import React from 'react'
import { FieldRenderProps } from 'react-final-form'
import { TextArea } from '@src/components/form'
import { checkError } from '@src/utils/validation'

export default function TextFieldAdapter({ input, meta, ...rest }: FieldRenderProps<string>) {
  return <TextArea {...input} {...rest} error={checkError(meta)} />
}
