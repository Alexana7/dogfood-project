import s from './styles.module.css';
import { useSelector } from 'react-redux';

export default function СartInfo() {
  const { totalCountProducts } = useSelector(state => state.cart)
  return (
    <div className={s.cartTitle}>
      <span>{ totalCountProducts } товаров</span> в корзине
    </div>
   );
}