import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { withAllProvider } from '@src/utils/__test__/providers'
import { topOffset } from '@src/common/styles'
import StickyBar from '../StickyBar'

describe('StickyBar component test', () => {
  it('Renders correctly', () => {
    const { container } = render(withAllProvider(<StickyBar top={0}>123</StickyBar>))
    expect(container).toBeInTheDocument()
  })

  it('Shows up when scroll to position', () => {
    const visibleTop = 10
    const { getByTestId } = render(withAllProvider(<StickyBar top={visibleTop}>123</StickyBar>))
    const element = getByTestId('sticky-bar')
    let style = getComputedStyle(element)
    expect(style.visibility).toBe('hidden')

    document.documentElement.scrollTop = topOffset + visibleTop + 1
    fireEvent.scroll(document)

    style = getComputedStyle(element)
    expect(style.visibility).toBe('visible')
  })
})
