import React from 'react'
import { makeStyles } from '@material-ui/core'
import { borderColorLight, backgroundColorLightGray } from '@src/common/styles'

const useStyle = makeStyles(() => ({
  scrollBox: {
    maxWidth: 800,
    width: ({ width }: Prop) => width || '100%',
    height: ({ height }: Prop) => height || 188,
    padding: '10px 15px',
    backgroundColor: backgroundColorLightGray,
    border: `1px solid ${borderColorLight}`,
    overflowY: 'auto',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word'
  }
}))

interface Prop {
  width?: number
  height?: number
  children?: string | JSX.Element
}

export default function ScrollableContent({ children, ...style }: Prop) {
  const classes = useStyle(style)
  return <div className={classes.scrollBox}>{children}</div>
}