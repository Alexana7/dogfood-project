import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CardList } from '../../components/card-list';
import { Sort } from '../../components/sort';
import Product from '../../components/product';
import { isLiked } from '../../utils/products';
import api from '../../utils/api';
import s from './styles.module.css';
import { Spinner } from '../../components/spinner';
import { NotFound } from '../../components/not-found';

// const ID_PRODUCT = '622c77f077d63f6e70967d23';


export const ProductPage = () => {
  const { productID } = useParams();
  const [product, setProduct] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorState, setErrorState] = useState(null);

  function handleProductLike(product) {
    const like = isLiked(product.likes, currentUser._id);
    api.changeLikeProductStatus(product._id, like)
      .then((updateCard) => {
        setProduct(updateCard)
      })
  }
  
  useEffect(() => {
    setIsLoading(true)
    api.getProductInfo(productID)
      .then(([productData, userData]) => {
        setCurrentUser(userData);
        setProduct(productData);
      })
      .catch((err)=> {
        setErrorState(err)
      })
      .finally(()=>{
        setIsLoading(false)
      })
  }, [])

    return(
        <>
          {isLoading
            ? <Spinner/>
            : !errorState && <Product {...product} currentUser={currentUser} onProductLike={handleProductLike} />
          }

          {!isLoading && errorState && <NotFound title='Товар не найден'/> }  
        </>

    )
}