import styles from './Comment.module.css';
import { useForm } from 'react-hook-form';
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import { CommentServices } from '../../services/apiServices';

const Comment = () => {

    const schema = Joi.object({
        name: Joi.string().required(),
        comment: Joi.string().required()
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
        CommentServices.postComment(data)
    }

    return (
        <div className={styles.wrapper}>
            <h2>Create new comment</h2>
            <form className={styles.formWrapper} onSubmit={handleSubmit(onSubmit)}>
                <label>
                    Name:
                    <br/>
                    <input type='text' {...register('name', {required: true})} />
                    {errors.firstName && <span>{errors.name.message}</span>}
                </label>
                <label>
                    Comment:
                    <br/>
                    <textarea {...register('comment', {required: true})} />
                    {errors.comment && <span>{errors.comment.message}</span>}
                </label>
                <input className={styles.btn} type='submit' value='Send Comment' />
            </form>
        </div>
    )
}

export default Comment;