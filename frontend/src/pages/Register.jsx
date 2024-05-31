import { useForm } from "react-hook-form"
import { UseUserContext } from '../hooks/UseUserContext'
import { Link } from "react-router-dom"

const Register = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const { dispatch } = UseUserContext()


    const onSubmit = async (data) => {
        const response = await fetch(`http://localhost:4000/api/user/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            credentials: 'include'
        })

        const json = await response.json()

        if(response.ok){
            dispatch({type:'LOGIN' , payload:json})
        }

    }


    return (
        <div className="flex h-screen  justify-center items-center">
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-3xl shadow-md p-10 flex flex-col">
                <p className="text-primary text-4xl font-bold mb-10">Register to Social</p>

                <label className="text-textColor flex flex-col">
                    Name:
                    <input {...register('name', {
                        required: 'Name feild must not be empty'
                    })
                    } className="rounded-lg border-2 border-gray-300 "></input>
                </label>
                {errors.name && <div className="text-red-500">{errors.name.message}</div>}

                <label className="text-textColor flex flex-col">
                    Last name:
                    <input {...register('last_name', {
                        required: 'Last name feild must not be empty'
                    })
                    } className="rounded-lg border-2 border-gray-300 "></input>
                </label>
                {errors.last_name && <div className="text-red-500">{errors.last_name.message}</div>}

                <label className="text-textColor flex flex-col">
                    Emial:
                    <input {...register('email', {
                        required: 'Email feild must not be empty'
                    })
                    } className="rounded-lg border-2 border-gray-300 "></input>
                </label>
                {errors.email && <div className="text-red-500">{errors.email.message}</div>}

                <label className="text-textColor flex flex-col">
                    Password:
                    <input {...register('password', {
                        required: 'Password feild must not be empty'
                    })
                    } className="rounded-lg border-2 border-gray-300 "></input>
                </label>
                {errors.password && <div className="text-red-500">{errors.password.message}</div>}

                <button type="submit" className="btn-primary">Register</button>

                <Link to='/user/login'>Login here</Link>
            </form>
        </div>

    )
}

export default Register