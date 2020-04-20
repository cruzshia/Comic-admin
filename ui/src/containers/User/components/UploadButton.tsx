import React, { useRef } from 'react'
import { Field } from 'react-final-form'
import Button, { Theme } from '@src/components/Button/Button'

interface Props {
  text: string
  name: string
  theme?: Theme
}

export default function UploadButton({ text, name, theme }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <>
      <Button
        theme={theme}
        buttonText={text}
        onClick={() => {
          inputRef.current?.click()
        }}
      />
      <Field
        name={name}
        render={({ input }) => <input {...input} ref={inputRef} type='file' style={{ visibility: 'hidden' }} />}
      />
    </>
  )
}
