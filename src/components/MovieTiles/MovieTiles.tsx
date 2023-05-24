import * as React from 'react';
import './MovieTiles.scss';
import MovieTile from '../MovieTile/MovieTile';
import useFetch, { MovieDetails } from '../../customHooks/useFetch';
import { useIsMounted } from '../../customHooks/useIsMount';
import { useSearchParams, useLocation } from 'react-router-dom';


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

  const moviesUrl = `http://localhost:4000/movies?${searchParams}&sortOrder=asc&limit=10`;

  const [data] = useFetch({url: moviesUrl, shouldUpdate: update, single: false});

// console.log(data)
  return (
    <>
      <div className="foundMoviesWrapper">
        <div className="foundMovies">
          <span className="foundMoviesNr"></span>
          <span className="foundMoviesTitle">movies found</span>
        </div>
      </div>
      <div className="movieListContentWrapper">
        <div className="movieTilesWrapper">

          {data?.map((movie) => {

            // console.log(movie)

            return <MovieTile movieDetails={movie} key={movie.id} />;
          })}
        </div>
      </div>
    </>

  );
};

export default MovieTiles;
