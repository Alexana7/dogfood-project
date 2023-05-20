import { FormInput } from '../form-input';
import s from './styles.module.css';

export function Form({ handleFormSubmit, title, children }) {
    return (
        <form className={s.form} onSubmit={handleFormSubmit} noValidate>
            <h3 className={s.title}>{title}</h3>
            {children}
        </form>
    );
}