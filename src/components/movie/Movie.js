import React, {useEffect} from 'react';
import HeadSectionMovie from '../shared/HeadSectionMovie';
import {useQuery} from 'react-query';
import TheHeader from '../shared/TheHeader';
import {ReactQueryDevtools} from 'react-query/devtools';
import {
  Grid,
  LinearProgress
} from '@material-ui/core';
import initLocalStorage from '../shared/initLocalStorage';
import {getMovie} from '../../helpers/my-api';

let id = '';

//local storage init for favorite hearts
const localStorageArr = initLocalStorage();

// eslint-disable-next-line no-empty-pattern
const Movie = ({

}) => {

  useEffect(() => {
    var url_string = window.location.href;
    var url = new URL(url_string);
    id = url.searchParams.get("id");
    window.onbeforeunload = function () {
      window.scrollTo(0, 0);
    };
  }, []);

  const {isLoading, error, data} = useQuery( ['popularMovieData', id], () => getMovie(id), {keepPreviousData : true, refetchOnWindowFocus: false} );

  if (isLoading) return <LinearProgress style={{width: '100%'}} />;

  if (error) return `An error has occurred: ${ error.message }`;

  return (
    <>
      <TheHeader/>
      <HeadSectionMovie
        movieData={data}
        localStorageArr={localStorageArr}
      />

      <Grid container
        direction="column"
        justifyContent="center"
        alignItems="center"
        className={ 'container-fluid' }
      >
        <Grid item>

        </Grid>

      </Grid>
      <ReactQueryDevtools />
    </>
  );
};

export default Movie;
