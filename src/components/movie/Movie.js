import React, {useState/* , useEffect */} from 'react';
import PropTypes from 'prop-types';
import HeadSection from '../shared/HeadSection';
import {useQuery} from 'react-query';
import TheHeader from '../shared/TheHeader';
import {ReactQueryDevtools} from 'react-query/devtools';
import {
  Grid,
} from '@material-ui/core';
import SVG from 'react-inlinesvg';

//import {getPopularMovies} from '../../helpers/my-api';

const Movie = ({
  selectMovie,
}) => {

  // useEffect(() => {
  //   selectMovie();
  // }, [selectMovie]);
  /* const [ queryPage, setQueryPage ] = useState('1');

  const {isLoading, error, data, isFetching} = useQuery( ['popularMovieData', queryPage], () => getPopularMovies(queryPage), {keepPreviousData : true} ); */

  /* if (isLoading) return 'Loading...';

  if (error) return `An error has occurred: ${ error.message }`;

  console.log('data = ',data); */

  return (
    <>
      <TheHeader/>
      <HeadSection
        title="MOVIE TITLE HERE"
        /* backdropPath={  } */
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

Movie.propTypes = {
  selectMovie: PropTypes.func
};

export default Movie;
