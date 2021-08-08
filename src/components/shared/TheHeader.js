import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  withStyles,
  withWidth,
  CircularProgress,
  TextField,
  Typography,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

import SVG from 'react-inlinesvg';
import {useHistory} from 'react-router-dom';
import {useQuery} from 'react-query';

import {getSearch} from '../../helpers/my-api';

const styles = theme => ({
  searchField: {
    '& .MuiInputBase-root':{
      background: theme.palette.common.white,
    },
  },
  searchItems:{
    '& img':{
      width:70,
    },
  }
});

const TheHeader = ({
  classes,

}) => {

  const history = useHistory();

  const goHome = (e) => {
    history.push(`/`);
  };

  const [ searchValue , setSearchValue ] = useState('');

  const {/* isLoading, */ error, data} = useQuery( ['movieData', searchValue], () => getSearch(searchValue), {refetchOnWindowFocus: false} );

  //   if (isLoading) return <LinearProgress style={{width: '100%'}} />;
  //
  if (error) return `An error has occurred: ${ error.message }`;

  const onSetSearchValue = (e) => {
    setSearchValue(e.target.value);
  };

  const selectMovie = (id) => {
    history.push(`/movie?id=${id}`);
    if(history.location.pathname === '/movie'){
      history.go(0);
    }
  };

  return (
    <>
      <div className={ `the-header ${ classes.wrapper }` }>
        <div className={ 'container-fluid' } style={{display: 'flex', height: 'inherit'}}>
          <Grid
            container
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item xs={6}>
              <SVG
                description="The TMDB logo"
                loader={ <CircularProgress /> }
                src="logo.svg"
                title="TMDB"
                width={ 150 }
                height={ 50 }
                onClick={ goHome }
                style={{cursor: 'pointer'}}
              />
            </Grid>
            <Grid item xs={6} sm={4}>
              <Autocomplete
                className={classes.searchField}
                autoHighlight
                options={(data && data?.results?.length) ? data?.results : []}
                getOptionLabel={(option) => option.title}
                renderOption={(option) => {
                  const date = option.release_date;
                  const year = date ? date.substring(0,4) : '';
                  return (
                    <React.Fragment>
                      <Grid
                        className={classes.searchItems}
                        container
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="center"
                        onClick={ () => selectMovie(option.id) }
                      >
                        <Grid item xs={2}>
                          <img alt="search poster" src={`https://www.themoviedb.org/t/p/w220_and_h330_face${option.poster_path}`}/>
                        </Grid>
                        <Grid item xs={10}>
                          <Typography style={{marginLeft:24}}>{option.title} - {year}</Typography>

                        </Grid>
                      </Grid>
                    </React.Fragment>
                  );
                }}
                renderInput={params => (
                  <TextField
                    {...params}
                    onChange={ onSetSearchValue }
                    label="Search"
                    margin="none"
                    variant="filled"
                    fullWidth
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: 'new-password',
                    }}
                  />
                )}
              />


            </Grid>

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
