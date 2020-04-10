import React from 'react'
import { FieldRenderProps } from 'react-final-form'
import AmountInput from '@src/components/form/AmountInput'
import { checkError } from '@src/utils/validation'

export default function AmountInputAdapter({ input, meta, ...rest }: FieldRenderProps<string>) {
  return <AmountInput {...input} {...rest} error={checkError(meta)} />
}
