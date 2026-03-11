import React from 'react';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import Logo from './Logo';
import SocialLogin from './SocialLogin';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router';



const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();
    const navigate = useNavigate();
    const { loginUser, loginGoogle } = useAuth()
    const onSubmit = (data) => {

        console.log(data);
        loginUser(data.email, data.password)
            .then(result => {
                console.log(result.user);
                toast.success('Login successful!');
                reset();
                navigate('/home');

            })
            .catch(error => {
                console.log(error.message);
                toast.error(error.message);
            })

    };
    const handleGoogleLogin = async () => {
        try {
            const result = await loginGoogle();
            console.log(result.user);
            toast.success('Login successful!');
            navigate('/home');
        } catch (error) {
            console.error(error.message);
            toast.error(error.message);
        }
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
                            {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters' }, pattern: { value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/, message: 'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character' } })}
                        />
                        {errors.password && <span style={{ color: 'red' }}>{errors.password.message}</span>}
                    </div>
                    <div className='text-center '>

                        <button className='text-center w-full mt-5 bg-[#10B981] text-white btn hover:opacity-90' type="submit">Login</button>
                    </div>
                </form>
                <p>Don't have an account? <a href="/register" className='text-[#10B981]'>Register</a></p>
                <SocialLogin handleGoogleLogin={handleGoogleLogin}></SocialLogin>

            </div>
        </div>
    );
};

export default Login;