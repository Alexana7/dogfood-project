import { FormInput } from '../form-input';
import s from './styles.module.css';

export function Form({ handleFormSubmit, title, children }) {
    return (
        <form className={s.form} onSubmit={handleFormSubmit} noValidate>
            {title &&<h2 className={s.title}>{title}</h2>}
            {children}
        </form>
    );
}