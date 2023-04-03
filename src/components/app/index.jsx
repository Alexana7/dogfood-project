import { useEffect, useState } from 'react';
import {Header} from '../header';
import {Logo} from '../logo';
import {Search} from '../search'
import {Footer} from '../footer';
import {Sort} from '../sort';
import {CardList} from '../card-list';
import { dataCard } from '../../data';
import api from '../../utils/api';
import { useDebounce } from '../../hooks/useDebounce';

import './styles.css';

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
    <Header>
      <Logo />
      <Search 
        handleFormSubmit={handleFormSubmit} 
        handleInputChange={handleInputChange} 
      />
    </Header> 
    <main className="content container">
      <Sort />
      <CardList goods={cards} />
    </main>
    <Footer />

  </>
  );
}
