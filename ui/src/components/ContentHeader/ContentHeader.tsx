import React from 'react'
import { Link } from 'react-router-dom'
import { Breadcrumbs, Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'
import { hyperlinkColor } from '@src/common/styles'

const useStyles = makeStyles(theme => ({
  breadcrumb: {
    color: theme.palette.secondary.main,
    paddingTop: 5,
    fontSize: 12,
    '& a, a:visited': {
      textDecoration: 'underline',
      color: hyperlinkColor
    },
    '& .MuiBreadcrumbs-separator': {
      margin: '0px 4px'
    }
  },
  header: {
    padding: '15px 0px ',
    '& button:nth-child(n+2)': {
      marginRight: 10
    },
    '&>div': {
      width: 'auto'
    }
  }
}))

interface Props {
  breadcrumbList: { title: string; route?: string }[]
  titleText?: string
  buttonList?: JSX.Element[]
}
export default function ContentHeader({ breadcrumbList, titleText, buttonList: ButtonList }: Props) {
  const classes = useStyles()
  return (
    <>
      <Breadcrumbs separator='>' className={classes.breadcrumb}>
        {breadcrumbList &&
          breadcrumbList.map(({ title, route }) => {
            if (route) {
              return (
                <Link key={route} to={route}>
                  {title}
                </Link>
              )
            }
            return <span key={title}>{title}</span>
          })}
      </Breadcrumbs>
      <Grid className={classes.header} container justify='space-between'>
        <Grid item>
          <Typography variant='h6'>{titleText}</Typography>
        </Grid>
        <Grid item container direction='row-reverse'>
          {ButtonList && ButtonList.map((btn, idx) => <React.Fragment key={idx}>{btn}</React.Fragment>)}
        </Grid>
      </Grid>
    </>
  )
}
