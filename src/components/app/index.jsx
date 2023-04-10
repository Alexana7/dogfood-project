import { useEffect, useState } from 'react';
import {Header} from '../header';
import {Logo} from '../logo';
import {Search} from '../search'
import {Footer} from '../footer';
import {Sort} from '../sort';
import {CardList} from '../card-list';
import { isLiked } from '../../utils/products';
import api from '../../utils/api';
import { useDebounce } from '../../hooks/useDebounce';


export function App() {
  const [cards, setCards] = useState([]);
  const [currentUser, setcurrentUser ] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
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
    api.getAllInfo()
      .then(([productsData, userInfoData]) => {
        setcurrentUser(userInfoData)
        setCards(productsData.products)
      })
      .catch(err => console.log(err))
  }, []);

	return (
  <>
    <Header user={currentUser} onUpdateUser={handleUpdateUser}>
      <Logo />
      <Search 
        handleFormSubmit={handleFormSubmit} 
        handleInputChange={handleInputChange} 
      />
    </Header> 
      <main className="content container">
      <Sort />
      <CardList goods={cards} onProductLike={handleProductLike} currentUser={currentUser}/>
    </main>
    <Footer />

  </>
  );
}
