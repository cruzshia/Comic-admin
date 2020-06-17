import { useEffect, useCallback } from 'react'
import { Subscription } from 'rxjs'
import { successSubject, errorSubject } from '@src/utils/responseSubject'
import GlobalSpinner from '@src/components/GlobalSpinner'

interface Props {
  endActions: {
    success?: string[]
    error?: string[]
  }
}

export default function useLoading({ endActions }: Props) {
  const openSpinner = useCallback(() => GlobalSpinner.open(), [])
  const closeSpinner = useCallback(() => GlobalSpinner.close(), [])

  useEffect(() => {
    const { success, error } = endActions || {}
    let [successSub, errorSub]: (undefined | Subscription)[] = []
    if (success) {
      successSub = successSubject.subscribe(success, closeSpinner)
    }
    if (error) {
      errorSub = errorSubject.subscribe(error, closeSpinner)
    }

    return () => {
      successSub?.unsubscribe()
      errorSub?.unsubscribe()
    }
  }, [endActions, closeSpinner])

  return {
    openSpinner
  }
}
