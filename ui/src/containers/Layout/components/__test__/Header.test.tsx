import React from 'react'
import { render } from '@testing-library/react'

import { withAllProvider } from '@src/utils/__test__/providers'
import Header from '../Header'
import HeaderTabMenu from '../HeaderTabMenu'
import HeaderTabItem from '../HeaderTabItem'

describe('Header components test', () => {
  it('check HeaderTabItem renders correctly', () => {
    const fakeTab = {
      icon: '/static/image',
      title: 'comic management',
      route: '/comic/management'
    }
    const { container, getByAltText, getByText, queryAllByTestId } = render(
      withAllProvider(<HeaderTabItem {...fakeTab} />)
    )

    expect(container).toBeInTheDocument()
    expect(getByAltText(fakeTab.title)).toBeInTheDocument()
    expect(getByText(fakeTab.title)).toBeInTheDocument()
    expect(queryAllByTestId('highlight_bar')).toEqual([])
    expect(container.getElementsByTagName('a')[0].getAttribute('href')).toBe('#' + fakeTab.route)
  })

  it('check HeaderTabItem with HIGHLIGHT renders correctly', () => {
    const fakeTab = {
      icon: '/static/image',
      title: 'comic management',
      route: '/comic/management',
      selected: true
    }
    const { getByTestId } = render(withAllProvider(<HeaderTabItem {...fakeTab} />))

    expect(getByTestId('highlight_bar')).toBeInTheDocument()
  })

  it('check HeaderTabMenuItem renders correctly', () => {
    const { getByTestId } = render(withAllProvider(<HeaderTabMenu />))
    const target = getByTestId('header_tab_menu')
    expect(target).toBeInTheDocument()
  })

  it('check Header renders correctly', () => {
    const { getByTestId } = render(withAllProvider(<Header />))
    const appBar = getByTestId('header_app_bar')

    expect(appBar).toBeInTheDocument()

    const logo = getByTestId('logo')
    expect(logo).toBeInTheDocument()

    const tabMenu = getByTestId('header_tab_menu')
    expect(tabMenu).toBeInTheDocument()
  })
})
