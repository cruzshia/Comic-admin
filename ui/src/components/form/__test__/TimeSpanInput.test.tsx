import React, { createRef } from 'react'
import { render, getAllByTestId, fireEvent } from '@testing-library/react'
import { Form } from 'react-final-form'
import { withAllProvider } from '@src/utils/__test__/providers'
import TimeSpanInput from '../TimeSpanInput'

describe('TimeSpanInput component test', () => {
  it('Renders correctly', () => {
    const { getByTestId } = render(
      withAllProvider(
        <Form
          onSubmit={() => {}}
          render={() => (
            <form>
              <TimeSpanInput />
            </form>
          )}
        />
      )
    )
    const target = getByTestId('time_span_input')

    expect(target).toBeInTheDocument()
    expect(getAllByTestId(target, 'date_time_input').length).toBe(2)
  })

  it('Renders error correctly', () => {
    const mockFn = jest.fn()
    const mockValue = 'mockValue'
    const { getByTestId, getAllByRole } = render(
      withAllProvider(
        <Form
          onSubmit={mockFn}
          render={() => (
            <form>
              <TimeSpanInput isRequired />
            </form>
          )}
        />
      )
    )
    const [start, end] = getAllByRole('textbox') as HTMLInputElement[]

    fireEvent.focus(start)
    fireEvent.blur(start)
    const error = getByTestId('error')
    expect(error).toHaveTextContent('Required')
    fireEvent.change(start, { target: { value: mockValue } })
    expect(error).not.toBeInTheDocument()

    fireEvent.focus(end)
    fireEvent.blur(end)
    const error2 = getByTestId('error')
    expect(error2).toBeInTheDocument()
    fireEvent.change(end, { target: { value: mockValue } })
    expect(error2).not.toBeInTheDocument()
  })

  it('Renders name correctly', () => {
    const mockName = 'mockName'
    const { getAllByRole } = render(
      withAllProvider(
        <Form
          onSubmit={() => {}}
          render={() => (
            <form>
              <TimeSpanInput name={mockName} />
            </form>
          )}
        />
      )
    )
    const [start, end] = getAllByRole('textbox') as HTMLInputElement[]
    expect(start.name).toBe(`${mockName}Start`)
    expect(end.name).toBe(`${mockName}End`)
  })

  it('Change as expected', () => {
    const mockValue = 'mockValue'
    const { getAllByRole } = render(
      withAllProvider(
        <Form
          onSubmit={() => {}}
          render={() => (
            <form>
              <TimeSpanInput />
            </form>
          )}
        />
      )
    )
    const [start, end] = getAllByRole('textbox') as HTMLInputElement[]
    fireEvent.change(start, { target: { value: mockValue } })
    expect(start.value).toBe(mockValue)
    fireEvent.change(end, { target: { value: mockValue } })
    expect(end.value).toBe(mockValue)
  })

  it('Retrieve data when submit', () => {
    const mockSubmit = jest.fn()
    const formRef = createRef<HTMLFormElement>()
    const { getAllByTestId, container } = render(
      withAllProvider(
        <Form
          onSubmit={mockSubmit}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit} ref={formRef}>
              <TimeSpanInput isRequired />
            </form>
          )}
        />
      )
    )
    formRef.current?.dispatchEvent(new Event('submit', { cancelable: true }))
    expect(getAllByTestId('error').length).toBe(1)
    expect(mockSubmit).toBeCalledTimes(0)

    const mockRes = {
      Start: '123',
      End: '321'
    }
    fireEvent.change(container.querySelector('[name=Start]')!, { target: { value: mockRes.Start } })
    fireEvent.change(container.querySelector('[name=End]')!, { target: { value: mockRes.End } })
    formRef.current?.dispatchEvent(new Event('submit', { cancelable: true }))
    expect(() => getAllByTestId('error')).toThrow()
    expect(mockSubmit).toHaveBeenNthCalledWith(1, mockRes, expect.anything(), expect.anything())
  })
})
