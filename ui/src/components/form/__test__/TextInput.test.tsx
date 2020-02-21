import React from 'react'
import TextInput from '../TextInput'
import { render } from '@testing-library/react'
import { withAllProvider } from '@src/utils/__test__/providers'

describe('TextInput component test', () => {
  it('check text input renders correctly', () => {
    const { getByTestId } = render(withAllProvider(<TextInput />))
    const target = getByTestId('text_input')
    expect(target).toBeInTheDocument()
  })
})
