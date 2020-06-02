import { FieldMetaState } from 'react-final-form'

export const composeValidators = (...validators: ((data: any) => any)[]) => (value: any) =>
  validators.reduce((error, validator) => error || validator(value), undefined)

export const required = (value: any) => (!value || !/.+/.test(value) ? 'Required' : undefined)
export const submitForm = (formRef: React.RefObject<HTMLFormElement>) =>
  formRef.current?.dispatchEvent(new Event('submit', { cancelable: true }))

export const checkError = (meta: FieldMetaState<any>) => (meta.error && meta.touched ? meta.error : undefined)

export const validDateTime = (dateTime: string) =>
  new RegExp('^\\d{4}-\\d{2}-\\d{2} \\d{2}:\\d{2}$', 'i').test(dateTime)

export const isValidDuration = (start: string, end: string) => new Date(end).getTime() >= new Date(start).getTime()
