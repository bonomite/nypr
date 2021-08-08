import {withStyles} from '@material-ui/core';

const headerHeight = 70;

const styles = theme => ({
  '@global': {
    /**
     * Disable the focus outline, which is default on some browsers like
     * chrome when focusing elements
     */
    '.the-header':{
      position: 'fixed',
      backgroundColor: theme.palette.common.darkBlack,
      zIndex:100,
      top: 0,
      width: '100%',
      boxShadow: theme.shadows[6],
      '& .MuiGrid-root':{
        height: headerHeight,
      }
    },

    '.favorite':{
      zIndex: 1,
      opacity: 0.6,
      color: theme.palette.common.white,
      cursor: 'pointer',
      WebkitFilter: 'drop-shadow( 2px 2px 2px rgba(0, 0, 0, 0.4))',
      filter: 'drop-shadow( 2px 2px 2px rgba(0, 0, 0, 0.4))',
      transition: 'all 0.25s',
      '&:hover':{
        opacity:'1 !important',
      },
    },

    '.head-section':{
      marginBottom: 24,
      overflow: 'hidden',
      marginTop:headerHeight,
      position: 'relative',
      backgroundColor: theme.palette.primary.main,
      paddingBottom: theme.spacing(2),
    },

    '*:focus': {
      outline: 0,
    },
    '.text-white': {
      color: theme.palette.common.white,
    },
    '.container': {
      width: '100%',
      paddingRight: theme.spacing(4),
      paddingLeft: theme.spacing(4),
      marginRight: 'auto',
      marginLeft: 'auto',
      [theme.breakpoints.up('sm')]: {
        maxWidth: 540,
      },
      [theme.breakpoints.up('md')]: {
        maxWidth: 720,
      },
      [theme.breakpoints.up('lg')]: {
        maxWidth: 1294,
      },
    },
    '.row': {
      display: 'flex',
      flexWrap: 'wrap',
      marginRight: -theme.spacing(2),
      marginLeft: -theme.spacing(2),
    },
    '.container-fluid': {
      position: 'relative',
      width: '100%',
      paddingRight: theme.spacing(2),
      paddingLeft: theme.spacing(2),
      marginRight: 'auto',
      marginLeft: 'auto',
      maxWidth: 1294,
    },
    '.top-wrapper-mt': {
      marginTop: `${ theme.spacing(20) }px !important`,
      [theme.breakpoints.down('md')]: {
        marginTop: `${ theme.spacing(18) }px !important`,
      },
      [theme.breakpoints.down('sm')]: {
        marginTop: `${ theme.spacing(16) }px !important`,
      },
      [theme.breakpoints.down('xs')]: {
        marginTop: `${ theme.spacing(14) }px !important`,
      },
    },
    '.bottom-wrapper-mb': {
      marginBottom: `${ theme.spacing(20) }px !important`,
      [theme.breakpoints.down('md')]: {
        marginBottom: `${ theme.spacing(18) }px !important`,
      },
      [theme.breakpoints.down('sm')]: {
        marginBottom: `${ theme.spacing(16) }px !important`,
      },
      [theme.breakpoints.down('xs')]: {
        marginBottom: `${ theme.spacing(14) }px !important`,
      },
    },
    '.top-wrapper-pt': {
      paddingTop: `${ theme.spacing(20) }px !important`,
      [theme.breakpoints.down('md')]: {
        paddingTop: `${ theme.spacing(18) }px !important`,
      },
      [theme.breakpoints.down('sm')]: {
        paddingTop: `${ theme.spacing(16) }px !important`,
      },
      [theme.breakpoints.down('xs')]: {
        paddingTop: `${ theme.spacing(14) }px !important`,
      },
    },
  },
});

function globalStyles() {
  return null;
}

export default withStyles(styles, {withTheme: true})(globalStyles);
