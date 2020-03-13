import React from 'react'
import { render, getAllByTestId } from '@testing-library/react'
import ListTable from '../ListTable'
import { withAllProvider } from '@src/utils/__test__/providers'

describe('ListTable component test', () => {
  const mockFn = jest.fn()
  const mockFn2 = jest.fn()

  const mockTitleList = [
    {
      id: 'workID',
      label: '作品ID',
      onSort: mockFn
    },
    { id: 'title', label: '作品タイトル' },
    {
      id: 'releaseDate',
      label: '作成日時',
      onSort: mockFn2
    },
    { id: 'category', label: '作品種別' }
  ]

  it('Renders correctly', () => {
    const { getByTestId } = render(
      withAllProvider(
        <ListTable
          titleList={mockTitleList}
          dataList={[]}
          pagination={{ total: 1000, start: 3 }}
          sortBy='workID'
          sortOrder='asc'
        />
      )
    )
    const target = getByTestId('list-table')
    const sorting = getAllByTestId(target, /sorting/)[0]
    const sortable = getAllByTestId(target, /sortable/)

    expect(target).toBeInTheDocument()
    expect(sortable.length).toBe(2)
    expect(getComputedStyle(getAllByTestId(sorting, 'sort-icon')[0]).transform).toBe('rotate(180deg)')
    expect(getAllByTestId(sorting, 'workID')[0]).toBeInTheDocument()
    expect(getAllByTestId(sortable[0], 'workID')[0]).toBeInTheDocument()
    expect(getAllByTestId(sortable[1], 'releaseDate')[0]).toBeInTheDocument()
    sorting.click()
    expect(mockFn).nthCalledWith(1, 'workID', 'asc', expect.anything())
    sortable[1].click()
    expect(mockFn2).nthCalledWith(1, 'releaseDate', 'asc', expect.anything())
  })
})
