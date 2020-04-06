import React from 'react'
import { FieldRenderProps } from 'react-final-form'
import SearchInput from '@src/components/form/SearchInput'
import { checkError } from '@src/utils/validation'

export default function SearchInputAdapter({ input, meta, ...rest }: FieldRenderProps<string>) {
  return <SearchInput {...input} error={checkError(meta)} {...rest} />
}
