import React from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  withStyles,
  withWidth,
  CircularProgress ,
} from '@material-ui/core';
import SVG from 'react-inlinesvg';
import {useHistory} from 'react-router-dom';

const styles = theme => ({
  wrapper: {
  },
});

const TheHeader = ({
  classes,

}) => {

  const history = useHistory();

  const handleClick = (e) => {
    history.push(`/`);
  };

  return (
    <>
      <div className={ `the-header ${ classes.wrapper }` }>
        <div className={ 'container-fluid' }>
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
          >

            <SVG
              description="The TMDB logo"
              loader={ <CircularProgress /> }
              src="logo.svg"
              title="TMDB"
              width={ 150 }
              height={ 50 }
              onClick={ handleClick }
              style={{cursor: 'pointer'}}
            />

          </Grid>
        </div>
      </div>
    </>
  );
};

TheHeader.propTypes = {
  classes: PropTypes.object,
};

export default withWidth()(withStyles(styles, {withTheme: true})(TheHeader));
