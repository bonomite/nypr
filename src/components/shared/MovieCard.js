import React, {Fragment, Suspense, useRef} from 'react';
import PropTypes from 'prop-types';
import {useTheme} from '@material-ui/core/styles';
import {useImage} from 'react-image';
import {
  Grid,
  Box,
  Typography,
  withStyles,
  ButtonBase,
} from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Skeleton from '@material-ui/lab/Skeleton';
import {Tween} from 'react-gsap';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';

const styles = theme => ({
  movieCard: {
    display: 'flex',
    width: 150,
    marginBottom: 48,
    '&:hover':{
      '& .img':{
        '& img':{
          transformStyle: 'preserve-3d',
          transform: 'rotateY(-10deg) rotateX(-10deg) rotateZ(2deg)',
          boxShadow: theme.shadows[6],
        },
      },
      '& .content':{
        color: theme.palette.common.darkBlack,
      },
    },
    '& .img':{
      perspective: 550,
      '& img':{
        boxShadow: theme.shadows[2],
        transition: 'all 0.25s',
        borderRadius: theme.shape.borderRadius,
        width: '100%',
      },
    },
    '& .content':{
      transition: 'all 0.25s',
      color: theme.palette.grey[500],
      width: '100%',
      '& .MuiTypography-root':{
        textAlign: 'left',
      },
    },
    '& .favorite':{
      position: 'absolute',
      top: 10,
      right: 10,
      zIndex: 2,
      opacity: 0.6,
      color: theme.palette.common.white,
      cursor: 'pointer',
      WebkitFilter: 'drop-shadow( 2px 2px 2px rgba(0, 0, 0, 0.4))',
      filter: 'drop-shadow( 2px 2px 2px rgba(0, 0, 0, 0.4))',
      transition: 'all 0.25s',
      '&:hover':{
        opacity:1,
      },
    }
  },
});


const MovieCard = ({
  classes,
  data
}) => {

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));

  const heart = useRef();



  const handleClick = (e) => {
    console.log('card clicked');
    // animate heart

  };

  const handleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('heart clicked');
  };

  const PosterImageSkeleton = () => (
    <>
      <Box>
        <Skeleton variant="rect" width={150} height={225} />
        <Skeleton width="100%"/>
        <Skeleton width="60%"/>
      </Box>
    </>
  );

  const PosterImage = () => {
    const {src} = useImage({
      srcList: `https://www.themoviedb.org/t/p/w220_and_h330_face${data.poster_path}`,
    });
    return (
      <Tween
        from={{opacity: '0', scale:0.85}}
        duration={1}
        ease="back.out"
      >
        <Grid container>

          <Grid item className="img">
            <img src={src} alt={`Poster for ${data.title}`}/>
          </Grid>
          <Grid item className="content">
            <Typography>{data.title}</Typography>
          </Grid>
        </Grid>
      </Tween>
    );
  };

  return (

    <ButtonBase
      className={classes.movieCard}
      onClick={ handleClick }
      title={data.title}
    >
      <Suspense fallback={ <PosterImageSkeleton/> }>
        <FavoriteBorderIcon
          ref={heart}
          onClick={ handleFavorite }
          className="favorite"
        />
        <PosterImage/>
      </Suspense>
    </ButtonBase>

  );
};

MovieCard.propTypes = {
  classes: PropTypes.object,
  title: PropTypes.string,
  backdropPath: PropTypes.string,
};

export default (withStyles(styles, {withTheme: true})(MovieCard));
