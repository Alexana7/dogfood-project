
import './styles.css';
import {Card} from '../card';
import { dataCard } from '../../data';

export function CardList() {
  return (
    <div className='cards content__cards'>
    {dataCard.map(dataItem => <Card {...dataItem}/>)}
      <Card />
    </div>
  );
}


