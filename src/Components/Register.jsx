import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import Logo from './Logo';
import SocialLogin from './SocialLogin';
import useAuth from '../hooks/useAuth';
import { Link, useNavigate } from 'react-router';

const Register = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();
    const navigate = useNavigate();
    const { registerUser } = useAuth()
    const onSubmit = (data) => {

        console.log(data);
        // Add your registration logic here
        registerUser(data.email, data.password)
            .then(result => {
                console.log(result.user);

                toast.success('Registration successful!');
                reset();
                navigate('/');
            })
            .catch(error => {
                console.log(error.message);
            })

    };

    return (
        <div className="max-w-md mx-auto bg-base-200 p-4 shadow-md rounded-2xl">
            <Logo />
            <h1 className="text-center text-2xl font-bold mb-4">Register your account</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>Name:</label> <br />
                    <input
                        type="text"
                        placeholder="Enter your name"
                        className="w-full input input-bordered focus:border-[#10B981] focus:outline-none"
                        {...register('name', { required: 'Name is required' })}
                    />
                    {errors.name && <span className="text-error text-xs">{errors.name.message}</span>}
                </div>
                <div >
                    <label>Email:</label>
                    <br />
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="w-full input input-bordered focus:border-[#10B981] focus:outline-none"
                        {...register('email', { required: 'Email is required' })}
                    />
                    {errors.email && <span className="text-error text-xs">{errors.email.message}</span>}
                </div>
                <div>
                    <label>Image:</label>
                    <br />
                    <input
                        type="file"
                        className="w-full file-input file-input-bordered focus:border-[#10B981] focus:outline-none"
                        accept="image/*"
                        {...register('image', { required: 'Image is required' })}
                    />
                    {errors.image && <span className="text-error text-xs">{errors.image.message}</span>}
                </div>
                <div className="form-control mb-3">
                    <label>Password:</label>
                    <br />
                    <input
                        type="password"
                        placeholder="Enter your password"
                        className="w-full input input-bordered focus:border-[#10B981] focus:outline-none"
                        {...register('password', { required: 'Password is required', minLength: 8, pattern: { value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/, message: 'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character' } })}
                    />
                    {errors.password && <span className="text-error text-xs">{errors.password.message}</span>}
                    {errors.password?.type === 'minLength' && <span className="text-error text-xs">Password must be at least 6 characters</span>}
                </div>
                <button className='text-center w-full mt-5 bg-[#10B981] text-white btn hover:opacity-90' type="submit">Register</button>
            </form>
            <p className="mt-4 text-center">Already have an account? <Link to="/" className="text-[#10B981]">Login</Link></p>
            <SocialLogin></SocialLogin>
        </div>
    );
};

export default Register;