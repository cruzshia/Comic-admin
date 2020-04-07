import { useCallback, useState } from 'react'
import { SortOrder } from '@src/components/table/ListTable'

function getMultiplier(order: SortOrder) {
  return order === SortOrder.Asc ? 1 : -1
}

export default function useSort<T>(sortKey: T | string, order?: SortOrder) {
  const defaultOrder = order || SortOrder.Desc
  const [sortBy, setSortBy] = useState<{ key: T | string; order: SortOrder; multiplier: number }>({
    key: sortKey,
    order: defaultOrder,
    multiplier: getMultiplier(defaultOrder)
  })

  const handleSort = useCallback(
    (id: string) => {
      setSortBy(({ key, order }) => {
        const newOrder = id === key && order === SortOrder.Desc ? SortOrder.Asc : SortOrder.Desc
        return {
          key: id,
          order: newOrder,
          multiplier: getMultiplier(newOrder)
        }
      })
    },
    [setSortBy]
  )

  return {
    sortBy,
    handleSort
  }
}
