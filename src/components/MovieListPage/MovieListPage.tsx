import * as React from 'react';
import GenreSelect from '../GenreSelect/GenreSelect';
import SortControl from '../SortControl/SortControl';
import MovieTiles from '../MovieTiles/MovieTiles';
import { Outlet } from 'react-router-dom';

type Props = {
  genres: string[];
}

const MovieListPage = (props: Props) => {

  const { genres } = props;
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
        <MovieTiles />
      </div>
    </div>
  );
};

export default MovieListPage;
