import { FieldMetaState } from 'react-final-form'

export const composeValidators = (...validators: ((data: any) => any)[]) => (value: any) =>
  validators.reduce((error, validator) => error || validator(value), undefined)

export const required = (value: any) => (value && value.length > 1 ? undefined : 'Required')

export const checkError = (meta: FieldMetaState<any>) => {
  return meta.error && meta.touched ? meta.error : undefined
}
