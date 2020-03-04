import React from 'react'
import { render } from '@testing-library/react'
import { withAllProvider } from '@src/utils/__test__/providers'
import WorkForm from '../WorkForm'

describe('WorkForm component test', () => {
  it('Renders correctly', () => {
    const { container } = render(withAllProvider(<WorkForm />))
    expect(container).toBeInTheDocument()
  })

  it('Render 2 data tables', () => {
    const { getAllByTestId } = render(withAllProvider(<WorkForm />))
    expect(getAllByTestId('data-table')).toHaveLength(2)
  })
})
