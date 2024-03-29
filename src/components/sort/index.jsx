
import s from  './styles.module.css';
import cn from 'classnames'
import { useDispatch, useSelector } from 'react-redux';
import { sortedProducts } from '../../storage/products/products-slice'

export function Sort({ tabs = [] }) {
  const dispatch = useDispatch();
  const currentSort = useSelector(state => state.products.currentSort)
   function handleClickTab(e, tab) {
      e.preventDefault()
      dispatch(sortedProducts(tab.id));
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


