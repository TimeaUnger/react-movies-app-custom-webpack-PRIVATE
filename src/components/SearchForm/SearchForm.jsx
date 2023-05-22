import React, { useState } from 'react';
import './SearchForm.scss';
import Button from '../Button/Button';
import { useSearchParams } from 'react-router-dom';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

const SearchForm = (props) => {
  const [searchVal, setSearchVal] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const { genres } = props;

  const location = useLocation();
  const PATH = location.search;

  let navigate = useNavigate();
  const routeChange = () => {
    let path = `/new${PATH}`;
    navigate(path);
  };

  const handleSearch = (event) => {
    if (event.keyCode === 13) {
      setSearchParams({
        search: searchVal,
        searchBy: 'title',
        sortBy: 'release_date',
        activeGenre: 'All',
      });
    }

    if (event.type === 'focus') {
      setSearchVal('');
    }
  };

  const handleBtnClick = () => {
    setSearchParams({
      search: searchVal,
      searchBy: 'title',
      sortBy: 'release_date',
      activeGenre: 'All',
    });
  };

  const inputHandler = (event) => {
    setSearchVal(event.target.value);
  };

  const showDialogMovieForm = () => {
    props.showDialogMovieForm('add', {});
  };

  return (
    <div className="searchWrapper">
      <div className="addMovieWrapper">
        <div className="addMovie" onClick={routeChange}>
          + Add movie
        </div>
      </div>
      <div className="searchInnerContent">
        <div className="findMovieLabel">Find your movie</div>
        <div className="searchInputRow">
          <div className="searchInput">
            <input
              type="search"
              data-testid="searchInput"
              placeholder="Search movie"
              onKeyDown={handleSearch}
              onFocus={handleSearch}
              onChange={inputHandler}
              value={searchVal}
            />
          </div>
          <div className="searchButton">
            <Button type="button" onClick={handleBtnClick}>
              Search
            </Button>
          </div>
        </div>
      </div>
      <Outlet context={[genres]} />
    </div>
  );
};

export default SearchForm;
