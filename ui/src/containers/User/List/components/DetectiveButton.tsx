import React from 'react'
import Button, { Theme } from '@src/components/Button/Button'
import { useField } from 'react-final-form'

interface Props {
  name: string
  validate: (values: any) => boolean
  classnames?: string
  buttonText: string
  theme?: Theme
  onClick?: () => void
}
export default function DetectiveButton({ classnames, buttonText, theme, onClick, name, validate }: Props) {
  const { input, meta } = useField(name)
  const isClickable = validate(input.value) && !meta.pristine

  return (
    <Button classnames={classnames} buttonText={buttonText} theme={theme} onClick={onClick} disabled={!isClickable} />
  )
}
