import { Controller, useForm } from 'react-hook-form';
import {Form} from '../form';
import {FormInput} from '../form-input';
import {FormButton} from '../form-button';
import { Rating } from '../rating';
import { useDispatch } from 'react-redux';
import { fetchCreateReview } from '../../storage/single-product/single-product-slice';


export function FormReview({ title = 'Отзыв о товаре', productId }) {
    const dispatch = useDispatch();
    const { register, control,  handleSubmit, formState: { errors }, reset } = useForm({ mode: "onBlur" });
    // const [currentRating, setCurrentRating] = useState(5);

    const handleSubmitFormReview = (data) => {
        console.log(data)
        dispatch(fetchCreateReview({productId, data}))
        reset()
       
    }
    const textRegister = register('text', {
        required: {
            value: true,
            message: 'Обязательное поле'
        }
    })

    return (
        <>
            <h2>{title}</h2>
            <Controller 
                render={({ field }) => (
                    <Rating currentRating={field.value} setCurrentRating={field.onChange} isEditable error={errors.rating} />)}
                name='currentRating'
                control={control}
                rules={{
                    required: {
                        value: true,
                        message: 'Укажите рейтинг'
                    }
                }}    
            />
            <Form handleFormSubmit={handleSubmit(handleSubmitFormReview)}>
                <FormInput
                {...textRegister}
                typeTag='textarea'
                id='text'
                placeholder='Поделитесь впечатлениями о товаре'
                />
                {errors?.text && <p className='errorMessage'>{errors?.text?.message}</p>}
                
                <FormButton type='submit' color='pramary'>Отправить отзыв</FormButton>
                
            </Form>
        </>
    );
}