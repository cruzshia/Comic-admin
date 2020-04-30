import { useDrag, useDrop, DropTargetMonitor } from 'react-dnd'
import { TargetType } from 'dnd-core'
import { AdCategory } from '@src/reducers/comics/constant'

interface DragItem {
  index: number
  type: any
}

export interface DnDProp {
  dragName: AdCategory
  dragIndex: number
  dropName: AdCategory
  dropIndex: number
}

interface Props {
  type: any
  accept: TargetType
  index: number
  onDrop?: (props: DnDProp) => void
}

export default function useDnd({ type, accept, index, onDrop }: Props) {
  let lastTarget: DragItem = {
    type,
    index
  }
  const [, drop] = useDrop({
    accept,
    hover(_: DragItem, monitor: DropTargetMonitor) {
      lastTarget = monitor.getItem()
    },
    drop() {
      const isSameType = type === lastTarget.type
      // drop target => type, index
      // drag target => item

      const dragIndex = lastTarget.index
      const dropIndex = index
      if (isSameType && dragIndex === dropIndex) {
        return
      }

      onDrop &&
        onDrop({
          dragName: lastTarget.type,
          dragIndex,
          dropName: type,
          dropIndex
        })
      lastTarget.index = dropIndex
    }
  })

  const [, drag, preview] = useDrag({
    item: { type, index }
  })

  return onDrop
    ? {
        drag,
        drop,
        preview
      }
    : undefined
}
