import React, { ReactComponentElement } from 'react'
import { render } from '@testing-library/react'
import { withMemoryRouterProvider } from '@src/utils/__test__/providers'
import SideBar from '../SideBar'
import { SIDEBAR_TABS } from '../constants'
import LayoutContext from '../../context'

function renderWithContext(component: JSX.Element, initialEntries: string[]) {
  return render(
    withMemoryRouterProvider(
      <LayoutContext.Provider value={{ headTab: 'comics' }}>{component}</LayoutContext.Provider>,
      initialEntries
    )
  )
}

describe('SideBar components test', () => {
  it('check sidebar component renders correctly', () => {
    const { container, getByTestId } = renderWithContext(<SideBar />, ['/'])
    expect(container).toBeInTheDocument()
    expect(getByTestId('toolbar_spacer')).toBeInTheDocument()
  })

  it('check sidebar render TABs correctly', () => {
    const targetTab = 'comics'
    const historyPath = '/comics/list'
    const expectedTabs = SIDEBAR_TABS[`/${targetTab}`]
    const { container, getAllByRole } = renderWithContext(<SideBar />, [historyPath])
    // mount correctly
    expect(container).toBeInTheDocument()

    const tabs = getAllByRole('link')
    // has right number of tabs
    expect(tabs.length).toBe(expectedTabs.length)

    // tabs render with right order
    tabs.forEach((dom, idx) => {
      const expectedPath = expectedTabs[idx].to
      expect(dom.getElementsByClassName('selected').length).toBe(expectedPath === historyPath ? 1 : 0)
      expect(dom.getAttribute('href')).toBe(expectedPath)
    })
  })
})
