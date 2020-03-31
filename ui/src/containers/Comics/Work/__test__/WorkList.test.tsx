import React from 'react'
import { render } from '@testing-library/react'
import { withAllProvider } from '@src/utils/__test__/providers'
import WorkList from '../components/WorkList'
import WorkContext from '../context/WorkContext'

describe('WorkList test', () => {
  it('Renders correctly', () => {
    const { container } = render(
      withAllProvider(
        <WorkContext.Provider value={{ workList: [], workTotal: 0 }}>
          <WorkList />
        </WorkContext.Provider>
      )
    )
    expect(container).toBeInTheDocument()
  })

  it('Renders Search & list block', () => {
    const mockDatum = {
      image: <img alt='' />,
      workID: 'WORK_ROOKIE000014751',
      title: 'クラスメイトの田中さんはすごく怖い',
      releaseDate: '2020-01-21 16:34:00',
      category: 'コミックス',
      episodeCategory: 'オリジナル連載',
      updateFrequency: '毎週月月金曜日に更新'
    }
    const workList = []
    for (let i = 0; i <= 3; i++) {
      workList.push({ ...mockDatum, workID: `WORK_ROOKIE00001475${i}` })
    }

    const { getByTestId, getAllByTestId } = render(
      withAllProvider(
        <WorkContext.Provider value={{ workList, workTotal: 0 }}>
          <WorkList />
        </WorkContext.Provider>
      )
    )

    expect(getByTestId('breadcrumbs')).toBeInTheDocument()
    const allBreadcrumbs = getAllByTestId('breadcrumbs-text')
    expect(allBreadcrumbs).toHaveLength(2)
    expect(allBreadcrumbs[allBreadcrumbs.length - 1].textContent).toBe(getByTestId('content-header-title').textContent)

    expect(getByTestId('search_filter')).toBeInTheDocument()

    expect(getByTestId('list-table')).toBeInTheDocument()
    expect(getAllByTestId('list-table-row')).toHaveLength(4)
  })
})
