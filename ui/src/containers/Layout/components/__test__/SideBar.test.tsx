import React from 'react'
import { render } from '@testing-library/react'
import { withMemoryRouterProvider } from '@src/utils/__test__/providers'
import SideBar from '../SideBar'
import { SIDEBAR_TABS } from '../constants'
import LayoutContext from '../../context'

function renderWithContext(component: JSX.Element, initialEntries: string[], tab: string) {
  return render(
    withMemoryRouterProvider(
      <LayoutContext.Provider value={{ headTab: tab }}>{component}</LayoutContext.Provider>,
      initialEntries
    )
  )
}

describe('SideBar components test', () => {
  it('check sidebar component renders correctly', () => {
    const { container, getByTestId } = renderWithContext(<SideBar />, ['/'], '')
    expect(container).toBeInTheDocument()
    expect(getByTestId('toolbar_spacer')).toBeInTheDocument()
  })

  test.each(Object.keys(SIDEBAR_TABS))('check sidebar render %s TABs correctly', tab => {
    const expectedTabs = SIDEBAR_TABS[tab]
    const historyPath = `${tab}/list`
    const { container, getAllByRole } = renderWithContext(<SideBar />, [historyPath], tab.substr(1))
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
