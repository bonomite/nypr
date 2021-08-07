import React from 'react';
import PropTypes from 'prop-types';
import {
  withStyles,
} from '@material-ui/core';

import Rating from '@material-ui/lab/Rating';

const styles = theme => ({
  rating:{
    margin: '-24px auto 8px auto',
    display: 'flex',
    width: 80,
    fontSize: '1rem',
    WebkitFilter: 'drop-shadow( 1.5px 1.5px 0px rgba(0, 0, 0, 0.3))',
    filter: 'drop-shadow( 1.5px 1.5px 0px rgba(0, 0, 0, 0.3))',
    '& .MuiRating-iconEmpty':{
      color: '#ffffff99'
    }
  },
});

const StarRating = ({
  classes,
  score,
}) => {

  return (
    <>
      <Rating className={classes.rating} value={score/2} readOnly />
    </>

  );
};

StarRating.defaultProps = {
  score: 0,
};

StarRating.propTypes = {
  score: PropTypes.number,

};

export default (withStyles(styles, {withTheme: true})(StarRating));
