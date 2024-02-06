import cn from 'classnames';
import './styles.css';
import s from './styles.module.css';
import { useContext } from 'react';
import { ThemeContext } from '../../contexts/theme-context';
import { Link, useLocation } from 'react-router-dom';
import { ReactComponent as FavoriteIcon} from './images/favorites.svg'
import { ReactComponent as CartIcon} from './images/cart.svg'
import { ReactComponent as LogoutIcon} from './images/logout.svg'
import { ReactComponent as ProfileIcon} from './images/profile.svg'
import { ReactComponent as UserIcon} from './images/user.svg'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../storage/user/user-slice';



export function Header({ children }) {

  const currentUser = useSelector(state => state.user.data);
  const { totalCountProducts } = useSelector(state => state.cart);
  const favorites = useSelector(state => state.products.favoriteProducts);
  const dispatch = useDispatch();
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
            {totalCountProducts !== 0 && <span className={s.iconBubble}>{totalCountProducts}</span>}
          </Link>

          { !currentUser && <Link to='/login' className={s.iconsMenuItem} replace state={{backgroundLocation: location, initialPath: location.pathname}}>
              <UserIcon />
              Войти
            </Link>
          } 

          { currentUser && <>
          <Link to='/profile' className={s.iconsMenuItem}>
            <ProfileIcon />
            {currentUser?.name}
            </Link>
            
            <Link to='/' className={s.iconsMenuItem} onClick={() => dispatch(logout())}>
            <LogoutIcon />
            Выйти
            </Link>
            </>
          }
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


