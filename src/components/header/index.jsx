
import cn from 'classnames';
import { Button } from '../button';
import './styles.css';
import s from './styles.module.css';
import { useContext } from 'react';
import { UserContext } from '../../contexts/current-user-context';
import { ThemeContext } from '../../contexts/theme-context';
import { CardsContext } from '../../contexts/card-context';
import { Link, useLocation } from 'react-router-dom';
import { ReactComponent as FavoriteIcon} from './images/favorites.svg'
import { ReactComponent as CartIcon} from './images/cart.svg'
import { ReactComponent as LogoutIcon} from './images/logout.svg'
import { ReactComponent as ProfileIcon} from './images/profile.svg'
import { ReactComponent as UserIcon} from './images/user.svg'
import { useSelector } from 'react-redux';



export function Header({ children }) {

  const currentUser = useSelector(state => state.user.data);
  const favorites = useSelector(state => state.products.favoriteProducts);
  const {toggleTheme} = useContext(ThemeContext);
  const location = useLocation();
 
  const handleClickButtonEdit = () => {
    // onUpdateUser({name: 'Anna', about: 'Author'})
  }

  return (
    <header className={s.header}>
      <div className={cn('container', s.wrapper)}>
        {children}
        <div className={s.iconsMenu}>
          <Link className={s.favoritesLink} to={{pathname: '/favorites'}}>
            <FavoriteIcon />
            {favorites.length !== 0 && <span className={s.iconBubble}>{favorites.length}</span>}
          </Link>

          <Link className={s.favoritesLink} to={{pathname: '/cart'}}>
            <CartIcon />
            {favorites.length !== 0 && <span className={s.iconBubble}>{favorites.length}</span>}
          </Link>

          <Link to='/login' className={s.iconsMenuItem} replace state={{backgroundLocation: location, initialPath: location.pathname}}>
            <UserIcon />
            Войти
          </Link>

          <Link to='/profile' className={s.iconsMenuItem}>
            <ProfileIcon />
            User Name
          </Link>

          <Link to='/' className={s.iconsMenuItem}>
            <LogoutIcon />
            Выйти
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


