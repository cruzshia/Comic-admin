import { useRef } from 'react'
import { makeStyles } from '@material-ui/core'
import { errorColor, fontWeightBold } from '@src/common/styles'

export const toListTableData = (data: any, theadList: Object) => {
  return Object.values(theadList).reduce(
    (acc, key) => ({
      ...acc,
      [key]: data[key]
    }),
    {} as any
  )
}

export enum ScrollAnchor {
  ReleaseDuration = 'releaseDuration',
  Content = 'content'
}

export const useUserRef = () => {
  const releaseDurationRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const allAnchorRefs = {
    [ScrollAnchor.ReleaseDuration]: releaseDurationRef,
    [ScrollAnchor.Content]: contentRef
  }

  return {
    allAnchorRefs,
    releaseDurationRef,
    contentRef
  }
}

export const useCsvLogsStyles = makeStyles({
  listTable: {
    '& > .MuiGrid-root': {
      marginTop: '5px'
    },
    '& .ListTable-col-1': {
      width: 150
    },
    '& .ListTable-col-2,.ListTable-col-3,.ListTable-col-4': {
      width: 140
    },
    '& .ListTable-col-5': {
      width: 270
    },
    '& .ListTable-col-6': {
      width: 80
    },
    '& .ListTable-col-7': {
      width: 260
    }
  },
  fileName: {
    '& > .MuiButtonBase-root': {
      paddingLeft: '5px'
    }
  },
  error: {
    color: errorColor,
    fontWeight: fontWeightBold,
    '& > svg': {
      marginRight: '6px'
    }
  }
})
