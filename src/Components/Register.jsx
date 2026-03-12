import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Logo from './Logo';
import SocialLogin from './SocialLogin';
import useAuth from '../hooks/useAuth';
import { Link, useNavigate } from 'react-router';

const Register = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const navigate = useNavigate();
    const { registerUser, loginGoogle, userUpdate } = useAuth();

    const onSubmit = async (data) => {
        try {
            // Register user with email & password
            const result = await registerUser(data.email, data.password);
            console.log(result.user);

            // Update user profile (Firebase)
            await userUpdate(data.name, data.image);

            toast.success('Registration successful!');
            reset();
            navigate('/'); // redirect to home
        } catch (error) {
            console.error(error.message);
            toast.error(error.message);
        }
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
        <div className='flex flex-col justify-center items-center min-h-screen gap-5'>
        <div className="max-w-md mx-auto border p-5 shadow-md rounded-2xl">
            <Logo />
            <h1 className="text-center text-2xl font-bold mb-4">Register your account</h1>
            <form className='space-y-2' onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>Name:</label> <br />
                    <input
                        type="text"
                        placeholder="Enter your name"
                        className="w-full border py-1.5 px-3 input-bordered focus:border-[#10B981] focus:outline-none"
                        {...register('name', { required: 'Name is required' })}
                    />
                    {errors.name && <span className="text-error text-xs">{errors.name.message}</span>}
                </div>
                <div>
                    <label>Email:</label>
                    <br />
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="w-full border py-1.5 px-3 input-bordered focus:border-[#10B981] focus:outline-none"
                        {...register('email', { required: 'Email is required' })}
                    />
                    {errors.email && <span className="text-error text-xs">{errors.email.message}</span>}
                </div>
                <div>
                    <label>Image URL</label>
                    <br />
                    <input
                        type="url"
                        placeholder="Enter image URL"
                        className="w-full border input-bordered focus:border-[#10B981] focus:outline-none"
                        {...register('image', { required: 'Image URL is required' })}
                    />
                    {errors.image && <span className="text-error text-xs">{errors.image.message}</span>}
                </div>
                <div className="form-control mb-3">
                    <label>Password:</label>
                    <br />
                    <input
                        type="password"
                        placeholder="Enter your password"
                        className="w-full border py-1.5 px-3 input-bordered focus:border-[#10B981] focus:outline-none"
                        {...register('password', { 
                            required: 'Password is required', 
                            minLength: { value: 8, message: 'Password must be at least 8 characters' }, 
                            pattern: { 
                                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/, 
                                message: 'Password must contain lowercase, uppercase, number & special char' 
                            } 
                        })}
                    />
                    {errors.password && <span className="text-error text-xs">{errors.password.message}</span>}
                </div>
                <button className='text-center w-full  bg-[#10B981] text-white btn hover:opacity-90' type="submit">Register</button>
            </form>
            <p className="mt-2 text-center">
                Already have an account? <Link to="/" className="text-[#10B981]">Login</Link>
            </p>
            <SocialLogin handleGoogleLogin={handleGoogleLogin}></SocialLogin>
        </div>
        </div>
    );
};

export default Register;