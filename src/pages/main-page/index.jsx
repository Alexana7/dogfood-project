import { ContentHeader } from '../../components/content-header';
import { Link } from 'react-router-dom';

export const MainPage = () => {
    return(
      <>     
        <ContentHeader title="Главная страница" />
        <Link to='/catalog'>Перейти в каталог</Link>  
      </>
    )
}