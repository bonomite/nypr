import React, {Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';

import {
  Grid,
  Typography,
  withStyles,
  withWidth,
} from '@material-ui/core';

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

let windowWidth = 1280;

const HeadSection = ({
  classes,
  title,
  backdropPath,
}) => {

  useEffect(() => {
    windowWidth = window.innerWidth;
    return (() => {
      //console.log('un-mounted')
    });
  }, []);

  return (
    <Fragment>
      <div className={ `head-section top-wrapper-pt ${ classes.wrapper }`} >

        {
          backdropPath &&
          <Tween from={{opacity: '0'}} duration={5}>
            <div>
              <Tween from={{scale: '1.2'}} duration={7} ease="sine.inOut">
                <div className={ `${ classes.bgImage }` } style={{backgroundImage: `url('https://image.tmdb.org/t/p/w${windowWidth < 768 ? '500' : '1280'}${backdropPath}')`}}></div>
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

export default withWidth()(withStyles(styles, {withTheme: true})(HeadSection));
