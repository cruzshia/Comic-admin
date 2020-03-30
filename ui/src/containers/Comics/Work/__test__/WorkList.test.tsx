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
})
