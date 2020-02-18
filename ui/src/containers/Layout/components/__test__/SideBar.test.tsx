import React from 'react'
import { render } from '@testing-library/react'
import SideBar from '../SideBar'

describe('SideBar components test', () => {
  it('check sidebar component renders correctly', () => {
    const { container, getByTestId } = render(<SideBar />)
    expect(container).toBeInTheDocument()
    expect(getByTestId('toolbar_spacer')).toBeInTheDocument()
  })
})
