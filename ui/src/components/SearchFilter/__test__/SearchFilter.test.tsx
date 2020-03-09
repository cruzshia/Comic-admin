import React from 'react'
import SearchFilter from '../SearchFilter'
import { render, getAllByTestId } from '@testing-library/react'
import { withAllProvider } from '@src/utils/__test__/providers'
import Select from '@src/components/form/Select'

describe('SearchFilter component test', () => {
  const mockData = {
    left: [
      { label: 'test1', input: <Select list={[]} /> },
      { label: 'test2', input: <Select list={[]} /> },
      { label: 'test3', input: <Select list={[]} /> },
      { label: 'test4', input: <Select list={[]} /> }
    ],
    right: [
      { label: 'test5', input: <Select list={[]} /> },
      { label: 'test6', input: <Select list={[]} /> }
    ]
  }
  it('Renders correctly', () => {
    const { getByTestId } = render(withAllProvider(<SearchFilter conditions={mockData} />))
    const target = getByTestId('search_filter')

    expect(target).toBeInTheDocument()
    expect(getAllByTestId(target, 'search_filter_item').length).toBe(5)
    getByTestId('search_filter_expand').click()
    expect(getAllByTestId(target, 'search_filter_item').length).toBe(6)
  })
})
