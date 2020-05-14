import { useDrag, useDrop, DropTargetMonitor } from 'react-dnd'
import { TargetType } from 'dnd-core'

interface DragItem {
  index: number
  type: string
}

export interface DnDProp {
  dragIndex: number
  dropIndex: number
}

interface Props {
  accept: TargetType
  index: number
  onDrop?: (props: DnDProp) => void
}

export default function useDnd({ accept, index, onDrop }: Props) {
  let lastTarget: DragItem = {
    index,
    type: ''
  }
  const [, drop] = useDrop({
    accept,
    hover(_: DragItem, monitor: DropTargetMonitor) {
      lastTarget = monitor.getItem()
    },
    drop() {
      const dragIndex = lastTarget.index
      const dropIndex = index

      onDrop &&
        onDrop({
          dragIndex,
          dropIndex
        })
      lastTarget.index = dropIndex
    }
  })

  const [, drag, preview] = useDrag({
    item: { index, type: 'question' }
  })

  return onDrop
    ? {
        drag,
        drop,
        preview
      }
    : undefined
}
