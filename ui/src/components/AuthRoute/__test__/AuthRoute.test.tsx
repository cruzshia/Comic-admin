import React from 'react'
import { render } from '@testing-library/react'
import AuthRoute from '../AuthRoute'
import { loginSuccessAction } from '@src/reducers/user/userActions'

import { withAllProvider, store } from '@src/utils/__test__/providers'

describe('AuthRoute component test', () => {
  const MockElement = () => <div>hello</div>
  it('renders route without any constraint', () => {
    const { getByText } = render(withAllProvider(<AuthRoute component={MockElement} />))
    const mockElement = getByText(/hello/i)
    expect(mockElement).toBeInTheDocument()
  })

  it('renders route with AUTHORIZATION required', () => {
    const { container } = render(withAllProvider(<AuthRoute authRequired component={MockElement} />))
    expect(container.querySelector('div')?.innerHTML).toBeUndefined()
  })

  it('renders route with GUEST ONLY', () => {
    // mock login success action
    store.dispatch(loginSuccessAction({ token: 'fake' }))
    const { container } = render(withAllProvider(<AuthRoute guestOnly component={MockElement} />))
    expect(container.querySelector('div')?.innerHTML).toBeUndefined()
  })
})
