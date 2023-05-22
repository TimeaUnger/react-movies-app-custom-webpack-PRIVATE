import React from "react";
import './App.scss';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom';

// import Dialog from './components/Dialog/Dialog';
// import MovieForm from './components/MovieForm/MovieForm';
import MovieListPage from './components/MovieListPage/MovieListPage';
import MovieDetails from "./components/MovieDetails/MovieDetails";
import SearchForm from "./components/SearchForm/SearchForm";
import AddMovieForm from "./components/MovieForm/AddMovieForm";
import EditMovieForm from "./components/MovieForm/EditMovieForm";
import DeleteMovieForm from "./components/MovieForm/DeleteMovieForm";

function App() {

  // const [modalOpen, setModalVisibility] = useState(false);
  // const [formAction, setFormAction] = useState(false);
  // const [formData, setFormData] = useState(false);
  // const [movieDetailsOnSubimt, setMovieDetailsOnSubmit] = useState({});

  const genres = [
    "All",
    "Drama",
    "Romance",
    "Animation",
    "Adventure",
    "Family",
    "Comedy",
    "Fantasy",
    "Science Fiction",
    "Action"
  ];

  // const handleCloseModal = () => {
  //   setModalVisibility(false);
  //   setFormAction(false);
  // }

  // const handleSubmit = (formData, action) => {
  //   // console.log(formData)
  //   setMovieDetailsOnSubmit(formData);
  // }

  // const showDialogMovieForm = (action, movie) => {
  //   setModalVisibility(true);
  //   setFormAction(action);
  //   setFormData(movie);
  // }

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MovieListPage genres={genres} />}>
        <Route
          path="/"
          element={
            <SearchForm genres={genres} />
          }
        >
          <Route path="/new" element={<AddMovieForm />} />
        </Route>
        <Route path="/:id" element={<MovieDetails genresAll={genres} />} >
          <Route path="/:id/edit" element={<EditMovieForm />} />
          <Route path="/:id/delete" element={<DeleteMovieForm />} />
        </Route>
      </Route>
    )
  );

  return (
    <div className="App">

      {/* <Dialog handleCloseModal={handleCloseModal} modalOpen={modalOpen} >
        {formAction &&
          <MovieForm
            genres={genres}
            handleSubmit={handleSubmit}
            formData={formData}
            handleCloseModal={handleCloseModal}
            formAction={formAction}
          />
        }
      </Dialog> */}
      <RouterProvider router={router} />
    </div>
  );
}

export default App;