import * as React from 'react';
import Select from 'react-select';
import Button from '../Button/Button';
import './AddMovieForm.scss';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { ErrorMessage } from '@hookform/error-message';
import { objGenresFormSelect } from '../../shared/objGenresFormSelect';
import MoviesDataService from '../../services/http.services';
import MovieData from '../../types/moviesData.type'

const EditMovieForm = () => {

  const { id } = useParams();
  const location = useLocation();
  const PATH = location.search;
  const [movieData, setMovieData] = React.useState<MovieData>();
  
  React.useEffect(() => {

    MoviesDataService.get(id)
      .then((response: any) => {
        setMovieData(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }, [location]);


  const urlSearch = location.search;
  const searchStr = urlSearch.substr(1, urlSearch.length).split('&');
  const objSearchParams = {};

  if (searchStr[0].length > 0) {
    searchStr?.forEach((param) => {
      const paramVal = param.split('=');
      objSearchParams[paramVal[0]] = paramVal[1];
    });
  }

  const navigate = useNavigate();
  const routeChange = () => {
    const path = `/${id}${PATH}`;
    navigate(path);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm();

  React.useEffect(() => {
    const objGenresDefault = [];
    // set existing genres if any into correct object format for multi-select options
    movieData?.genres.forEach((genre) => {
      objGenresDefault.push({ value: `${genre}`, label: `${genre}` });
    });

    // set existing values from data for validation on first load
    setValue('genres', objGenresDefault);
    setValue('title', movieData?.title);
    setValue('release_date', movieData?.release_date);
    setValue('vote_average', movieData?.vote_average);
    setValue('overview', movieData?.overview);
    setValue('runtime', movieData?.runtime);
    setValue('poster_path', movieData?.poster_path);
  }, [movieData, setValue]);

  const onSubmit = (data: MovieData) => {

    data.id = Number(id);
    data.vote_average = Number(data.vote_average);
    data.runtime = Number(data.runtime);

    // convert received object to array
    const arrGenres = [];
    data?.genres.forEach((genre) => {
      arrGenres.push(genre.label);
    });

    data.genres = arrGenres;

    MoviesDataService.update(data)
      .then((response: any) => {
        const path = `/${response.data.id}${PATH}`;

        navigate(path, {
          state: { shouldUpdate: true },
        });
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const resetForm = () => { };

  return (
    <div className="dialog-container" id="dialogContainer">
      <div className="closeButton" onClick={routeChange}>
        X
      </div>

      <div className="movieFormWrapper">
        <div className="movieFormBoxTitle">Edit movie</div>
        <div className="movieForm">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="movieFormContent">
              <div className="inputRow">
                <div className="movieTitle">
                  <label htmlFor="movieTitle" className="movieFormLabel">
                    Title
                  </label>
                  <input
                    type="text"
                    defaultValue={movieData?.title}
                    className="movieTitleInput"
                    id="movieTitle"
                    {...register('title', {
                      required: 'This field is required.',
                    })}
                  />
                  <ErrorMessage
                    errors={errors}
                    name="title"
                    render={({ message }) => <span className="formValidationError">*{message}</span>}
                  />
                </div>
                <div className="movieReleaseDate">
                  <label htmlFor="movieReleaseDate" className="movieFormLabel">
                    Release date
                  </label>
                  <input
                    type="date"
                    defaultValue={movieData?.release_date}
                    className="movieTitleInput"
                    id="movieReleaseDate"
                    {...register('release_date', {
                      required: 'This field is required.',
                    })}
                  />
                  <ErrorMessage
                    errors={errors}
                    name="release_date"
                    render={({ message }) => <span className="formValidationError">*{message}</span>}
                  />
                </div>
              </div>
              <div className="inputRow">
                <div className="movieUrl">
                  <label htmlFor="movieUrl" className="movieFormLabel">
                    Movie url
                  </label>
                  <input
                    type="text"
                    id="movieUrl"
                    defaultValue={movieData?.poster_path}
                    {...register('poster_path', {
                      required: 'This field is required.',
                    })}
                  />
                  <ErrorMessage
                    errors={errors}
                    name="poster_path"
                    render={({ message }) => <span className="formValidationError">*{message}</span>}
                  />
                </div>
                <div className="movieRating">
                  <label htmlFor="movieRating" className="movieFormLabel">
                    Rating
                  </label>
                  <input
                    type="text"
                    name="vote_average"
                    id="movieRating"
                    defaultValue={movieData?.vote_average}
                    {...register('vote_average', {
                      required: 'This field is required.',
                    })}
                  />
                  <ErrorMessage
                    errors={errors}
                    name="vote_average"
                    render={({ message }) => <span className="formValidationError">*{message}</span>}
                  />
                </div>
              </div>
              <div className="inputRow">
                <div className="movieGenreSelect">
                  <label htmlFor="movieGenre" className="movieFormLabel">
                    Genre
                  </label>
                  <Controller
                    name="genres"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...register('genres', {
                          required: 'This field is required.',
                        })}
                        {...field}
                        placeholder="Select genres"
                        options={objGenresFormSelect}
                        isMulti={true}
                        getOptionLabel={(option) => `${option.label}`}
                      />
                    )}
                  />

                  <ErrorMessage
                    errors={errors}
                    name="genres"
                    render={({ message }) => <span className="formValidationError">*{message}</span>}
                  />
                </div>
                <div className="movieRuntime">
                  <label htmlFor="movieRuntime" className="movieFormLabel">
                    Runtime
                  </label>
                  <input
                    type="text"
                    id="movieRuntime"
                    defaultValue={movieData?.runtime}
                    {...register('runtime', {
                      required: 'This field is required.',
                    })}
                  />
                  <ErrorMessage
                    errors={errors}
                    name="runtime"
                    render={({ message }) => <span className="formValidationError">*{message}</span>}
                  />
                </div>
              </div>
              <div className="inputRow textarea">
                <label htmlFor="movieOverview" className="movieFormLabel">
                  Overview
                </label>
                <textarea
                  id="movieOverview"
                  defaultValue={movieData?.overview}
                  {...register('overview', {
                    required: 'This field is required.',
                  })}
                ></textarea>
                <ErrorMessage
                  errors={errors}
                  name="overview"
                  render={({ message }) => <span className="formValidationError">*{message}</span>}
                />
              </div>
              <div className="formButtonsWrapper">
                <Button type="button" label="Reset" className="movieFormResetBtn" onClick={resetForm} />
                <Button type="submit" label="Submit" className="movieFormSubmitBtn" />
              </div>
            </div>

            {errors.exampleRequired && <span>This field is required</span>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditMovieForm;
