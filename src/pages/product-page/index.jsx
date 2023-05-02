import { useEffect, useState } from 'react';
import { CardList } from '../../components/card-list';
import { Sort } from '../../components/sort';
import Product from '../../components/product'
import api from '../../utils/api';
import s from './styles.module.css';

const ID_PRODUCT = '622c77e877d63f6e70967d22';


export const ProductPage = () => {
  const [product, setProduct] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    setIsLoading(true)
    api.getProductInfo(ID_PRODUCT)
      .then(([productData, userData]) => {
        setCurrentUser(userData);
        setProduct(productData);
      })
      .catch(()=> {
        console.log("Ошибка на стороне сервера")
      })
      .finally(()=>{
        setIsLoading(false)
      })
  }, [])

    return(
        <>
          <Product {...product} currentUser={currentUser} />
        </>

    )
}