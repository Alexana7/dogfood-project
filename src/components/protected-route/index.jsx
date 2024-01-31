import { Navigate, useLocation } from "react-router-dom";
import { Spinner } from "../spinner";
import { useSelector } from "react-redux";


export function ProtectedRoute({ onlyUnAuth, children }) {
  const location = useLocation();
  const user = useSelector(state => state.user.data);
  const isAuthChecked = useSelector(state => state.user.isAuthChecked);
  
  // debugger;
    // если проверка нщн авторизации не произошла, показываю спиннер чтобы не моргал экран
    if (!isAuthChecked) return <Spinner />

    // если пользователь авторизован и он на странице аторизации/пароля/автологина - редирект пользователя обратно (с которой он перешел)
    if (onlyUnAuth && user) {
      // перенаправить пользователя на запрашиваемую страницу: если был редирект || если юзер пришел по прямому URL
      const { from } = location.state || { from: { pathname: '/' } }
      const { backgroundLocation } = location?.state?.from?.state || {backgroundLocation: null}
      return <Navigate replace to={ from }  state={{ backgroundLocation }}/>
    }

    // пользователь не авторизован и находится не на странице логина - редирект на страницу логина и обратно на страницу (предыдущий директ запишем в state)
    if (!onlyUnAuth && !user) {
      console.log('Navigate login page')
      return (
        <Navigate replace to={{ pathname: '/login' }} state={{ from: location }}/>
      )
    }
    
    //если мы не на странице логина и юзер есть
    return children
      
}