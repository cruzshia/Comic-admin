import React, { createRef } from 'react'
import { render, fireEvent } from '@testing-library/react'
import { withAllProvider } from '@src/utils/__test__/providers'
import WorkForm from '../components/WorkForm'

describe('WorkForm component test', () => {
  it('Renders correctly', () => {
    const { container } = render(withAllProvider(<WorkForm onSubmit={() => {}} />))
    expect(container).toBeInTheDocument()
  })

  it('Render 2 data tables', () => {
    const { getAllByTestId } = render(withAllProvider(<WorkForm onSubmit={() => {}} />))
    expect(getAllByTestId('data-table')).toHaveLength(4)
  })

  it('Retrieve data when submit', () => {
    const mockSubmit = jest.fn()
    const formRef = createRef<HTMLFormElement>()
    const { getAllByTestId, container } = render(withAllProvider(<WorkForm onSubmit={mockSubmit} formRef={formRef} />))
    formRef.current?.dispatchEvent(new Event('submit', { cancelable: true }))
    expect(() => getAllByTestId('error')).not.toThrow()
    expect(mockSubmit).toBeCalledTimes(0)

    const mockRes = {
      id: '123',
      title: '大冒險',
      author: ['']
    }
    fireEvent.change(container.querySelector('[name=id]')!, { target: { value: mockRes.id } })
    fireEvent.change(container.querySelector('[name=title]')!, { target: { value: mockRes.title } })
    formRef.current?.dispatchEvent(new Event('submit', { cancelable: true }))
    expect(mockSubmit).toHaveBeenNthCalledWith(1, mockRes, expect.anything(), expect.anything())
  })
})
