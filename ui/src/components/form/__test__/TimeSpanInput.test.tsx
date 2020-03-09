import React from 'react'
import TimeSpanInput from '../TimeSpanInput'
import { render, getAllByTestId } from '@testing-library/react'
import { withAllProvider } from '@src/utils/__test__/providers'

describe('TimeSpanInput component test', () => {
  it('Renders correctly', () => {
    const { getByTestId } = render(withAllProvider(<TimeSpanInput />))
    const target = getByTestId('time_span_input')

    expect(target).toBeInTheDocument()
    expect(getAllByTestId(target, 'date_time_input').length).toBe(2)
  })
})
