import { FieldMetaState } from 'react-final-form'

export const composeValidators = (...validators: ((data: any) => any)[]) => (value: any) =>
  validators.reduce((error, validator) => error || validator(value), undefined)

export const required = (value: any) => (value && (value.length > 1 || !isNaN(value)) ? undefined : 'Required')

export const submitForm = (formRef: React.RefObject<HTMLFormElement>) =>
  formRef.current?.dispatchEvent(new Event('submit', { cancelable: true }))
export const checkError = (meta: FieldMetaState<any>) => {
  return meta.error && meta.touched ? meta.error : undefined
}

export const validDateTime = (dateTime: string) =>
  new RegExp('^\\d{4}-\\d{2}-\\d{2} \\d{2}:\\d{2}$', 'i').test(dateTime)
