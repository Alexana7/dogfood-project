import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import {Header} from '../header';
import {Logo} from '../logo';
import {Search} from '../search'
import {Footer} from '../footer';
import {Sort} from '../sort';
import {CardList} from '../card-list';
import { isLiked } from '../../utils/products';
import api from '../../utils/api';
import { useDebounce } from '../../hooks/useDebounce';
import { ProductPage } from '../../pages/product-page';
import { CatalogPage } from '../../pages/catalog-page';
import FaqPage from '../../pages/faq-page';
import { NotFoundPage } from '../../pages/not-found-page';
import { FavoritesPage } from '../../pages/favorite-page';
import { UserContext } from '../../contexts/current-user-context';
import { CardsContext } from '../../contexts/card-context';
import { ThemeContext } from '../../contexts/theme-context';
import { themes } from '../../contexts/theme-context';
import { TABS_ID } from '../../utils/constants';



export function App() {
  const [cards, setCards] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [currentUser, setcurrentUser ] = useState();
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [theme, setTheme] = useState(themes.light);
  const [currentSort, setCurrentSort] = useState('');

  const debounceSearchQuery = useDebounce(searchQuery,300);
   
  function handleRequest () {
    // const filterCards = dataCard.filter(item => item.name.includes(searchQuery))
    // setCards(filterCards)

    api.search(debounceSearchQuery)
      .then((dataSearch)=> {
        setCards(dataSearch)
      })
  };

  function handleFormSubmit(e){
    e.preventDefault();
    handleRequest();
  }

  function handleInputChange(dataInput) {
    setSearchQuery(dataInput)
  }

  function handleUpdateUser(dataUserUpdate) {
    api.setUserInfo(dataUserUpdate)
      .then((updateUser) => {
        setcurrentUser(updateUser)
      })
  }
  function handleProductLike(product) {
    const like = isLiked(product.likes, currentUser._id);
    return api.changeLikeProductStatus(product._id, like)
      .then((updateCard) => {
        const newProducts = cards.map(cardState => {
          return cardState._id === updateCard._id ? updateCard : cardState;
        })
        setCards(newProducts);
        if (!like) {
          setFavorites(prevState => [...prevState, updateCard])
        } else {
          setFavorites(prevState => prevState.filter(card => card._id !== updateCard._id))
        }
        return updateCard;
      })
  }

  useEffect(() => {
    handleRequest();
  }, [debounceSearchQuery]);

  useEffect(() => {
    setIsLoading(true)
    api.getAllInfo()
      .then(([productsData, userInfoData]) => {
        setcurrentUser(userInfoData)
        setCards(productsData.products)

        const favoriteProducts = productsData.products.filter(item => isLiked(item.likes, userInfoData._id))
        setFavorites(favoriteProducts)
      })
      .catch(err => console.log(err))
      .finally(() => { setIsLoading(false) })
  }, []);

  function sortedData (currentSort) {
     switch(currentSort) {
      case (TABS_ID.CHEAP): setCards(cards.sort((a, b) => a.price - b.price)); break;
      case (TABS_ID.LOW):  setCards(cards.sort((a, b) => b.price - a.price)); break;
      case (TABS_ID.DISCOUNT):  setCards(cards.sort((a, b) => b.discount - a.discount)); break;
      default: setCards(cards.sort((a, b) => b.price - a.price));
     }
  }
   function toggleTheme () {
    theme === themes.dark ? setTheme(themes.light) : setTheme(themes.dark)
   }

	return (
    <ThemeContext.Provider value={{ theme: themes.light, toggleTheme }}>
      <CardsContext.Provider value={{ 
        cards, 
        favorites,
        currentSort,
        handleLike: handleProductLike, 
        isLoading, 
        onSortData: sortedData,
        setCurrentSort
      }}>
        <UserContext.Provider value={{ currentUser, onUpdateUser:handleUpdateUser }}>
          <Header user={currentUser}>
            <Routes>
              <Route path='/' element={ 
              <>
                <Logo />
                <Search handleFormSubmit={handleFormSubmit} handleInputChange={handleInputChange}/>  
              </>
              } />
              <Route path='*' element={ <Logo href='/'/> }/>
            </Routes>  
          </Header> 
            <main className="content container" style={{backgroundColor: theme.background}}>
              <Routes>
                <Route path='/' element={<CatalogPage handleProductLike={handleProductLike} currentUser={currentUser} isLoading={isLoading} />}/>

                <Route path='/favorites' element={<FavoritesPage />}/>
                <Route path='/faq' element={<FavoritesPage />}/>
                <Route path='/product/:productID' element={<ProductPage />}/>
                <Route path='*' element={<NotFoundPage />} />
              </Routes> 
          </main>
          <Footer />
        </UserContext.Provider>
      </CardsContext.Provider>
    </ThemeContext.Provider>
    );
}
