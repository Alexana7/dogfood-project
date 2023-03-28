import { useState } from 'react';
import {Header} from '../header';
import {Logo} from '../logo';
import {Search} from '../search'
import {Footer} from '../footer';
import {Sort} from '../sort';
import {CardList} from '../card-list';
import { dataCard } from '../../data';

import './styles.css';

export function App() {
  const [cards, setCards] = useState(dataCard);
  const [searchQuery, setSearchQuery] = useState('');
  
  function handleRequest () {
    const filterCards = dataCard.filter(item => item.name.includes(searchQuery))
    setCards(filterCards)
  };

  function handleFormSubmit(e){
    e.preventDefault();
    handleRequest();

  }

  function handleInputChange(dataInput) {
    setSearchQuery(dataInput)

  }
  // useEffect(() => {
  //   handleRequest();
  // }, []);
	return (
  <>
    <Header>
      <Logo />
      <Search handleFormSubmit={handleFormSubmit} handleInputChange={handleInputChange} />
    </Header> 
    <main className="content container">
    
      <Sort />
      <CardList goods={cards} />
    </main>
    <Footer />

  </>
  );
}
