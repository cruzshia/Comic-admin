import React from 'react'
import { Link } from 'react-router-dom'
import { Breadcrumbs, Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'
import { hyperlinkColor, contentWidth } from '@src/common/styles'
import { BREADCRUMB_SEPARATOR } from '@src/common/constants'

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
    maxWidth: contentWidth,
    padding: '15px 0px',
    '& button:nth-child(n+2)': {
      marginRight: 10
    },
    '&>div': {
      width: 'auto'
    }
  }
}))

export interface Breadcrumb {
  title: string
  route?: string
}
interface Props {
  breadcrumbList: Breadcrumb[]
  titleText?: string
  buttonList?: JSX.Element[]
}
export default function ContentHeader({ breadcrumbList, titleText, buttonList: ButtonList }: Props) {
  const classes = useStyles()
  return (
    <>
      <Breadcrumbs separator={BREADCRUMB_SEPARATOR} className={classes.breadcrumb} data-testid='breadcrumbs'>
        {breadcrumbList &&
          breadcrumbList.map(({ title, route }) => {
            if (route) {
              return (
                <Link key={route} to={route} data-testid='breadcrumbs-link'>
                  {title}
                </Link>
              )
            }
            return (
              <span key={title} data-testid='breadcrumbs-text'>
                {title}
              </span>
            )
          })}
      </Breadcrumbs>
      <Grid className={classes.header} container justify='space-between'>
        <Grid item>
          <Typography variant='h6' data-testid='content-header-title'>
            {titleText}
          </Typography>
        </Grid>
        <Grid item container direction='row-reverse' data-testid='content-header-buttons'>
          {ButtonList && ButtonList.map((btn, idx) => <React.Fragment key={idx}>{btn}</React.Fragment>)}
        </Grid>
      </Grid>
    </>
  )
}
