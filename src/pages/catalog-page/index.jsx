import { useContext } from 'react';
import { CardList } from '../../components/card-list';
import { Sort } from '../../components/sort';
import s from './styles.module.css';
import { Spinner } from '../../components/spinner';
import { CardsContext } from '../../contexts/card-context';
import { ContentHeader } from '../../components/content-header';


export const CatalogPage = () => {
  const {cards: goods} = useContext(CardsContext);
    return(
        <>     
          <ContentHeader title="Каталог" textButton='Главная' to='/' />
          <Sort />
          <CardList goods={goods}/>   
        </>
    )
}