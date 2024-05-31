import { useForm } from "react-hook-form"

const CreatePost = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) =>{
        console.log(data)
    }

    return (
       
            <form className="rounded-3xl bg-white flex w-4/5 flex-col p-5" onSubmit={handleSubmit(onSubmit)}>
                <textarea {...register('content', {
                    required: 'Please fill out this field'
                })} className="resize-none h-24 border-2 p-2 border-gray-100 rounded-3xl focus:outline-none " placeholder="Share your thoughts..."></textarea>
                {errors.content && <div className="text-red-500">{errors.content.message}</div>}
                <div className="flex justify-end mt-5">
                    <button className="btn-primary">Post</button>
                </div>
            </form>
       
    )
}

export default CreatePost