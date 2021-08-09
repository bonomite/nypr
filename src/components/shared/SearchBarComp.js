import React, {useState} from 'react';
import {
  Grid,
  withStyles,
  withWidth,
  Typography,
  TextField,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {useHistory} from 'react-router-dom';
import {useQuery} from 'react-query';

import {getSearch} from '../../helpers/my-api';


const styles = theme => ({
  searchField: {
    '& .MuiInputBase-root':{
      background: theme.palette.common.white,
    },
    '& label.MuiInputLabel-shrink':{
      color:theme.palette.common.darkBlack,
    },
  },
  searchItems:{
    '& img':{
      width:'100%',
      maxWidth:70,
    },
  }
});


const SearchBarComp = ({
  classes,
}) => {

  const history = useHistory();

  const [ searchValue , setSearchValue ] = useState('');

  const {/* isLoading, */ error, data} = useQuery( ['movieData', searchValue], () => getSearch(searchValue), {refetchOnWindowFocus: false} );

  const onSetSearchValue = (e) => {
    setSearchValue(e.target.value);
  };

  const selectMovie = (id) => {
    history.push(`/movie?id=${id}`);
    if(history.location.pathname === '/movie'){
      history.go(0);
    }
  };

  if (error) return `An error has occurred: ${ error.message }`;

  return (

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
                {/* TODO : provide fallback image if BD does not have an image */}
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
          inputProps={{
            ...params.inputProps,
            autoComplete: 'search',
          }}
        />
      )}
    />

  );
};

export default withWidth()(withStyles(styles, {withTheme: true})(SearchBarComp));
