
import { CardList } from '../../components/card-list';
import { ContentHeader } from '../../components/content-header';
import { useSelector } from 'react-redux';


export const FavoritesPage = () => {
    const goods = useSelector(state => state.products.favoriteProducts);
    return(
        <>
          <ContentHeader title="Избранное" textButton='назад' />
          <CardList goods={goods} />
        </>
    )
}