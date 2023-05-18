
import { useContext } from 'react';
import { CardsContext } from '../../contexts/card-context';
import s from  './styles.module.css';
import cn from 'classnames'

export function Sort({ tabs = [] }) {
  const {currentSort, setCurrentSort, onSortData} = useContext(CardsContext)
   function handleClickTab(e, tab) {
      e.preventDefault()
      setCurrentSort(tab.id)
      onSortData(tab.id)
   }
  return (
      <div className={cn(s.sort)}>
        { tabs.map(tab => (
          <a key={tab.id}
            className={cn(s.sort__link, {[s.sort__link_selected]: currentSort === tab.id})}
            href="#" 
            onClick={(e) => handleClickTab(e, tab)}>
              {tab.title}
          </a>
          ))}
      </div>
  );
}


