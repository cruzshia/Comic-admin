import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StoreState } from '@src/reducers'
import { getNGWordAction, updateNGWordAction } from '@src/reducers/user/NGWord/ngWordActions'
import NGWordManage from './components/NGWordManage'

export default function NGWord() {
  const ngWords = useSelector((state: StoreState) => state.ngWord)
  const dispatch = useDispatch()

  const handleUpdateNGWord = useCallback(value => dispatch(updateNGWordAction(value)), [dispatch])
  const handleGetNGWord = useCallback(() => {
    dispatch(getNGWordAction())
  }, [dispatch])

  return <NGWordManage ngWords={ngWords} onGetNGWord={handleGetNGWord} onUpdateNGWord={handleUpdateNGWord} />
}
