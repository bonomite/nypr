import React, {useState} from 'react';
import PropTypes from 'prop-types';
import HeadSection from '../shared/HeadSection';
import TheHeader from '../shared/TheHeader';
import MovieCard from '../shared/MovieCard';
import {useQuery} from 'react-query';
import {ReactQueryDevtools} from 'react-query/devtools';
import {Pagination} from '@material-ui/lab';
import {
  Grid,
  Typography,
  LinearProgress
} from '@material-ui/core';

import {getPopularMovies} from '../../helpers/my-api';

//local storage init for favorite hearts
const allFavoriteMoviesArr = localStorage.getItem("allFavoriteMoviesArr");
const localStorageArr = (allFavoriteMoviesArr && allFavoriteMoviesArr.length) ? JSON.parse(allFavoriteMoviesArr) : [];

const Home = ({
  selectHome,
}) => {

  // useEffect(() => {
  //   selectHome();
  // }, [selectHome]);

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
              <>
                <Grid container justifyContent="center" style={{marginBottom: 24}}>
                  <Pagination
                    className="pagination"
                    count={data?.total_pages}
                    page={queryPage}
                    onChange={handlePageChange}
                  />
                </Grid>
                {
                  data.results.map((movie) => (
                    <Grid
                      item
                      key={ movie.id }
                      xs='auto'
                    >
                      <MovieCard
                        data={movie}
                        localStorageArr={ localStorageArr }
                      />
                    </Grid>
                  ))
                }
                <Grid container justifyContent="center" style={{marginBottom: 24}}>
                  <Pagination
                    className="pagination"
                    count={data?.total_pages}
                    page={queryPage}
                    onChange={handlePageChange}
                  />
                </Grid>
              </>
        }


      </Grid>
      <ReactQueryDevtools />
    </>
  );
};

Home.propTypes = {
  selectHome: PropTypes.func
};

export default Home;
