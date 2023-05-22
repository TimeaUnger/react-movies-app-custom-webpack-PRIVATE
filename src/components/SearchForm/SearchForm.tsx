import * as React from 'react';
import './SearchForm.scss';
import Button from '../Button/Button';
import { useSearchParams } from 'react-router-dom';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

type Props = {
  genres: string[];
}

const SearchForm =  (props: Props) => {
  const [searchVal, setSearchVal] = React.useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const { genres } = props;

  const location = useLocation();
  const PATH = location.search;

  let navigate = useNavigate();
  const routeChange = () => {
    let path = `/new${PATH}`;
    navigate(path);
  };

  const handleEnter = (event: { keyCode: number; type: string; }) => {
    if (event.keyCode === 13) {
      setSearchParams({
        search: searchVal,
        searchBy: 'title',
        sortBy: 'release_date',
        activeGenre: 'All',
      });
    }
  };

  const handleFocus = () => {
    setSearchVal('');
  }

  const handleBtnClick = () => {
    setSearchParams({
      search: searchVal,
      searchBy: 'title',
      sortBy: 'release_date',
      activeGenre: 'All',
    });
  };

  const inputHandler = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setSearchVal(event.target.value);
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
              onKeyDown={handleEnter}
              onFocus={handleFocus}
              onChange={inputHandler}
              value={searchVal}
            />
          </div>
          <div className="searchButton">
            <Button onClick={handleBtnClick} label="Search" type="button" />
          </div>
        </div>
      </div>
      <Outlet context={[genres]} />
    </div>
  );
};

export default SearchForm;
