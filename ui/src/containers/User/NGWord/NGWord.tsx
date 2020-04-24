import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StoreState } from '@src/reducers'
import { getNGWordAction, updateNGWordAction } from '@src/reducers/user/NGWord/ngWordActions'
import NGWordList from './components/NGWordList'

export default function NGWord() {
  const { ngWord } = useSelector((state: StoreState) => state.ngWord)
  const dispatch = useDispatch()

  const handleSubmit = useCallback(value => dispatch(updateNGWordAction(value)), [dispatch])
  const handleGetNGWord = useCallback(() => {
    dispatch(getNGWordAction())
  }, [dispatch])

  return <NGWordList onSubmit={handleSubmit} currentNGWord={ngWord} onGetNGWord={handleGetNGWord} />
}
