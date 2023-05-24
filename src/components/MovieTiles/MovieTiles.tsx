import * as React from 'react';
import './MovieTiles.scss';
import MovieTile from '../MovieTile/MovieTile';
import { useSearchParams, useLocation } from 'react-router-dom';
import MoviesDataService from '../../services/http.services';
import MoviesData from '../../types/moviesData.type'


const MovieTiles = () => {

  const location = useLocation();
  const urlSearch = location.search;
  const searchStr = urlSearch.substr(1, urlSearch.length).split('&');

  const objSearchParams : {sortBy?: string} = {}

  // existing search params
  if (searchStr[0].length > 0) {
    searchStr?.forEach((param) => {
      const paramVal = param.split('=');
      objSearchParams[paramVal[0]] = paramVal[1];
    });
  }
  // initial load /
  else {
    objSearchParams.sortBy = 'release_date';
  }

  const [searchParams] = useSearchParams(objSearchParams);
  const update = !location.state ? false : location.state.shouldUpdate;
  const moviesUrl = `?${searchParams}&sortOrder=asc&limit=10`;
  const [moviesData, setMoviesData] = React.useState<MoviesData>();

  React.useEffect(() => {
    MoviesDataService.getAll(moviesUrl)
    .then((response: any) => {
      setMoviesData(response.data);
    })
    .catch((e: Error) => {
      console.log(e);
    });
  }, [moviesUrl, update]);

  return (
    <>
      <div className="foundMoviesWrapper">
        <div className="foundMovies">
          <span className="foundMoviesNr"></span>
          <span className="foundMoviesTitle">{moviesData?.totalAmount} movies found</span>
        </div>
      </div>
      <div className="movieListContentWrapper">
        <div className="movieTilesWrapper">

          {moviesData?.data.map((movie) => {
            return <MovieTile movieDetails={movie} key={movie.id} />;
          })}
        </div>
      </div>
    </>

  );
};

export default MovieTiles;
