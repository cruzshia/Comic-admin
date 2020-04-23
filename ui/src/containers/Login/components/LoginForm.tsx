import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import Snackbar from '@material-ui/core/Snackbar'

interface Props {
  title: string
  onClick: () => void
}

// currently we use button for fake only
export default function LoginForm(props?: Props) {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <>
      <Button onClick={props?.onClick}>{props?.title}</Button>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={open}
        onClose={() => setOpen(false)}
        color='green'
        autoHideDuration={1000}
        message='Login success'
      />
    </>
  )
}
