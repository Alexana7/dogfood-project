import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Product from '../../components/product';
import { Spinner } from '../../components/spinner';
import { NotFound } from '../../components/not-found';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSingleProduct } from '../../storage/single-product/single-product-slice';
import { changeLikeState } from '../../storage/single-product/single-product-slice'
import { fetchChangeLikeProduct } from '../../storage/products/products-slice';


// const ID_PRODUCT = '622c77f077d63f6e70967d23';


export const ProductPage = () => {
  const dispatch = useDispatch();
  const { productID } = useParams();
  const {data: product, loading: isLoading, error: errorState} = useSelector(state => state.singleProduct);

  function handleProductLike(product) {
    dispatch(fetchChangeLikeProduct(product)).then(updateCard => {
      if(updateCard.payload.product) {
        dispatch(changeLikeState(updateCard.payload.product))

      }
     
     
      });
    }
   useEffect(() => {
    dispatch(fetchSingleProduct(productID))

   }, [dispatch, productID])
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