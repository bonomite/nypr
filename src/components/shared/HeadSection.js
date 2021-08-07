import React, {Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import {useTheme} from '@material-ui/core/styles';
import {
  Grid,
  Typography,
  withStyles,
} from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {Tween} from 'react-gsap';

const styles = theme => ({
  wrapper: {
    background: 'linear-gradient(to right,  #90cea1 0%,#3cbec9 56%,#00b3e5 100%)',
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
  }
});

let imageWidth = null;

const HeadSection = ({
  classes,
  title,
  backdropPath,
}) => {

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));
  matches ? imageWidth='1280' : imageWidth='500';

  return (
    <Fragment>
      <div className={ `head-section top-wrapper-pt ${ classes.wrapper }`} >

        {
          backdropPath &&
          <Tween from={{opacity: '0'}} duration={5}>
            <div>
              <Tween from={{scale: '1.2'}} duration={7} ease="sine.inOut">
                <div className={ `${ classes.bgImage }` } style={{backgroundImage: `url('https://image.tmdb.org/t/p/w${imageWidth}${backdropPath}')`}}></div>
              </Tween>
            </div>
          </Tween>
        }

        <div className={ 'container-fluid' }>
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
    </Fragment>
  );
};

HeadSection.propTypes = {
  classes: PropTypes.object,
  title: PropTypes.string,
  backdropPath: PropTypes.string,
};

export default (withStyles(styles, {withTheme: true})(HeadSection));
