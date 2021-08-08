import React, {useEffect} from 'react';
import HeadSectionMovie from '../shared/HeadSectionMovie';
import {useQuery} from 'react-query';
import TheHeader from '../shared/TheHeader';
import {
  Grid,
  LinearProgress,
  Box,
} from '@material-ui/core';
import initLocalStorage from '../shared/initLocalStorage';
import {getMovie} from '../../helpers/my-api';
import PlayVideos from '../shared/PlayVideos';
import SimilarMovies from '../shared/SimilarMovies';

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
  }, []);

  const {isLoading, error, data} = useQuery( ['movieData', id], () => getMovie(id), {keepPreviousData : true, refetchOnWindowFocus: false} );

  if (isLoading) return <LinearProgress style={{width: '100%'}} />;

  if (error) return `An error has occurred: ${ error.message }`;

  return (
    <>
      <TheHeader/>
      <HeadSectionMovie
        movieData={data}
        localStorageArr={localStorageArr}
      />

      <div className={`container-fluid`}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <PlayVideos id={data.id}/>
          </Grid>
        </Grid>
      </div>
      <Box mt={5}></Box>
      <div className={`container-fluid`}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <SimilarMovies id={ data.id }/>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Movie;
