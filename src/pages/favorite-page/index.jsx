import { useContext} from 'react';
import { CardList } from '../../components/card-list';
import { Spinner } from '../../components/spinner';
import { CardsContext } from '../../contexts/card-context';



export const FavoritesPage = ({isLoading}) => {
    const { favorites: goods } = useContext(CardsContext);
    return(
        <>
          {
            isLoading
              ? <Spinner/>
              : <>
                  <CardList goods={goods} />
                </>
          }  
        </>
    )
}