
import './styles.css';
import likeIcon from '../search/assets/save.svg';

export function Card({
  name, 
  price, 
  discount, 
  wight, 
  description, 
  pictures, 
  ...props
}) {
  const discountPrice = Math.round(price - (price * discount) / 100);
  return (
      <article className='card'>
        <div className="card__sticky card__sticky_type_-top-left">
          {discount !== 0 && (
          <span className='card__discount'>{`-${discount}%`}</span>
          )}
        </div>
        <div className="card__sticky card__sticky_type_-top-right">
          <button className="card__favorite">
            <img src={likeIcon} alt="like" className='card__favorite-icon' />
          </button>
        </div>
        <a className='card__link' href="/">
          <img src={pictures} alt={name} className="card__image" />
          <div className="card__desc">
            {discount !== 0 ? (
              <>
                <span className='card__old-price'>{price}&nbsp;&#8381;</span>
                <span className='card__price card__price_type_discount'>{discountPrice}&nbsp;&#8381;</span>
              </>
              
            ) : (
              <span className='card__price'>{price}&nbsp;&#8381;</span>
            )}
            <span className='card__wight'>{wight}</span>
            <h3 className="card__name">{name}</h3>
            <p>{description}</p>
          </div>
        </a>
        <a href="/" className="card__cart btn btn_type_primary">В корзину</a>
      </article>     
  );
}


