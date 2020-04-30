import React from 'react'
import { render } from '@testing-library/react'
import AuthRoute from '../AuthRoute'
import { loginSuccessAction } from '@src/reducers/user/profileActions'

import { withAllProvider, store } from '@src/utils/__test__/providers'

describe('AuthRoute component test', () => {
  const mockText = 'hello'
  const mockTestId = 'mock-element'
  const MockElement = () => <div data-testid={mockTestId}>{mockText}</div>
  it('renders route without any constraint', () => {
    const { getByText } = render(withAllProvider(<AuthRoute component={MockElement} />))
    expect(getByText(mockText)).toBeInTheDocument()
  })

  it('renders route with AUTHORIZATION required', () => {
    const { getByTestId } = render(withAllProvider(<AuthRoute authRequired component={MockElement} />))
    let error: string | null = null
    try {
      getByTestId(mockTestId)
    } catch (_) {
      error = 'not found'
    }
    expect(error).not.toBeNull()
  })

  it('renders route with GUEST ONLY', () => {
    // mock login success action
    store.dispatch(loginSuccessAction({ token: 'fake' }))
    const { getByTestId } = render(withAllProvider(<AuthRoute guestOnly component={MockElement} />))
    let error: string | null = null
    try {
      getByTestId(mockTestId)
    } catch (_) {
      error = 'not found'
    }
    expect(error).not.toBeNull()
  })
})
