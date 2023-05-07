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


export function App() {
  const [cards, setCards] = useState([]);
  const [currentUser, setcurrentUser ] = useState();
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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
    api.changeLikeProductStatus(product._id, like)
      .then((updateCard) => {
        const newProducts = cards.map(cardState => {
          return cardState._id === updateCard._id ? updateCard : cardState;
        })
        setCards(newProducts)
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
      })
      .catch(err => console.log(err))
      .finally(() => { setIsLoading(false) })
  }, []);

	return (
  <>
    <Header user={currentUser} onUpdateUser={handleUpdateUser}>
      
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
      <main className="content container">
        <Routes>
          <Route path='/' element={<CatalogPage cards={cards} handleProductLike={handleProductLike} currentUser={currentUser} isLoading={isLoading} />}/>
          <Route path='/faq' element={<FaqPage />}/>
          <Route path='/product/:productID' element={<ProductPage />}/>
          <Route path='*' element={<NotFoundPage />} />
        </Routes> 
    </main>
    <Footer />

  </>
  );
}
