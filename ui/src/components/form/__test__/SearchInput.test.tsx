import React from 'react'
import SearchInput from '../SearchInput'
import { render } from '@testing-library/react'
import { withAllProvider } from '@src/utils/__test__/providers'

describe('SearchInput component test', () => {
  it('Renders correctly', () => {
    const { getByTestId } = render(withAllProvider(<SearchInput />))
    const target = getByTestId('search_input')
    expect(target).toBeInTheDocument()
  })
})
