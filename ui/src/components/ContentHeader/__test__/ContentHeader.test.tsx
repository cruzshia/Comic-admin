import React from 'react'
import { render } from '@testing-library/react'
import ContentHeader from '../ContentHeader'
import { withAllProvider } from '@src/utils/__test__/providers'

describe('ContentHeader test', () => {
  const mockTitle = 'mock title'
  const mockBreadcrumbs = [
    { title: 'breadcrumbs_1' },
    { title: 'breadcrumbs_2', route: '/comics/work' },
    { title: 'breadcrumbs_3' }
  ]
  const mockButtonList = new Array(3).fill(0).map((_, idx) => <button title={`btn${idx}`} data-testid='btn' />)

  it('Render correctly', () => {
    const { queryByTestId, queryAllByTestId } = render(
      withAllProvider(
        <ContentHeader breadcrumbList={mockBreadcrumbs} titleText={mockTitle} buttonList={mockButtonList} />
      )
    )
    expect(queryByTestId('breadcrumbs')).toBeInTheDocument()
    expect(queryByTestId('content-header-title')).toBeInTheDocument()
    expect(queryAllByTestId('btn')).toHaveLength(3)
  })

  it('Check breadcrumbs Render correctly', () => {
    const { queryAllByTestId } = render(
      withAllProvider(
        <ContentHeader breadcrumbList={mockBreadcrumbs} titleText={mockTitle} buttonList={mockButtonList} />
      )
    )
    expect(queryAllByTestId('breadcrumbs-link')).toHaveLength(1)
    expect(queryAllByTestId('breadcrumbs-link')[0].getAttribute('href')).toBe('#/comics/work')
    expect(queryAllByTestId('breadcrumbs-text')).toHaveLength(2)
  })
})
