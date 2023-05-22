import React from 'react';
import './SortControl.scss';
import { useSearchParams, useLocation } from 'react-router-dom';

const SortControl = () => {
  const { search } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const location = useLocation();
  const urlSearch = location.search;

  const searchStr = urlSearch.substr(1, urlSearch.length).split('&');
  const objSearchParams = {};

  if (searchStr[0].length > 0) {
    searchStr?.map((param, index) => {
      const paramVal = param.split('=');
      objSearchParams[paramVal[0]] = paramVal[1];
    });
  }

  const sortOption = search !== '' ? searchParams.get('sortBy') : 'release_date';

  const handleSortSelect = (e) => {
    const selectedOption = e.target.value;
    objSearchParams.sortBy = selectedOption;
    setSearchParams(objSearchParams);
  };

  return (
    <div className="sortControlWrapper">
      <span className="sortByLabel">SortBy</span>
      <span className="sortByControl">
        <select className="sortBySelect" onChange={handleSortSelect} value={sortOption}>
          <option className="sortOption" value="release_date">
            Release Date
          </option>
          <option className="sortOption" value="title">
            Title
          </option>
        </select>
      </span>
    </div>
  );
};

export default SortControl;
