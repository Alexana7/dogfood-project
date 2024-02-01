import './styles.css';
import { Rating } from "../rating";

export function Review ({ author, city, text, created_at, rating, _id, photos }) {
  return ( 
    <div className="review">
      <div className="review__header">
        <div className="review__name">{author.name}</div>
        <div className="review__date">{created_at}</div>
      </div>
      <Rating currentRating={rating} />
      {city && <div className="review__city">{city}</div>}
      <p className="review__text">'{text}'</p>

    </div>
   );
}

