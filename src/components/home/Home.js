import React, {Fragment, useState, useCallback, useEffect} from 'react';
import PropTypes from 'prop-types';
import HeadSection from '../shared/HeadSection';
import TheHeader from '../shared/TheHeader';
import MovieCard from '../shared/MovieCard';
import {useQuery} from 'react-query';
import {ReactQueryDevtools} from 'react-query/devtools';
import {
  Grid,
  Typography,
} from '@material-ui/core';
import SVG from 'react-inlinesvg';

import {getPopularMovies} from '../../helpers/my-api';

const Home = ({
  selectHome,
}) => {

  // useEffect(() => {
  //   selectHome();
  // }, [selectHome]);
  const [ queryPage, setQueryPage ] = useState('1');
  const [ headBackdropPath, setHeadBackdropPath ] = useState(null);

  const {isLoading, error, data, isFetching, isSuccess} = useQuery( ['popularMovieData', queryPage], () => getPopularMovies(queryPage), {keepPreviousData : true} );

  //if (isLoading) return 'Loading...';

  if (error) return `An error has occurred: ${ error.message }`;

  const getRandomBackdropPath = (results) => {
    const RandomMovie = results[Math.floor(Math.random()*results.length)];
    setHeadBackdropPath(RandomMovie.backdrop_path);
  };

  console.log('data = ',data);

  if (isSuccess && !headBackdropPath ) getRandomBackdropPath(data.results);

  return (
    <Fragment>
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
              <Grid
                item
              >
              ...loading
              </Grid>
              :

              data.results.map((movie) => (

                <Grid
                  item
                  key={ movie.id }
                  xs='auto'
                >
                  <MovieCard
                    data={movie}
                  />
                </Grid>
              ))


        }


      </Grid>
      <ReactQueryDevtools />
    </Fragment>
  );
};

Home.propTypes = {
  selectHome: PropTypes.func
};

export default Home;
