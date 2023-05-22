import React from 'react';
import GenreSelect from '../GenreSelect/GenreSelect';
import SortControl from '../SortControl/SortControl';
import MovieTiles from '../MovieTiles/MovieTiles';
import { Outlet } from 'react-router-dom';

const MovieListPage = (props) => {
  const { genres, sortSelected } = props;
  return (
    <div className="MovieListPage">
      <div className="pageHeader">
        <Outlet />
      </div>

      <div className="pageBody">
        <div className="selectSection">
          <GenreSelect genres={genres} />
          <SortControl />
        </div>
        <MovieTiles sortSelected={sortSelected} />
      </div>
    </div>
  );
};

export default MovieListPage;
