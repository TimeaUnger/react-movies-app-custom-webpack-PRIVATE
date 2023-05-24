import * as React from 'react';
import './MovieDetails.scss';
import defaultImage from '../../assets/image-placeholder.jpg';
import { Link, useLocation, Outlet, useParams } from 'react-router-dom';
import MoviesDataService from '../../services/http.services';
import MovieData from '../../types/moviesData.type'

const MovieDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const PATH = location.search;
  const update = !location.state ? false : location.state.shouldUpdate;

  const [movieData, setMovieData] = React.useState<MovieData>();
  
  React.useEffect(() => {
    MoviesDataService.get(id)
      .then((response: any) => {
        setMovieData(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }, [location, update]);

  const toHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ''}`;
  };

  // const { title, poster_path, vote_average, genres, release_date, runtime, overview } = movieData;

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
              src={movieData?.poster_path}
              alt={movieData?.title}
              onError={({ currentTarget }) => {
                currentTarget.onerror = null;
                currentTarget.src = `${defaultImage}`;
              }}
            />
          </div>
          <div className="movieSummary">
            <div className="movieDetailsHeader">
              <div className="movieDetailsTitle">{movieData?.title}</div>
              <div className="movieDetailsRatingCircle">
                <span className="movieDetailsRating">{movieData?.vote_average}</span>
              </div>
            </div>
            <div className="movieDetailsGenre">{movieData?.genres ? movieData?.genres.join(', ') : ''}</div>
            <div className="movieDateRuntimeWrapper">
              <div className="movieDetailsReleaseDate">{movieData?.release_date?.substr(0, 4)}</div>
              <div className="movieDetailsRunTime">{toHoursAndMinutes(movieData?.runtime)}</div>
            </div>
            <div className="movieDetailsOverview">{movieData?.overview}</div>
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
};
export default MovieDetails;
