import { useCallback, useContext, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import Product from '../../components/product';
import api from '../../utils/api';
import { Spinner } from '../../components/spinner';
import { NotFound } from '../../components/not-found';
import { CardsContext } from '../../contexts/card-context';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSingleProduct } from '../../storage/single-product/single-product-slice';
import { changeLikeState } from '../../storage/single-product/single-product-slice'


// const ID_PRODUCT = '622c77f077d63f6e70967d23';


export const ProductPage = () => {
  const dispatch = useDispatch()
  const { productID } = useParams();
  const {data: product, loading: isLoading, error: errorState} = useSelector(state => state.singleProduct);
  const{handleLike} = useContext(CardsContext);

  function handleProductLike(product) {
    handleLike(product).then(updateCard => {
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