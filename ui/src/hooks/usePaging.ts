import { useCallback, useState, useMemo } from 'react'
import { PAGE_LIMIT } from '@src/common/constants'

export default function usePaging({ perPage, total }: { perPage?: number; total: number }) {
  const pageItemNum = useMemo(() => perPage || PAGE_LIMIT, [perPage])
  const [page, setPage] = useState<number>(1)
  const handlePageChange = useCallback((_: React.ChangeEvent<unknown> | null, page: number) => setPage(page), [setPage])
  const pagination = useMemo(() => ({ total, start: (page - 1) * pageItemNum + 1, perPage: pageItemNum, page }), [
    page,
    total,
    pageItemNum
  ])
  const query = useMemo(
    () => ({
      offset: pagination.start - 1,
      limit: pagination.perPage
    }),
    [pagination.start, pagination.perPage]
  )

  return {
    page,
    pagination,
    handlePageChange,
    query
  }
}
