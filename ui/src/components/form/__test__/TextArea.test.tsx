import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { withAllProvider } from '@src/utils/__test__/providers'
import TextArea from '../TextArea'

describe('TextArea component test', () => {
  it('Renders correctly', () => {
    const { getByTestId } = render(withAllProvider(<TextArea />))
    const target = getByTestId('text-area')
    expect(target).toBeInTheDocument()
  })

  it('Renders error correctly', () => {
    const mockError = 'mock error'
    const { getByTestId } = render(withAllProvider(<TextArea error={mockError} />))
    const error = getByTestId('error')
    expect(error).toBeInTheDocument()
    expect(error).toHaveTextContent(mockError)
  })

  it('Renders default value correctly', () => {
    const mockValue = 'mock value'
    const { getByRole } = render(withAllProvider(<TextArea value={mockValue} />))
    const target = getByRole('textbox') as HTMLInputElement
    expect(target).toHaveProperty('value', mockValue)
  })

  it('Renders name correctly', () => {
    const mockName = 'mockName'
    const { getByRole } = render(withAllProvider(<TextArea name={mockName} />))
    const target = getByRole('textbox') as HTMLInputElement
    expect(target).toHaveProperty('name', mockName)
  })

  it('Change as expected', () => {
    const mockValue = 'mock value'
    const mockFn = jest.fn()
    const { getByRole } = render(withAllProvider(<TextArea onChange={mockFn} />))
    const target = getByRole('textbox') as HTMLInputElement
    fireEvent.change(target, { target: { value: mockValue } })
    expect(mockFn).toBeCalledTimes(1)
    expect(target).toHaveProperty('value', mockValue)
  })

  it('Blur as expected', () => {
    const mockFn = jest.fn()
    const { getByRole } = render(withAllProvider(<TextArea onBlur={mockFn} />))
    const target = getByRole('textbox') as HTMLInputElement
    fireEvent.focus(target)
    fireEvent.blur(target)
    expect(mockFn).toBeCalledTimes(1)
  })
})
