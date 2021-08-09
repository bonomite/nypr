import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  withStyles,
  withWidth,
  CircularProgress,
  Hidden,
  IconButton,
} from '@material-ui/core';

import SVG from 'react-inlinesvg';
import {useHistory} from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import CancelIcon from '@material-ui/icons/Cancel';

import SearchBarComp from '../../components/shared/SearchBarComp';

const styles = theme => ({

});

const TheHeader = ({
  classes,

}) => {

  const history = useHistory();

  const goHome = (e) => {
    history.push(`/`);
  };

  const [ showMobileSearch , setShowMobileSearch ] = useState(false);

  return (
    <>
      <div className={ `the-header ${ classes.wrapper }` }>
        <div className={ 'container-fluid' } style={{display: 'flex', height: 'inherit'}}>
          <Grid
            container
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item xs={4}>
              <SVG
                description="The TMDB logo"
                loader={ <CircularProgress /> }
                onError={error => console.log(error.message)}
                src={process.env.PUBLIC_URL + '/logo.svg'}
                title="TMDB"
                width={ 150 }
                height={ 50 }
                onClick={ goHome }
                style={{cursor: 'pointer'}}
              />
            </Grid>
            <Hidden smUp>

              <Grid item xs={1}>
                <IconButton
                  color="primary"
                  aria-label="search icon"
                  onClick={ () => setShowMobileSearch(!showMobileSearch) }
                >
                  {
                    showMobileSearch
                      ?
                      <CancelIcon />
                      :
                      <SearchIcon />
                  }
                </IconButton>
              </Grid>
              {
                showMobileSearch &&
                  <Grid item xs={12}>
                    <SearchBarComp/>
                  </Grid>
              }

            </Hidden>
            <Hidden xsDown>
              <Grid item xs={12} sm={8} md={4}>
                <SearchBarComp/>
              </Grid>
            </Hidden>

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
