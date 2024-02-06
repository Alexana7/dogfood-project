import s from './styles.module.css';
import { ReactComponent as GiftIcon } from "./image/gift.svg";

export default function GiftLabel({ title, text }) {
   return (
      <div className={s.giftLabel}>
         <GiftIcon className={s.giftIcon} />
         <div className={s.giftTitle}>{title}</div>
         <div className={s.giftText}>{text}</div>
      </div>
   )
}