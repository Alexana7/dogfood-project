
import './styles.css';
import { ReactComponent as CloseIcon } from './assets/ic-close-input.svg';
import { ReactComponent as SearchIcon } from './assets/ic-search.svg';
import {} from './assets/ic-search.svg';

export function Search() {
  return (
    <form className='search' action="">
      <input type="text" className="search__input" placeholder='Поиск' />
      <button className="search__btn">
        <CloseIcon />
        <SearchIcon />
      </button>
      
    </form>
  );
}


