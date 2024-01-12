import { useCallback, useContext} from 'react';
import { useParams } from 'react-router-dom';
import Product from '../../components/product';
import api from '../../utils/api';
import { Spinner } from '../../components/spinner';
import { NotFound } from '../../components/not-found';
import { CardsContext } from '../../contexts/card-context';
import { useApi } from '../../hooks/useApi';


// const ID_PRODUCT = '622c77f077d63f6e70967d23';


export const ProductPage = () => {
  const { productID } = useParams();

  const handleGetProduct = useCallback(() => api.getProductById(productID), []) ;
  const {data: product, setData: setProduct, loading: isLoading, error: errorState} = useApi(handleGetProduct);
  const{handleLike} = useContext(CardsContext);

  function handleProductLike(product) {
    handleLike(product).then(updateCard => {
        setProduct(updateCard.payload.product)
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