import React from 'react';
import PropTypes from 'prop-types';
import {
  withStyles,
  Typography,
  Grid,
  IconButton,
  Toolbar,
  AppBar,
  Dialog,
  Slide,
  Box,
} from '@material-ui/core';
import {getVideos} from '../../helpers/my-api';
import {useQuery} from 'react-query';
import ReactPlayer from 'react-player';
import CloseIcon from '@material-ui/icons/Close';


const styles = theme => ({
  playerWrapper:{
    position: 'relative',
    paddingTop: '56.25% !important',
    cursor:'pointer',

    '& .react-player': {
      position: 'absolute',
      top: 0,
      left: 0,
      pointerEvents:'none',
    },
  },
  appBar: {
    position: 'relative',
    background: theme.palette.common.darkBlack,
    color: theme.palette.common.white,
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const PlayVideos = ({
  classes,
  id,
}) => {

  // eslint-disable-next-line no-unused-vars
  const {isLoading, error, data, isSuccess} = useQuery( ['videos', id], () => getVideos(id), {keepPreviousData : true, refetchOnWindowFocus: false} );

  const [selectedVideoIndex, setSelectedVideoIndex] = React.useState(0);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (index) => {
    setSelectedVideoIndex(index);
    setOpen(true);
  };

  const handleClose = (e) => {
    setOpen(false);
  };

  return (
    <>
      <Typography variant="h5">Videos:</Typography>
      <Box mt={3}></Box>
      {
        data &&
        <>
          <Grid container spacing={3}>
            {
              data.results.map((val,index) => (

                <Grid
                  item
                  key={ val.key }
                  xs={12} sm={6} md={4}
                  onClick={ () => handleClickOpen(index) }
                >
                  <div className={classes.playerWrapper} >
                    <ReactPlayer
                      className='react-player'
                      width='100%'
                      height='100%'
                      light
                      controls
                      url={`https://www.youtube.com/watch?v=${val.key}`}
                    />
                  </div>
                </Grid>
              ))
            }
          </Grid>

          <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
            <AppBar className={classes.appBar}>
              <Toolbar>
                <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                  <CloseIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                  {data.results[selectedVideoIndex].name}
                </Typography>

              </Toolbar>
            </AppBar>
            <ReactPlayer
              className='react-player'
              width='100%'
              height='100%'
              controls
              autoplay
              url={`https://www.youtube.com/watch?v=${data.results[selectedVideoIndex].key}`}
            />
          </Dialog>
        </>
      }

    </>
  );
};

PlayVideos.defaultProps = {
  id: null,
};

PlayVideos.propTypes = {
  id: PropTypes.number,

};

export default (withStyles(styles, {withTheme: true})(PlayVideos));
