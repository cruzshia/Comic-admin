import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import DataTable from '../DataTable'
import { withAllProvider } from '@src/utils/__test__/providers'

describe('DataTable test', () => {
  const mockTitle = 'mock title'
  const mockDataSet = [
    {
      label: 'email',
      content: <textarea />
    },
    {
      label: 'mockSubtitle',
      isSubTitle: true,
      content: 'mockSubtitle'
    },
    {
      label: 'name',
      content: <input />
    }
  ]
  const mockFn = jest.fn()

  it('Render correctly', () => {
    const { queryAllByTestId, queryByTestId } = render(
      withAllProvider(<DataTable title={mockTitle} dataSet={mockDataSet} onEdit={mockFn} />)
    )
    expect(queryByTestId('data-table-title')).toBeInTheDocument()
    expect(queryByTestId('data-table-button')).toBeInTheDocument()
    expect(queryAllByTestId('data-table-subtitle')).toHaveLength(1)
    expect(queryAllByTestId('table-row-container')).toHaveLength(2)
  })

  it('Check edit button works correctly', () => {
    const { queryByTestId } = render(withAllProvider(<DataTable dataSet={mockDataSet} onEdit={mockFn} />))
    const target = queryByTestId('data-table-button')
    fireEvent.click(target!)
    expect(mockFn).toBeCalledTimes(1)
  })
})
