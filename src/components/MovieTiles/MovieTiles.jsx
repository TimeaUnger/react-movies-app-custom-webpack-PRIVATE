import React from 'react';
import './MovieTiles.scss';
import MovieTile from '../MovieTile/MovieTile';
import { useSearchParams, useLocation } from 'react-router-dom';
import useFetch from '../../customHooks/useFetch';

const MovieTiles = () => {
  const location = useLocation();
  const urlSearch = location.search;
  const searchStr = urlSearch.substr(1, urlSearch.length).split('&');

  const objSearchParams = {};

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

  const moviesUrl = `http://localhost:4000/movies?${searchParams}&sortOrder=asc&limit=10`;

  const [data] = useFetch(moviesUrl, update);
  const movieData = data?.data;

  return (
    <>
      <div className="foundMoviesWrapper">
        <div className="foundMovies">
          <span className="foundMoviesNr">{data?.totalAmount}</span>
          <span className="foundMoviesTitle">movies found</span>
        </div>
      </div>
      <div className="movieListContentWrapper">
        <div className="movieTilesWrapper">
          {movieData?.map((movie) => {
            return <MovieTile movieDetails={movie} key={movie.id} />;
          })}
        </div>
      </div>
    </>
  );
};

export default MovieTiles;
