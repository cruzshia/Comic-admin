import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import { withAllProvider } from '@src/utils/__test__/providers'
import DropZone from '../DropZone'

function mockData(files: File[]) {
  return {
    dataTransfer: {
      files,
      items: files.map(file => ({
        kind: 'file',
        type: file.type,
        getAsFile: () => file
      })),
      types: ['Files']
    }
  }
}

describe('DropZone components test', () => {
  it('invoke onDrop event correctly', () => {
    /**
     * notice: onDropAccepted & onDropRejected is react-dropzone built-in callback
     * so we will not test them here.
     * only have to ensure drop event works
     */
    const file = new File([''], 'ping.png', { type: 'image/png' })
    const data = mockData([file])

    const mockFn = jest.fn()
    const mockDrop = jest.fn()

    const { container } = render(withAllProvider(<DropZone onDropAccepted={mockFn} onDrop={mockDrop} />))

    fireEvent.drop(container.querySelector('.dropZone')!, data)
    expect(mockDrop).toBeCalledTimes(1)
  })
})
