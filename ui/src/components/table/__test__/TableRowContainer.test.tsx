import React from 'react'
import { render } from '@testing-library/react'
import TextArea from '../../form/TextArea'
import TableRowCOntainer from '../TableRowContainer'
import { withAllProvider } from '@src/utils/__test__/providers'

describe('TableRowCOntainer component test', () => {
  it('Renders correctly', () => {
    const mockTitle = 'Title'
    const mockElement = <TextArea />
    const { getByTestId } = render(withAllProvider(<TableRowCOntainer title={mockTitle} content={mockElement} />))
    const target = getByTestId('table_row_container')
    const content = getByTestId('text_area')

    expect(target).toBeInTheDocument()
    expect(target.querySelector('div')).toHaveTextContent(mockTitle)
    expect(content).toBeInTheDocument()
  })
})
