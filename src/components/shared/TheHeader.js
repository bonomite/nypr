import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  withStyles,
  withWidth,
} from '@material-ui/core';
import SVG from 'react-inlinesvg';

const styles = theme => ({
  wrapper: {
  },
});

const TheHeader = ({
  classes,

}) => {
  return (
    <Fragment>
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
              loader={ <span>Loading...</span> }
              src="logo.svg"
              title="TMDB"
              width={ 150 }
              height={ 50 }
            />

          </Grid>
        </div>
      </div>
    </Fragment>
  );
};

TheHeader.propTypes = {
  classes: PropTypes.object,
};

export default withWidth()(withStyles(styles, {withTheme: true})(TheHeader));
