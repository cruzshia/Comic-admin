import { FieldMetaState } from 'react-final-form'
import dayjs from 'dayjs'

export const composeValidators = (...validators: ((data: any) => any)[]) => (value: any) =>
  validators.reduce((error, validator) => error || validator(value), undefined)

export const CHARACTER_LIMIT = 255
export const TEXT_LIMIT = 4000
export const DESCRIPTION_LIMIT = 1000
export const INVALID_FORMAT = '形式に誤りがあります'
export const INVALID_DURATION = '期間の指定が正しくありません。'
export const SHOULD_GREATER_THAN_NOW = 'Time should greater than now'
export const tooLongError = (length: number) => `${length}文字以内で入力してください`

export const required = (value: any) =>
  typeof value !== 'boolean' && (!value || !/.+/.test(value)) ? '項目が入力されていません' : undefined

export const submitForm = (formRef: React.RefObject<HTMLFormElement>) =>
  formRef.current?.dispatchEvent(new Event('submit', { cancelable: true }))

export const checkError = (meta: FieldMetaState<any>) => {
  const error = meta.error || meta.submitError
  return error && meta.touched ? error : undefined
}

export const validPositiveInteger = (number: any) => (/^\d+$/i.test(number) ? undefined : INVALID_FORMAT)

export const validDateTime = (dateTime: string) =>
  /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/i.test(dateTime) ? undefined : INVALID_FORMAT

export const isValidDuration = (start: string, end: string) =>
  new Date(end).getTime() >= new Date(start).getTime() ? undefined : INVALID_DURATION
export const isValidLength = (length: number) => (data: string | number) =>
  new RegExp(`^.{1,${length}}$`, 'ig').test(String(data)) ? undefined : tooLongError(length)

export const isGreaterThanNow = (dateTime: string) =>
  dayjs(dateTime, 'YYYY-MM-DD HH:mm').isAfter(dayjs()) ? undefined : SHOULD_GREATER_THAN_NOW
