import React from 'react'
import { render } from '@testing-library/react'
import ListTableRow from '../ListTableRow'
import { withAllProvider } from '@src/utils/__test__/providers'

describe('ListTableRow component test', () => {
  const mockDatum = {
    workID: 'WORK_ROOKIE000014751',
    title: 'クラスメイトの田中さんはすごく怖い',
    releaseDate: '2020-01-21 16:34',
    category: 'コミックス',
    property: 'オリジナル連載',
    updateFrequency: '毎週月月金曜日に更新'
  }

  it('Renders correctly', () => {
    const { getByTestId } = render(
      withAllProvider(
        <table>
          <thead>
            <ListTableRow items={mockDatum} />
          </thead>
        </table>
      )
    )
    const target = getByTestId('list-table-row')

    expect(target).toBeInTheDocument()
    expect(target.querySelectorAll('td').length).toBe(Object.keys(mockDatum).length)
  })
})
