import React from 'react'
import { Field } from 'react-final-form'

// reference: https://codesandbox.io/s/lm4p3m92q
interface Props {
  when: string
  is: any
  children: JSX.Element[] | JSX.Element
}
export default function Condition({ when, is, children }: Props) {
  return (
    <Field name={when} subscription={{ value: true, pristine: true }}>
      {({ input: { value } }) => (value === is ? children : <></>)}
    </Field>
  )
}
