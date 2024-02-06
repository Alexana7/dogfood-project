import s from './styles.module.css';
import CartItem from '../cart-item'

function CartList( {productsCart}) {
  return ( 
    <div className={s.cartList}>
      {productsCart.map((dataItem, index) => (
        <CartItem key={index} {...dataItem}/>
      ))}
    </div>
   );
}

export default CartList;