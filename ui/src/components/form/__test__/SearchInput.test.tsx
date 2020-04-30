import React from 'react'
import { fireEvent } from '@testing-library/react'
import SearchInput from '../SearchInput'
import { render } from '@testing-library/react'
import { withAllProvider } from '@src/utils/__test__/providers'

describe('SearchInput component test', () => {
  it('Renders correctly', () => {
    const { getByTestId } = render(withAllProvider(<SearchInput />))
    const target = getByTestId('search_input')
    expect(target).toBeInTheDocument()
  })

  it('Show error as expect', () => {
    const mockError = 'required'
    const { getByTestId } = render(withAllProvider(<SearchInput error={mockError} />))
    const errorDom = getByTestId('error')
    expect(errorDom).toBeInTheDocument()
    expect(errorDom).toHaveTextContent(mockError)
  })

  it('Show icon as expect', () => {
    const { getByTestId } = render(withAllProvider(<SearchInput />))
    expect(getByTestId('search_icon')).toBeInTheDocument()
  })

  it('Change as expect', () => {
    const mockChange = jest.fn()
    const mockValue = '123'
    const { getByRole } = render(withAllProvider(<SearchInput onChange={mockChange} />))
    const target = getByRole('textbox') as HTMLInputElement
    fireEvent.change(target, { target: { value: mockValue } })
    expect(mockChange).toBeCalledTimes(1)
    expect(target.value).toBe(mockValue)
  })
})
