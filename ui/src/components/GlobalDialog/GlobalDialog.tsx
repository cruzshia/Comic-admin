import React, { useCallback, useState, useEffect } from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { Subject } from 'rxjs'

interface DialogProp {
  open?: boolean
  title?: string
  content: string | JSX.Element
  okText?: string
  closeText?: string
  onOK?: () => void
  onClose?: () => void
}
const dialogSubject = new Subject<DialogProp>()

const initState = {
  open: false,
  content: '',
  title: undefined,
  okText: undefined,
  closeText: undefined,
  onOK: undefined,
  onClose: undefined
}

const GlobalDialog = function() {
  const [{ open, title, content, okText, closeText, onOK, onClose }, setContent] = useState<DialogProp>(initState)

  useEffect(() => {
    const subscription = dialogSubject.subscribe((data: DialogProp) => {
      setContent(data)
    })
    return () => subscription.unsubscribe()
  }, [])

  const handleClose = useCallback(() => {
    onClose && onClose()
    setContent(initState)
  }, [onClose, setContent])

  const handleOK = useCallback(() => {
    onOK && onOK()
    setContent(initState)
  }, [onOK, setContent])

  return (
    <Dialog open={!!open} onClose={handleClose} transitionDuration={100}>
      {title && <DialogTitle>{title}</DialogTitle>}
      <DialogContent>
        <DialogContentText>{content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color='primary'>
          {closeText || 'Close'}
        </Button>
        {okText && (
          <Button onClick={handleOK} color='primary'>
            {okText || 'OK'}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  )
}

GlobalDialog.open = function(props: DialogProp) {
  dialogSubject.next({
    ...props,
    open: true
  })
}

GlobalDialog.close = function() {
  dialogSubject.next(initState)
}

export default GlobalDialog
