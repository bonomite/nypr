import React from 'react';
import PropTypes from 'prop-types';
import {
  withStyles,
  Grid,
} from '@material-ui/core';
import {Pagination} from '@material-ui/lab';
import MovieCard from './MovieCard';

const styles = theme => ({

});

const PaginatedList = ({
  data,
  queryPage,
  handlePageChange,
  localStorageArr,
}) => {

  return (
    <>
      <Grid container justifyContent="center" style={{margin: '24px 0'}}>
        <Pagination
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
          count={data?.total_pages}
          page={queryPage}
          onChange={handlePageChange}
        />
      </Grid>
    </>

  );
};

PaginatedList.defaultProps = {
  data: null,
  queryPage: 1,
  localStorageArr:[],
};

PaginatedList.propTypes = {
  data: PropTypes.object,
  queryPage: PropTypes.number,
  handlePageChange: PropTypes.func,
  localStorageArr: PropTypes.array,

};

export default (withStyles(styles, {withTheme: true})(PaginatedList));
