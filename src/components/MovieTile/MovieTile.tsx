import * as React from 'react';
import './MovieTile.scss';
import defaultImage from '../../assets/image-placeholder.jpg';
import { useState } from 'react';
import '../MenuHamburger/MenuHamburger';
import { useLocation, useNavigate } from 'react-router-dom';

type Props = {
  movieDetails: {
    id: number;
    title: string,
    poster_path: string,
    vote_average: string,
    genres: Array<any>,
    release_date: string,
    runtime: string,
    overview: string
  };
}

const MovieTile = (props: Props) => {

  const [imgError, setImgError] = React.useState(false);

  const location = useLocation();
  const PATH = location.search;
  let navigate = useNavigate();

  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState('');
  const { id, title, poster_path, genres, release_date } = props.movieDetails;

  const handleMenuButton = () => {
    if (!isVisible) {
      setIsVisible(true);
      setIsOpen('open');
    } else {
      setIsVisible(false);
      setIsOpen('');
    }
  };

  const handleAction = (action) => {
    let path = `/${id}/${action}${PATH}`;
    navigate(path);
    handleMenuButton();
  };

  const handleClick = () => {
    const path = `/${id}${PATH}`;
    navigate(path);
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  return (
    <div className="movieTileWrapper" data-id={id}>
      <div className="editDeleteBlock">
        {isVisible && (
          <div className="editDeleteRowsWrapper">
            <div className="editMovieRow" id="editMovie" onClick={() => handleAction('edit')}>
              Edit
            </div>
            <div className="deleteMovieRow" id="deleteMovie" onClick={() => handleAction('delete')}>
              Delete
            </div>
          </div>
        )}
        <div className="editDeleteMenuWrapper">
          <div className="top-nav" id="navButton" onClick={handleMenuButton}>
            <div className={`menu-toggle ${isOpen}`} id="menu-toggle"></div>
            <div className="menu-button-container">
              <div className="menu-button"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="movieTile">
        <div className="movieImage" onClick={handleClick}>
          {
            !imgError ?
              <img
                src={poster_path}
                onError={() => setImgError(true)}
              />
              :
              <img src={defaultImage}/>
          }

        </div>
        <div className="movieTileDetails">
          <div className="movieTitleWrapper">
            <div className="movieTitle">{title}</div>
            <div className="releaseDate">{release_date?.substr(0, 4)}</div>
          </div>
        </div>
        <div className="movieGenre">{genres ? genres.join(', ') : ''}</div>
      </div>
    </div>
  );
};

export default MovieTile;
