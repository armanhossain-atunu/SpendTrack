import React from 'react';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import Logo from './Logo';
import SocialLogin from './SocialLogin';



const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const onSubmit = (data) => {
        toast.success('Login successful!');
        console.log(data);
        // Add your login logic here
        reset();
    };

    return (

        <div className='flex justify-center items-center min-h-screen bg-base-200'>
            <div className="max-w-md  mx-auto  bg-base-200 p-4 shadow-md rounded-2xl">
                <Logo></Logo>
                <h1 className="text-center text-2xl font-bold">Login your account</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='flex flex-col'>
                        <label>Email:</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className=' border py-1.5 px-3 rounded focus:border-[#10B981] focus:outline-none'
                            {...register('email', { required: 'Email is required' })}
                        />
                        {errors.email && <span style={{ color: 'red' }}>{errors.email.message}</span>}
                    </div>
                    <div className='flex flex-col'>
                        <label>Password:</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            className='border py-1.5 px-3 rounded focus:border-[#10B981] focus:outline-none'
                            {...register('password', { required: 'Password is required' })}
                        />
                        {errors.password && <span style={{ color: 'red' }}>{errors.password.message}</span>}
                    </div>
                    <div className='text-center '>

                        <button className='text-center w-full mt-5 bg-[#10B981] text-white btn hover:opacity-90' type="submit">Login</button>
                    </div>
                </form>
                <p>Don't have an account? <a href="/register" className='text-[#10B981]'>Register</a></p>
                <SocialLogin></SocialLogin>

            </div>
        </div>
    );
};

export default Login;