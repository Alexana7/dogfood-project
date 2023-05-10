
import cn from 'classnames';
import { Button } from '../button';
import './styles.css';
import s from './styles.module.css';
import { useContext } from 'react';
import { UserContext } from '../../contexts/current-user-context';
import { ThemeContext } from '../../contexts/theme-context';
import { CardsContext } from '../../contexts/card-context';
import { Link } from 'react-router-dom';
import { ReactComponent as FavoriteIcon} from './images/favorites.svg'



export function Header({ children }) {

  const {currentUser, onUpdateUser} = useContext(UserContext);
  const {favorites} = useContext(CardsContext);
  const {toggleTheme} = useContext(ThemeContext);
 
  const handleClickButtonEdit = () => {
    onUpdateUser({name: 'Anna', about: 'Author'})
  }

  return (
    <header className={s.header}>
      <div className={cn('container', s.wrapper)}>
        {children}
        <div className={s.iconsMenu}>
          <Link className={s.favoritesLink} to={ {pathname: '/favorites'}}>
            <FavoriteIcon />
            {favorites.length !==0 && <span className={s.iconBubble}>{favorites.length}</span>}
          </Link>
        </div>


        {/* {<span>{currentUser?.name}: {currentUser?.about}</span>}
        {<span>{currentUser?.email}</span>}
        <Button action={handleClickButtonEdit}>
          Изменить
        </Button>   */}
        {/* <label className="wraper" htmlFor="something">
          <div className="switch-wrap">
            <input type="checkbox" id="something" onChange={toggleTheme} />
            <div className="switch"></div>
          </div>
        </label> */}
      </div>
    </header>
  );
}


