import React from 'react'
import { useIntl } from 'react-intl'
import { makeStyles } from '@material-ui/core'
import { mainColor } from '@src/common/styles'
import applicationMessages from '../messages'
import { Status } from '../constants'
import clsx from 'clsx'

const useStyles = makeStyles({
  status: {
    width: 80,
    lineHeight: '20px',
    borderRadius: '10px',
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
    '&.opened': {
      backgroundColor: mainColor
    },
    '&.reserved': {
      backgroundColor: '#A2CD5A'
    },
    '&.closed': {
      backgroundColor: '#757575'
    }
  }
})
export default function Capsule({ status }: { status: Status }) {
  const classes = useStyles()
  const { formatMessage } = useIntl()
  return (
    <div className={clsx(classes.status, Status[status as keyof typeof Status])}>
      {formatMessage(applicationMessages[status as keyof typeof applicationMessages])}
    </div>
  )
}
