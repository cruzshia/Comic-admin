import React from 'react'
import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'
import { render } from '@testing-library/react'
import { withAllProvider } from '@src/utils/__test__/providers'
// import { defaultOpeningAd, defaultContentAd } from '@src/reducers/comics/constant'
import WorkForm from '../components/WorkForm'

describe('WorkForm component test', () => {
  it('Renders correctly', () => {
    const { container } = render(
      withAllProvider(
        <DndProvider backend={Backend}>
          <WorkForm onSubmit={() => {}} />
        </DndProvider>
      )
    )
    expect(container).toBeInTheDocument()
  })

  it('Render 2 data tables', () => {
    const { getAllByTestId } = render(
      withAllProvider(
        <DndProvider backend={Backend}>
          <WorkForm onSubmit={() => {}} />
        </DndProvider>
      )
    )
    expect(getAllByTestId('data-table')).toHaveLength(4)
  })

  /* disable work form unit test temporarily, waiting design confirmation
  it('Retrieve data when submit', () => {
    const mockSubmit = jest.fn()
    const formRef = createRef<HTMLFormElement>()
    const { getAllByTestId, container } = render(
      withAllProvider(
        <DndProvider backend={Backend}>
          <WorkForm onSubmit={mockSubmit} formRef={formRef} />
        </DndProvider>
      )
    )
    formRef.current?.dispatchEvent(new Event('submit', { cancelable: true }))
    expect(() => getAllByTestId('error')).not.toThrow()
    expect(mockSubmit).toBeCalledTimes(0)

    const mockRes = {
      id: '123',
      title: '大冒險',
      author: [''],
      advertisement: {
        opening: defaultOpeningAd,
        contents: defaultContentAd
      }
    }
    fireEvent.change(container.querySelector('[name=id]')!, { target: { value: mockRes.id } })
    fireEvent.change(container.querySelector('[name=title]')!, { target: { value: mockRes.title } })
    formRef.current?.dispatchEvent(new Event('submit', { cancelable: true }))
    expect(mockSubmit).toHaveBeenNthCalledWith(1, mockRes, expect.anything(), expect.anything())
  })
  */
})
