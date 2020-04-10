import { useCallback, useState, useMemo } from 'react'

interface ListData {
  id: string
  [key: string]: any
}

export default function useCheckbox() {
  const [checkedMap, setCheckedMap] = useState<{ [key: string]: boolean }>({})
  const [isCheckAll, setIsCheckAll] = useState<boolean>(false)

  const handleCheck = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, checked) => {
      if (checked) {
        setCheckedMap(preCheckedMap => ({ ...preCheckedMap, [e.currentTarget.value]: checked }))
      } else {
        setCheckedMap(({ [e.currentTarget.value]: checked, ...rest }) => rest)
        setIsCheckAll(false)
      }
    },
    [setCheckedMap, setIsCheckAll]
  )

  const onCheckAll = useCallback(
    (list: ListData[]) => {
      setIsCheckAll(preIsCheckAll => {
        const isCheckedAll = !preIsCheckAll
        const newMap = {} as { [key: string]: boolean }
        if (isCheckedAll) {
          list.map(({ id }) => (newMap[id] = true))
        }
        setCheckedMap(newMap)
        return isCheckedAll
      })
    },
    [setIsCheckAll, setCheckedMap]
  )

  const isChecked = useCallback(id => !!checkedMap[id] || isCheckAll, [checkedMap, isCheckAll])

  const checkedList = useMemo(() => Object.keys(checkedMap), [checkedMap])

  return {
    onCheckAll,
    handleCheck,
    checkedList,
    isChecked,
    isCheckAll
  }
}
