import React from 'react'
import { fireEvent } from '@testing-library/react'
import TextInput from '../TextInput'
import { render } from '@testing-library/react'
import { withAllProvider } from '@src/utils/__test__/providers'

describe('TextInput component test', () => {
  it('Renders correctly', () => {
    const { getByTestId } = render(withAllProvider(<TextInput />))
    const target = getByTestId('text_input')
    expect(target).toBeInTheDocument()
  })

  it('Renders placeholder correctly', () => {
    const mockPlaceholder = 'mock placeholder'
    const { getByRole } = render(withAllProvider(<TextInput placeholder={mockPlaceholder} />))
    const target = getByRole('textbox') as HTMLInputElement
    expect(target.placeholder).toBe(mockPlaceholder)
  })

  it('Renders error correctly', () => {
    const mockError = 'mock error'
    const { getByTestId } = render(withAllProvider(<TextInput error={mockError} />))
    const error = getByTestId('error')
    expect(error).toBeInTheDocument()
    expect(error).toHaveTextContent(mockError)
  })

  it('Renders default value correctly', () => {
    const mockValue = 'mock value'
    const { getByRole } = render(withAllProvider(<TextInput value={mockValue} />))
    const target = getByRole('textbox') as HTMLInputElement
    expect(target.value).toBe(mockValue)
  })

  it('Renders name correctly', () => {
    const mockName = 'mockName'
    const { getByRole } = render(withAllProvider(<TextInput name={mockName} />))
    const target = getByRole('textbox') as HTMLInputElement
    expect(target.name).toBe(mockName)
  })

  it('Change as expected', () => {
    const mockValue = 'mock value'
    const mockFn = jest.fn()
    const { getByRole } = render(withAllProvider(<TextInput onChange={mockFn} />))
    const target = getByRole('textbox') as HTMLInputElement
    fireEvent.change(target, { target: { value: mockValue } })
    expect(mockFn).toBeCalledTimes(1)
    expect(target.value).toBe(mockValue)
  })

  it('Blur as expected', () => {
    const mockFn = jest.fn()
    const { getByRole } = render(withAllProvider(<TextInput onBlur={mockFn} />))
    const target = getByRole('textbox') as HTMLInputElement
    fireEvent.focus(target)
    fireEvent.blur(target)
    expect(mockFn).toBeCalledTimes(1)
  })
})
