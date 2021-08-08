import React, {useState} from 'react';
import HeadSection from '../shared/HeadSection';
import TheHeader from '../shared/TheHeader';
import initLocalStorage from '../shared/initLocalStorage';
import PaginatedList from '../shared/PaginatedList';
import {useQuery} from 'react-query';
/* import {ReactQueryDevtools} from 'react-query/devtools'; */
import {
  Grid,
  Typography,
  LinearProgress
} from '@material-ui/core';

import {getPopularMovies} from '../../helpers/my-api';

//local storage init for favorite hearts
const localStorageArr = initLocalStorage();

// eslint-disable-next-line no-empty-pattern
const Home = ({

}) => {

  const [ queryPage, setQueryPage ] = useState(1);
  const [ headBackdropPath, setHeadBackdropPath ] = useState(null);

  const {isLoading, error, data, isSuccess} = useQuery( ['popularMovieData', queryPage], () => getPopularMovies(queryPage), {keepPreviousData : true, refetchOnWindowFocus: false} );

  if (error) return `An error has occurred: ${ error.message }`;

  const handlePageChange = (event, value) => {
    setQueryPage(value);
  };

  const getRandomBackdropPath = (results) => {
    const RandomMovie = results[Math.floor(Math.random()*results.length)];
    setHeadBackdropPath(RandomMovie.backdrop_path);
  };

  if (isSuccess && !headBackdropPath ) getRandomBackdropPath(data.results);

  return (
    <>
      <TheHeader/>
      <HeadSection
        title="Popular Movies"
        backdropPath={ headBackdropPath }
      />
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
      {/* <ReactQueryDevtools /> */}
    </>
  );
};

export default Home;
