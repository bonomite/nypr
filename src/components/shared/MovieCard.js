import React, {Suspense, useRef, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import PropTypes from 'prop-types';
import {useImage} from 'react-image';
import {
  Grid,
  Box,
  Typography,
  withStyles,
  ButtonBase,
} from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import gsap from 'gsap';
import FavoriteHeart from './FavoriteHeart';
import StarRating from './StarRating';

const styles = theme => ({
  movieCard: {
    perspective: 550,
    display: 'flex',
    width: 150,
    marginBottom: 48,
    '&:hover':{
      '& .img':{
        transformStyle: 'preserve-3d',
        transform: 'rotateY(-10deg) rotateX(-10deg) rotateZ(2deg)',
        '& img':{
          boxShadow: theme.shadows[6],
        },
      },
      '& .content':{
        color: theme.palette.common.darkBlack,
      },
    },
    '& .img':{
      transition: 'all 0.25s',
      '& img':{
        transition: 'all 0.25s',
        borderRadius: theme.shape.borderRadius,
        width: '100%',
        boxShadow: theme.shadows[2],
      },
    },
    '& .content':{
      transition: 'all 0.25s',
      color: theme.palette.grey[800],
      width: '100%',
      '& .MuiTypography-root':{
        textAlign: 'left',
      },
    },
    '& .favorite':{
      position: 'absolute',
      top: 10,
      right: 10,
    }
  },
});


const MovieCard = ({
  classes,
  data,
  localStorageArr,
}) => {

  const card = useRef();
  const history = useHistory();

  useEffect(() => {
    gsap.from(card.current,{duration:1, scale:0.85, opacity:0, ease: 'back.out'});
  }, []);


  const handleClick = (e) => {
    history.push(`/movie?id=${data.id}`);
    if(history.location.pathname === '/movie'){
      history.go(0);
    }
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
      srcList: data.poster_path !== ''  ? `https://www.themoviedb.org/t/p/w220_and_h330_face${data.poster_path}` : process.env.PUBLIC_URL + '/no-poster.jpg',
    });
    return (
      <Grid container>
        <Grid item className="img">
          <img src={src} alt={`Poster for ${data.title}`}/>
          <StarRating score={data.vote_average}></StarRating>
        </Grid>
        <Grid item className="content">
          <Typography>{data.title}</Typography>
        </Grid>
      </Grid>
    );
  };

  return (

    <ButtonBase
      className={classes.movieCard}
      onClick={ handleClick }
      title={`${data.title} - ${Math.round(data.vote_average / 2)} Stars`}
      ref={card}
    >

      <Suspense fallback={ <PosterImageSkeleton/> }>

        <FavoriteHeart
          data={data}
          localStorageArr={localStorageArr}
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
  localStorageArr: PropTypes.array,
};

export default (withStyles(styles, {withTheme: true})(MovieCard));
