import React from 'react'
import Select from '../Select'
import { render } from '@testing-library/react'
import { withAllProvider } from '@src/utils/__test__/providers'

describe('SearchInput component test', () => {
  const list = new Array(4).fill(0).map((_, idx) => ({ label: idx + 1, value: idx + 1 }))
  const name = 'testSelect'
  const mockFn = jest.fn()

  it('Renders correctly', () => {
    const { getByTestId } = render(withAllProvider(<Select options={list} name={name} />))
    const target = getByTestId('select')
    expect(target).toBeInTheDocument()
    expect(target.querySelector('input')?.name).toBe(name)
  })

  it('Renders select menu  correctly', () => {
    render(withAllProvider(<Select options={list} open={true} />))
    expect(document.querySelector('#menu-')?.querySelectorAll('li').length).toBe(list.length)
  })

  it('Renders select options correctly', () => {
    const { getByTestId } = render(withAllProvider(<Select options={list} open={true} onChange={mockFn} />))
    const target = getByTestId('select')
    document
      .querySelector('#menu-')
      ?.querySelectorAll('li')[0]
      .click()
    expect(target.querySelector('div')).toHaveTextContent(list[0].label)
    expect(target.querySelector('input')?.value).toBe(list[0].value.toString())
    expect(mockFn).toBeCalledTimes(1)
  })
})
