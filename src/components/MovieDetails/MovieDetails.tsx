import * as React from 'react';
import './MovieDetails.scss';
import defaultImage from '../../assets/image-placeholder.jpg';
import { Link, useLocation, Outlet, useParams } from 'react-router-dom';
import useFetch from '../../customHooks/useFetch';

const MovieDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const PATH = location.search;

  const update = !location.state ? false : location.state.shouldUpdate;

  const url = `http://localhost:4000/movies/${id}`;
  const [data] = useFetch(url, update);
  const movieData = data;

  const toHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ''}`;
  };

  const { title, poster_path, vote_average, genres, release_date, runtime, overview } = movieData || {};

  return (
    <div className="movieDetailsContainer">
      <div className="movieDetailTopHeader">
        <div className="movieService">netflixroulette</div>
        <Link to={`/${PATH}`}>
          <div className="movieSearch"></div>
        </Link>
      </div>
      <div className="moviesDetails">
        <div className="movieDetailsInner">
          <div className="movieImage">
            <img
              src={poster_path}
              alt={title}
              onError={({ currentTarget }) => {
                currentTarget.onerror = null;
                currentTarget.src = `${defaultImage}`;
              }}
            />
          </div>
          <div className="movieSummary">
            <div className="movieDetailsHeader">
              <div className="movieDetailsTitle">{title}</div>
              <div className="movieDetailsRatingCircle">
                <span className="movieDetailsRating">{vote_average}</span>
              </div>
            </div>
            <div className="movieDetailsGenre">{genres ? genres.join(', ') : ''}</div>
            <div className="movieDateRuntimeWrapper">
              <div className="movieDetailsReleaseDate">{release_date?.substr(0, 4)}</div>
              <div className="movieDetailsRunTime">{toHoursAndMinutes(runtime)}</div>
            </div>
            <div className="movieDetailsOverview">{overview}</div>
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
};
export default MovieDetails;
