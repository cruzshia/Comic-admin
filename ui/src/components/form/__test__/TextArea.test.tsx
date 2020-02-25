import React from 'react'
import { render } from '@testing-library/react'
import TextArea from '../TextArea'
import { withAllProvider } from '@src/utils/__test__/providers'

describe('TextArea component test', () => {
  it('Renders correctly', () => {
    const { getByTestId } = render(withAllProvider(<TextArea />))
    const target = getByTestId('text_area')

    expect(target).toBeInTheDocument()
  })
})
