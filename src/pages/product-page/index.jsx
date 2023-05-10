import { useCallback, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CardList } from '../../components/card-list';
import { Sort } from '../../components/sort';
import Product from '../../components/product';
import { isLiked } from '../../utils/products';
import api from '../../utils/api';
import s from './styles.module.css';
import { Spinner } from '../../components/spinner';
import { NotFound } from '../../components/not-found';
import { CardsContext } from '../../contexts/card-context';
import { useApi } from '../../hooks/useApi';
import { UserContext } from '../../contexts/current-user-context';

// const ID_PRODUCT = '622c77f077d63f6e70967d23';


export const ProductPage = () => {
  const { productID } = useParams();

  const handleGetProduct = useCallback(() => api.getProductById(productID), []) ;
  const {data: product, setData: setProduct, loading: isLoading, error: errorState} = useApi(handleGetProduct);
  const{handleLike} = useContext(CardsContext);

  function handleProductLike(product) {
    handleLike(product).then(updateCard => {
        setProduct(updateCard)
      });
    }
   
    return(
        <>
          {isLoading
            ? <Spinner/>
            : !errorState && <Product {...product} onProductLike={handleProductLike} />
          }

          {!isLoading && errorState && <NotFound title='Товар не найден'/> }  
        </>

    )
}