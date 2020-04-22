import React, { useCallback } from 'react'
import { makeStyles } from '@material-ui/core'
import { TreeView, TreeItem } from '@material-ui/lab'
import { TextArea } from '@src/components/form'
import { backgroundColorLightGray } from '@src/common/styles'
import { ReactComponent as ExpandIcon } from '@src/assets/common/arrow_drop_down_filled.svg'
import { mockSettingData } from '../../../../epics/application/displaySetting/mockData/mockSetting'
import clsx from 'clsx'

const useStyles = makeStyles({
  textarea: {
    zIndex: 2,
    maxWidth: 700,
    '& .MuiInputBase-root': {
      fontSize: '12px'
    }
  },
  root: {
    padding: '10px',
    '& .MuiTreeItem-root': {
      margin: '10px 0',
      '&:last-child': {
        marginBottom: 0
      },
      '& .MuiTreeItem-label': {
        maxWidth: 750,
        '&:hover': {
          backgroundColor: 'unset'
        }
      },
      '& .MuiCollapse-wrapper': {
        marginLeft: '20px'
      },
      '&.Mui-selected > .MuiTreeItem-content .MuiTreeItem-label': {
        backgroundColor: 'unset',
        '&:hover': {
          backgroundColor: 'unset'
        },
        '& .MuiInputBase-root': {
          backgroundColor: '#E3F2FD'
        }
      }
    },
    '& > .MuiTreeItem-root': {
      borderRadius: '4px',
      padding: '10px 0',
      backgroundColor: backgroundColorLightGray,
      '&:first-child': {
        marginTop: 0
      }
    },
    '& .MuiTreeItem-label': {
      padding: 0
    },
    '& .MuiTreeItem-iconContainer': {
      height: 30,
      width: 30,
      marginRight: '5px'
    }
  },
  icon: {
    '&.collapse': {
      transform: 'rotate(270deg)'
    }
  }
})

interface RenderTree {
  id: string
  value: string
  children?: RenderTree[]
}

const toTreeData = (data: any) => data

export default function SectionTree() {
  const classes = useStyles()
  const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation()
    e.preventDefault()
  }, [])

  const renderTree = (nodes: RenderTree) => (
    <TreeItem
      key={nodes.id}
      nodeId={nodes.id}
      label={<TextArea classnames={classes.textarea} value={nodes.value} autoSize onClick={handleClick} />}
    >
      {Array.isArray(nodes.children) ? nodes.children.map(node => renderTree(node)) : null}
    </TreeItem>
  )

  return (
    <>
      <TreeView
        className={classes.root}
        defaultCollapseIcon={<ExpandIcon className={classes.icon} />}
        defaultExpandIcon={<ExpandIcon className={clsx(classes.icon, 'collapse')} />}
        defaultExpanded={['1', '3', '8', '9', '10']}
      >
        {toTreeData(mockSettingData).map((item: any) => renderTree(item))}
      </TreeView>
    </>
  )
}
