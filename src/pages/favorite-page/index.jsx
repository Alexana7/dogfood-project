import { useContext} from 'react';
import { CardList } from '../../components/card-list';
import { Spinner } from '../../components/spinner';
import { CardsContext } from '../../contexts/card-context';
import { ContentHeader } from '../../components/content-header';



export const FavoritesPage = ({isLoading}) => {
    const { favorites: goods } = useContext(CardsContext);
    return(
        <>
          {
            isLoading
              ? <Spinner/>
              : <>
                  <ContentHeader title="Избранное" textButton='назад' />
                  <CardList goods={goods} />
                </>
          }  
        </>
    )
}