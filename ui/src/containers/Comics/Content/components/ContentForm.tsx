import React from 'react'
import { Form } from 'react-final-form'
import arrayMutators from 'final-form-arrays'
import AdSettingCreation from '../../components/AdSettingForm'

interface Props {
  onFormSubmit: (data: {}) => void
  formRef?: React.RefObject<HTMLFormElement> | null
}
export default function ContentForm({ onFormSubmit, formRef }: Props) {
  return (
    <>
      <Form
        onSubmit={onFormSubmit}
        mutators={{ ...arrayMutators }}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit} ref={formRef}>
            <AdSettingCreation />
          </form>
        )}
      ></Form>
    </>
  )
}
