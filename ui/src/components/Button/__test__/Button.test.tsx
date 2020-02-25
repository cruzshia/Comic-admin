import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Icon from '@src/assets/form/button_save.svg'
import Button from '../Button'
import ActionButton from '../ActionButton'
import { ButtonTheme } from '../buttonTheme'

let [theme, buttonText, mockFn, disabled, icon] = [ButtonTheme.DARK, '検索する', jest.fn(), false, Icon]

function renderWithAll(Component: JSX.Element, selectorID: string) {
  const { container, getByTestId } = render(Component)
  const normalButton = getByTestId(selectorID)
  return {
    container,
    normalButton
  }
}

beforeEach(() => {
  mockFn = jest.fn()
})

describe('Button components test', () => {
  it('Render correctly', () => {
    const { container, normalButton } = renderWithAll(
      <Button theme={theme} buttonText={buttonText} onClick={mockFn} disabled={disabled} icon={icon} />,
      'normal_button'
    )
    fireEvent.click(normalButton, { button: 0 })
    expect(container).toBeInTheDocument()
    expect(normalButton.className).toMatch(theme)
    expect(normalButton.textContent).toBe(buttonText)
    expect(mockFn).toBeCalledTimes(1)
  })

  it('Work disable button correctly', () => {
    const { normalButton } = renderWithAll(
      <Button theme={theme} buttonText={buttonText} onClick={mockFn} disabled={true} icon={icon} />,
      'normal_button'
    )
    fireEvent.click(normalButton, { button: 0 })
    expect(mockFn).toBeCalledTimes(0)
  })
})

describe('ActionButton components test', () => {
  it('Render ActionButton  correctly', () => {
    const { container, normalButton } = renderWithAll(
      <ActionButton theme={theme} buttonText={buttonText} onClick={mockFn} disabled={disabled} />,
      'action_button'
    )
    fireEvent.click(normalButton, { button: 0 })
    expect(container).toBeInTheDocument()
    expect(normalButton.className).toMatch(theme)
    expect(normalButton.textContent).toBe(buttonText)
    expect(mockFn).toBeCalledTimes(1)
  })

  it('Work disable button correctly', () => {
    const { normalButton } = renderWithAll(
      <ActionButton theme={theme} buttonText={buttonText} onClick={mockFn} disabled={true} />,
      'action_button'
    )
    fireEvent.click(normalButton, { button: 0 })
    expect(mockFn).toBeCalledTimes(0)
  })
})
