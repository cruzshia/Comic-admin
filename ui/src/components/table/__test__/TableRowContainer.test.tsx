import React from 'react'
import { render } from '@testing-library/react'
import TextArea from '../../form/TextArea'
import DataTableRow from '../DataTableRow'
import { withAllProvider } from '@src/utils/__test__/providers'

describe('DataTableRow component test', () => {
  it('Renders correctly', () => {
    const mockTitle = 'Title'
    const mockElement = <TextArea />
    const { getByTestId } = render(withAllProvider(<DataTableRow title={mockTitle} content={mockElement} />))
    const target = getByTestId('table-row-container')
    const content = getByTestId('text-area')

    expect(target).toBeInTheDocument()
    expect(target.querySelector('div')).toHaveTextContent(mockTitle)
    expect(content).toBeInTheDocument()
  })
})
