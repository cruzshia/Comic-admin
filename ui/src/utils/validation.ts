import { FieldMetaState } from 'react-final-form'
import dayjs from 'dayjs'

export const composeValidators = (...validators: ((data: any) => any)[]) => (value: any) =>
  validators.reduce((error, validator) => error || validator(value), undefined)

export const CHARACTER_LIMIT = 255
export const TEXT_LIMIT = 4000
export const DESCRIPTION_LIMIT = 1000
export const URL_LIMIT = 1000
export const INPUT_REQUIRED = '項目が入力されていません'
export const INVALID_FORMAT = '形式に誤りがあります'
export const INVALID_DURATION = '期間の指定が正しくありません。'
export const SHOULD_GREATER_THAN_NOW = 'Time should greater than now'
export const INVALID_JSON = 'Invalid JSON'
export const tooLongError = (length: number) => `${length}文字以内で入力してください`

export const required = (value: any) =>
  typeof value !== 'boolean' && (!value || !/.+/.test(value)) ? INPUT_REQUIRED : undefined

export const submitForm = (formRef: React.RefObject<HTMLFormElement>) =>
  formRef.current?.dispatchEvent(new Event('submit', { cancelable: true }))

export const checkError = (meta: FieldMetaState<any>) => {
  const error = meta.error || meta.submitError
  return error && meta.touched ? error : undefined
}

export const validKana = (value: string) =>
  /^([\u30a0-\u30ff\uff66-\uff9f\u3000\s])$/u.test(value) ? undefined : INVALID_FORMAT

export const validNumberAndCharacter = (value: any) => (/^[a-zA-Z0-9 ]+$/i.test(value) ? undefined : INVALID_FORMAT)

// validNaturalNumber is valid for non-negative integers , 0 and positive integers.
export const validNaturalNumber = (number: any) => (/^\d+$/i.test(number) ? undefined : INVALID_FORMAT)

// validPositiveInteger is valid for positive integers.
export const validPositiveInteger = (number: any) => (/^\+?[1-9][0-9]*$/i.test(number) ? undefined : INVALID_FORMAT)

export const validDateTime = (dateTime: string) => {
  if (/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/i.test(dateTime)) {
    return undefined
  }
  return !dateTime ? INPUT_REQUIRED : INVALID_FORMAT
}

export const isValidDuration = (start: string, end: string) =>
  new Date(end).getTime() >= new Date(start).getTime() ? undefined : INVALID_DURATION

export const isValidLength = (length: number) => (data: string | number) =>
  new RegExp(`^.{1,${length}}$`, 'ig').test(String(data)) ? undefined : tooLongError(length)

export const isGreaterThanNow = (dateTime: string) =>
  dayjs(dateTime, 'YYYY-MM-DD HH:mm').isAfter(dayjs()) ? undefined : SHOULD_GREATER_THAN_NOW

export const isRequiredValidLength: (v: any) => string | undefined = composeValidators(
  required,
  isValidLength(CHARACTER_LIMIT)
)
export const isValidJSON = (text: string) => {
  try {
    JSON.parse(text)
    return undefined
  } catch (e) {
    return INVALID_JSON
  }
}
