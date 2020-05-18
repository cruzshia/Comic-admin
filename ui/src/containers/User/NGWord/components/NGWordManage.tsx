import React, { useState, useMemo, useEffect, useCallback } from 'react'
import { useIntl } from 'react-intl'
import { Grid, makeStyles } from '@material-ui/core'
import ContentHeader, { Breadcrumb } from '@src/components/ContentHeader/ContentHeader'
import { borderColorLight } from '@src/common/styles'
import { NGWordActionType } from '@src/reducers/user/NGWord/ngWordActions'
import { NGWordState } from '@src/reducers/user/NGWord/ngWordReducer'
import { successSubject } from '@src/utils/responseSubject'
import { BREADCRUMBS } from '../constants'
import messages from '../messages'
import NGWordForm from './NGWordForm'
import clsx from 'clsx'

enum NGWordTab {
  Comment = 'comment',
  Account = 'account'
}

const useStyles = makeStyles({
  tabs: {
    transform: 'translateY(2px)',
    '& .MuiGrid-root': {
      cursor: 'pointer',
      border: `2px solid ${borderColorLight}`,
      borderRadius: '4px 4px 0 0',
      padding: '11px 18px',
      marginLeft: '5px',
      '&:first-child': {
        margin: 0
      },
      '&.selected': {
        backgroundColor: '#FFFFFF',
        borderBottom: 0
      }
    }
  }
})

interface Props {
  ngWords: NGWordState
  onGetNGWord: () => void
  onUpdateNGWord: (data: NGWordState) => void
}

export default function NGWordManage({ ngWords, onGetNGWord, onUpdateNGWord }: Props) {
  const classes = useStyles()
  const { formatMessage } = useIntl()
  const [loaded, setLoaded] = useState<boolean>(false)
  const [tab, setTab] = useState<NGWordTab>(NGWordTab.Comment)

  useEffect(() => {
    const subscription = successSubject.subscribe([NGWordActionType.GET_SUCCESS], () => {
      setLoaded(true)
    })
    return () => subscription.unsubscribe()
  }, [])
  useEffect(() => onGetNGWord(), [onGetNGWord])

  const handleUpdate = useCallback(
    (ngWord: string) => {
      onUpdateNGWord({
        ...ngWords,
        [tab]: ngWord
      })
    },
    [tab, onUpdateNGWord, ngWords]
  )

  const createTabClickHandler = (selectedTab: NGWordTab) => () => setTab(selectedTab)
  const breadcrumbList: Breadcrumb[] = useMemo(
    () =>
      BREADCRUMBS.map(({ title }) => ({
        title: formatMessage(title)
      })),
    [formatMessage]
  )
  const tabList = [
    {
      id: NGWordTab.Comment,
      label: formatMessage(messages.commentNGWord)
    },
    { id: NGWordTab.Account, label: formatMessage(messages.accountNGWord) }
  ]

  return loaded ? (
    <>
      <ContentHeader breadcrumbList={breadcrumbList} titleText={formatMessage(messages.userNGWordManagement)} />
      <Grid container className={classes.tabs} wrap='nowrap'>
        {tabList.map(({ id, label }) => (
          <Grid
            data-testId='ng-word-tab'
            key={id}
            className={clsx({ selected: tab === id })}
            onClick={createTabClickHandler(id)}
          >
            {label}
          </Grid>
        ))}
      </Grid>
      <NGWordForm key={tab} ngWord={ngWords[tab]} onSubmit={handleUpdate} />
    </>
  ) : null
}
