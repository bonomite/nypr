import React from 'react';
import PropTypes from 'prop-types';
import {useTheme} from '@material-ui/core/styles';
import {
  Grid,
  withStyles,
  Typography
} from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {Tween} from 'react-gsap';

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
    filter: 'grayscale(100%)',
    opacity: 0.2,
  },
  title:{
    color: theme.palette.common.white,
  },
  headerContent:{
    '& .poster':{
      width: '100%'
    },
  }
});

let imageWidth = null;

const HeadSection = ({
  classes,
  title,
  backdropPath,
  movieData,
}) => {

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));
  matches ? imageWidth='1280' : imageWidth='500';
  const imgPath = backdropPath !== ''  ? `https://image.tmdb.org/t/p/w${imageWidth}${backdropPath}` : process.env.PUBLIC_URL + '/no-poster.jpg';
  const data = ["#90cea1", "", "#3cbec9", "", "#00b3e5"];

  return (
    <>
      <div className={ `head-section top-wrapper-pt ${ classes.wrapper }`} style={{background: `linear-gradient(to right,${data[0]} 0%,${data[1]} 50% ,${data[4]} 100%)`}}>

        {
          backdropPath &&
          <Tween from={{opacity: '0'}} duration={5}>
            <div>
              <Tween from={{scale: '1.2'}} duration={7} ease="sine.inOut">

                <div className={ `${ classes.bgImage }` } style={{backgroundImage: `url(${imgPath})`}}> </div>

              </Tween>
            </div>
          </Tween>
        }

        <div className={`container-fluid ${classes.headerContent}`}>
          <Grid container>

            <Grid item>
              <Typography
                variant="h2"
                className={classes.title}
              >
                { title }
              </Typography>
            </Grid>
          </Grid>

        </div>
      </div>
    </>
  );
};

HeadSection.defaultProps = {
  title: '',
  backdropPath: '',
  matchColor: false,
  movieData: null,
};

HeadSection.propTypes = {
  classes: PropTypes.object,
  title: PropTypes.string,
  backdropPath: PropTypes.string,
  movieData: PropTypes.object,
};

export default (withStyles(styles, {withTheme: true})(HeadSection));
