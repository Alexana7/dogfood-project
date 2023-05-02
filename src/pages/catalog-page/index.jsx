import { useEffect } from 'react';
import { CardList } from '../../components/card-list';
import { Sort } from '../../components/sort';
import s from './styles.module.css';



export const CatalogPage = ({cards, handleProductLike, currentUser}) => {
    return(
        <>
          <Sort />
          <CardList goods={cards} onProductLike={handleProductLike} currentUser={currentUser}/>
        </>

    )
}