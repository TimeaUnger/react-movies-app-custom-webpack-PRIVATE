import * as React from 'react';
import Button from '../Button/Button';
import './DeleteMovieForm.scss';
import { useForm } from 'react-hook-form';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import MoviesDataService from '../../services/http.services';

const DeleteMovieForm = () => {

  const location = useLocation();
  let navigate = useNavigate();
  const PATH = location.search;
  const routeChange = () => {
    const path = `/${id}${PATH}`;
    navigate(path);
  };

  const { id } = useParams();

  const {
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = () => {

    const movieID = Number(id);

    MoviesDataService.delete(movieID)
      .then(() => {
        const path = `/${PATH}`;
        navigate(path, {
          state: { shouldUpdate: true },
        });
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="dialog-container" id="dialogContainer">
        <div className="closeButton" onClick={routeChange}>
          X
        </div>
        <div className="movieFormWrapper">
          <div className="movieFormBoxTitle">Delete movie</div>
          <div className="deleteMovieContent">
            <div className="deleteMovieBody">Are you sure you want to delete this movie?</div>
            <div className="deleteMovieFooter">
              <Button type="submit" label="Confirm" className="movieFormSubmitBtn" />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default DeleteMovieForm;
