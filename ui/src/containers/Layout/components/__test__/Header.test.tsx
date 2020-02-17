import React from 'react'
import { render } from '@testing-library/react'

import { withAllProvider } from '@src/utils/__test__/providers'
import Header from '../Header'
import HeaderTabMenu from '../HeaderTabMenu'

describe('Header components test', () => {
  it('check header tab menu renders correctly', () => {
    const { getByTestId } = render(withAllProvider(<HeaderTabMenu isLogin={true} />))
    const target = getByTestId('header_tab_menu')
    expect(target).toBeInTheDocument()
  })

  it('check header renders correctly', () => {
    const { getByTestId } = render(withAllProvider(<Header isLogin={true} />))
    const appBar = getByTestId('header_app_bar')
    expect(appBar).toBeInTheDocument()

    const logo = getByTestId('logo')
    expect(logo).toBeInTheDocument()

    const tabMenu = getByTestId('header_tab_menu')
    expect(tabMenu).toBeInTheDocument()
  })
})
