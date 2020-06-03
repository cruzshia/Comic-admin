import { FieldMetaState } from 'react-final-form'

export const composeValidators = (...validators: ((data: any) => any)[]) => (value: any) =>
  validators.reduce((error, validator) => error || validator(value), undefined)

export const CHARACTER_LIMIT = 200
export const TEXT_LIMIT = 4000
export const INVALID_FORMAT = '形式に誤りがあります'
export const tooLongError = (length: number) => `${length}文字以内で入力してください`

export const required = (value: any) =>
  value === undefined || value === null || !/.+/.test(value) ? '項目が入力されていません' : undefined
export const submitForm = (formRef: React.RefObject<HTMLFormElement>) =>
  formRef.current?.dispatchEvent(new Event('submit', { cancelable: true }))

export const checkError = (meta: FieldMetaState<any>) => (meta.error && meta.touched ? meta.error : undefined)

export const validDateTime = (dateTime: string) =>
  new RegExp('^\\d{4}-\\d{2}-\\d{2} \\d{2}:\\d{2}$', 'i').test(dateTime)

export const isValidDuration = (start: string, end: string) => new Date(end).getTime() >= new Date(start).getTime()
export const isValidLength = (length: number, data: string | number) =>
  new RegExp(`^.{1,${length}}$`, 'ig').test(String(data)) ? undefined : tooLongError(length)
