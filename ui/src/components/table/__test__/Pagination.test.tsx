import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Pagination from '../Pagination'
import { ExpansionPanelActions } from '@material-ui/core'

describe('Pagination component test', () => {
  it('Renders correctly', () => {
    const mockOnChange = jest.fn()
    const { getByTestId, getAllByTestId } = render(<Pagination total={10} onChange={mockOnChange} />)
    expect(() => getByTestId('pagination')).not.toThrow()
    expect(getAllByTestId(/page/i)).toHaveLength(10)
  })

  it('Change page correctly', () => {
    const mockOnChange = jest.fn()
    const targetId = 'page-2'
    const { getByTestId } = render(<Pagination total={10} onChange={mockOnChange} />)
    fireEvent.click(getByTestId(targetId))
    expect(mockOnChange).toHaveBeenCalled()
    expect(getByTestId(targetId).getAttribute('aria-current')).toBe('true')
  })
})
