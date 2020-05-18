import React from 'react'
import { Field } from 'react-final-form'

// reference: https://codesandbox.io/s/lm4p3m92q
export default function Condition({
  when,
  is,
  children
}: {
  when: string
  is: any
  children: JSX.Element[] | JSX.Element
}) {
  return (
    <Field name={when} subscription={{ value: true }}>
      {({ input: { value } }) => (value === is ? children : <></>)}
    </Field>
  )
}
