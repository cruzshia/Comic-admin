import React from 'react'
import Select from '../Select'
import { render } from '@testing-library/react'
import { withAllProvider } from '@src/utils/__test__/providers'

describe('SearchInput component test', () => {
  const list = [1, 2, 3, 4, 5]
  const name = 'testSelect'

  it('Renders correctly', () => {
    const { getByTestId } = render(withAllProvider(<Select list={list} name={name} />))
    const target = getByTestId('select')
    expect(target).toBeInTheDocument()
    expect(target.querySelector('input')?.name).toBe(name)
  })

  it('Renders select menu  correctly', () => {
    render(withAllProvider(<Select list={list} open={true} />))
    expect(document.querySelector('#menu-')?.querySelectorAll('li').length).toBe(list.length)
  })

  it('Renders select options correctly', () => {
    const { getByTestId } = render(withAllProvider(<Select list={list} open={true} />))
    const target = getByTestId('select')
    document
      .querySelector('#menu-')
      ?.querySelectorAll('li')[0]
      .click()
    expect(target.querySelector('div')).toHaveTextContent(list[0].toString())
    expect(target.querySelector('input')?.value).toBe(list[0].toString())
  })
})
