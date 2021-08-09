import React from 'react';
import PropTypes from 'prop-types';
import {useTheme} from '@material-ui/core/styles';
import {
  Grid,
  withStyles,
  Box,
  Typography,
} from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {Tween} from 'react-gsap';
import StarRating from './StarRating';
import {usePalette} from 'color-thief-react';
import timeConvert from '../../helpers/timeConvert';
import FavoriteHeart from './FavoriteHeart';

const styles = theme => ({
  wrapper: {
    minHeight: 247,
  },
  bgImage:{
    position: 'absolute',
    top:0,
    left:0,
    width:'100%',
    height:'100%',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    filter: 'grayscale(100%) brightness(10%)',
    opacity: 0.5,
  },
  title:{
    color: theme.palette.common.white,
  },
  headerContent:{
    color: theme.palette.common.white,
    '& .poster':{
      width: '100%'
    },
    '& .favorite':{
      position: 'absolute',
      top: 30,
      right: 30,
    },
  },
});

let imageWidth = null;

const HeadSectionMovie = ({
  classes,
  movieData,
  localStorageArr,
}) => {

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));
  matches ? imageWidth='1280' : imageWidth='500';

  const imgPath = movieData?.backdrop_path !== ''  ? `https://image.tmdb.org/t/p/w${imageWidth}${movieData?.backdrop_path}` : process.env.PUBLIC_URL + '/no-poster.jpg';
  const imgPosterPath = movieData?.poster_path !== ''  ? `https://image.tmdb.org/t/p/w${imageWidth}${movieData?.poster_path}` : process.env.PUBLIC_URL + '/no-poster.jpg';

  // gets 3 colors from the image
  let {data, loading} = usePalette(imgPosterPath, 5, 'hex', {crossOrigin:true, quality:200});
  if(!data){
    data = ["#90cea1", "", "#3cbec9", "", "#00b3e5"];
  }

  const genres = () => {
    var genresArr =  movieData.genres.map(x => x.name);
    return genresArr.join(', ');
  };

  if(loading) return false;

  return (
    <>
      <div className={ `head-section ${ classes.wrapper }`} style={{background: `linear-gradient(to right,${data[0]} 0%,${data[1]} 50% ,${data[4]} 100%)`}}>

        <Tween from={{opacity: '0'}} duration={5}>
          <div>
            <Tween from={{scale: '1.2'}} duration={7} ease="sine.inOut">

              <div className={ `${ classes.bgImage }` } style={{backgroundImage: `url(${imgPath})`}}> </div>

            </Tween>
          </div>
        </Tween>

        <div className={`container-fluid ${classes.headerContent}`}>
          <Box pt={2} display='flex'>
            <Grid container spacing={4}>
              <Grid item xs={12} sm={4} style={{position:"relative"}} >
                <img className="poster" src={ imgPosterPath } alt={`Poster for ${movieData.title}`} />
                <FavoriteHeart
                  className="favorite"
                  data={movieData}
                  localStorageArr={localStorageArr}
                />
                <StarRating score={movieData.vote_average}></StarRating>
              </Grid>

              <Grid item xs={12} sm={8}>
                <Grid container spacing={4}>
                  <Grid item xs={12}>
                    <Typography variant="h3">{movieData.title}</Typography>
                    <Typography>{movieData.release_date} • {genres()} • {timeConvert(movieData.runtime)}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h5">Overview:</Typography>
                    <Typography >{movieData.overview}</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </div>
      </div>
    </>
  );
};

HeadSectionMovie.defaultProps = {
  title: '',
  backdropPath: '',
  matchColor: false,
  movieData: null,
  localStorageArr: [],
};

HeadSectionMovie.propTypes = {
  classes: PropTypes.object,
  title: PropTypes.string,
  backdropPath: PropTypes.string,
  movieData: PropTypes.object,
  localStorageArr: PropTypes.array,
};

export default (withStyles(styles, {withTheme: true})(HeadSectionMovie));
