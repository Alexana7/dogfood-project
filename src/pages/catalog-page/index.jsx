import { useEffect } from 'react';
import { CardList } from '../../components/card-list';
import { Sort } from '../../components/sort';
import s from './styles.module.css';
import { Spinner } from '../../components/spinner';



export const CatalogPage = ({isLoading}) => {
    return(
        <>
          {
            isLoading
              ? <Spinner/>
              : <>
                  <Sort />
                  <CardList />
                </>
          }  
        </>
    )
}