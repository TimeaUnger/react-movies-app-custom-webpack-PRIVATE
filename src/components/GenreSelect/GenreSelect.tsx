import * as React from 'react'
import './GenreSelect.scss';
import { useSearchParams, useLocation } from 'react-router-dom';

type Props = {
  genres: string[];
}

const GenreSelect = (props: Props) => {

  const { search } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeGenre = searchParams.get('activeGenre') || 'All';
  const sortBy = search !== '' ? searchParams.get('sortBy') : 'release_date';


  
  const onSelectHandler = (event: React.MouseEvent<Element, MouseEvent>) => {
    
    // the original text is uppercase
    // need to convert it to capitalized
    const genreText = event.currentTarget.innerHTML.toLowerCase();
    const selectedGenre = genreText[0].toUpperCase() + genreText.slice(1);
    const filterBy = selectedGenre === 'All' ? '' : selectedGenre;

    setSearchParams({
      filter: filterBy,
      sortBy: sortBy,
      activeGenre: selectedGenre,
    });
  };

  return (
    <div className="genreSelect">
      <ul data-testid="GenreListItem" aria-label="genresAll">
        {props.genres.map((genre, index) => {
          return (
            <li key={index} onClick={onSelectHandler} className={`genreItem ${activeGenre === genre && 'active'}`}>
              {genre}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default GenreSelect;
