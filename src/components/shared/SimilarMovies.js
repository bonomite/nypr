import React, {useState} from 'react';
import initLocalStorage from '../shared/initLocalStorage';
import PaginatedList from '../shared/PaginatedList';
import {useQuery} from 'react-query';

import {
  Grid,
  Typography,
  LinearProgress
} from '@material-ui/core';

import {getSimilarMovies} from '../../helpers/my-api';

//local storage init for favorite hearts
const localStorageArr = initLocalStorage();

// eslint-disable-next-line no-empty-pattern
const SimilarMovies = ({
  id,
}) => {

  const [ queryPage, setQueryPage ] = useState(1);

  // eslint-disable-next-line no-unused-vars
  const {isLoading, error, data, isSuccess} = useQuery( ['similarMoviesData', queryPage], () => getSimilarMovies(queryPage,id), {keepPreviousData : true, refetchOnWindowFocus: false} );

  if (error) return `An error has occurred: ${ error.message }`;

  const handlePageChange = (event, value) => {
    setQueryPage(value);
  };

  return (
    <>
      <Typography variant="h5">Similar Movies:</Typography>
      <Grid container
        direction="row"
        justifyContent="center"
        alignItems="flex-start"
        className={ 'container-fluid' }
        spacing={3}
      >
        {
          error
            ?
            <Typography>An error has occurred: { error.message }</Typography>
            :
            isLoading
              ?
              <Grid item>
                <Typography>LOADING MOVIES</Typography>
                <LinearProgress style={{width: '100%'}} />
              </Grid>
              :
              <PaginatedList
                data={data}
                queryPage={queryPage}
                handlePageChange={handlePageChange}
                localStorageArr={localStorageArr}
              />
        }
      </Grid>
    </>
  );
};

export default SimilarMovies;
