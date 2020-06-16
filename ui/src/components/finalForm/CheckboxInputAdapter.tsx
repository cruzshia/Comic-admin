import React from 'react'
import StyledCheckBox from '@src/components/form/StyledCheckBox'
import { FieldRenderProps } from 'react-final-form'
import { checkError } from '@src/utils/validation'

export default function CheckboxInputAdapter({ input, meta, ...rest }: FieldRenderProps<string | number>) {
  return <StyledCheckBox {...input} {...rest} error={checkError(meta)} />
}
