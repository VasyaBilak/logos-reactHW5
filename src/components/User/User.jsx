import styles from './User.module.css';
import { useForm } from 'react-hook-form';
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import { UserServices } from '../../services/apiServices';

const User = () => {

    const schema = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.number().required()
      });

    const { handleSubmit, register, formState: {errors} } = useForm(
        {
            resolver: async (data, context, options) => {
                console.log("formData", data)
                console.log(
                  "validation result",
                  await joiResolver(schema)(data, context, options)
                )
                return joiResolver(schema)(data, context, options)
              }
        },
    );

    const onSubmit = (data) => {
        console.log(errors);
        UserServices.postUsers(data);
    }

    return (
        <div className={styles.wrapper}>
            <h2>User registration form</h2>
            <form className={styles.formWrapper} onSubmit={handleSubmit(onSubmit)}>
                <label>
                    First name:
                    <br/>
                    <input type='text' {...register('firstName', {required: true})} />
                    {errors.firstName && <span>{errors.firstName.message}</span>}
                </label>
                <label>
                    Last name:
                    <br/>
                    <input type='text' {...register('lastName', {required: true})} />
                    {errors.lastName && <span>{errors.lastName.message}</span>}
                </label>
                <label>
                    Email:
                    <br/>
                    <input type='text' {...register('email', {required: true})} />
                    {errors.email && <span>{errors.email.message}</span>}
                </label>
                <label>
                    Password:
                    <br/>
                    <input type='password' {...register('password', {required: true})} />
                    {errors.password && <span>{errors.password.message}</span>}
                </label>
                <input className={styles.btn} type='submit' value='Create User' />
            </form>
        </div>
    )
}

export default User;