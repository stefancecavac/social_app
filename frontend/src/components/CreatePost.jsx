import { useForm } from "react-hook-form"
import { UsePostContext } from "../hooks/UsePostContext"

const CreatePost = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const {dispatch} = UsePostContext()

    const onSubmit = async(data) =>{
        const response = await fetch(`http://localhost:4000/api/posts/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            credentials: 'include'
        })

        const json = await response.json()

        if(response.ok){
            dispatch({type:'CREATE_POST' , payload:json})
        }
    }

    return (
       
            <form className="rounded-3xl bg-white flex  flex-col p-4" onSubmit={handleSubmit(onSubmit)}>
                <textarea {...register('content', {
                    required: 'Please fill out this field'
                })} className="resize-none h-24 border-2 p-2 border-gray-100 rounded-3xl focus:outline-none " placeholder="Share your thoughts..."></textarea>
                {errors.content && <div className="text-red-500">{errors.content.message}</div>}
                <div className="flex justify-end mt-2">
                    <button className="btn-primary py-1 px-3">Post</button>
                </div>
            </form>
       
    )
}

export default CreatePost