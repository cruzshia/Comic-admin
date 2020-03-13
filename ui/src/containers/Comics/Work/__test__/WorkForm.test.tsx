import React from 'react'
import { render } from '@testing-library/react'
import { withAllProvider } from '@src/utils/__test__/providers'
import WorkForm from '../components/WorkForm'

describe('WorkForm component test', () => {
  it('Renders correctly', () => {
    const { container } = render(withAllProvider(<WorkForm onSubmit={() => {}} />))
    expect(container).toBeInTheDocument()
  })

  it('Render 2 data tables', () => {
    const { getAllByTestId } = render(withAllProvider(<WorkForm onSubmit={() => {}} />))
    expect(getAllByTestId('data-table')).toHaveLength(2)
  })
})
