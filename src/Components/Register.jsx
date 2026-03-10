import React from 'react';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';

import Logo from './Logo';

const Register = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const onSubmit = (data) => {
        toast.success('Registration successful!');
        console.log(data);
        // Add your registration logic here
        reset();
    };

    return (
        <div className="max-w-md mx-auto bg-base-200 p-4 shadow-md rounded-2xl">
            <Logo />
            <h1 className="text-center text-2xl font-bold mb-4">Register your account</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-control mb-3">
                    <label className="label">Name:</label>
                    <input
                        type="text"
                        placeholder="Enter your name"
                        className="input input-bordered"
                        {...register('name', { required: 'Name is required' })}
                    />
                    {errors.name && <span className="text-error text-xs">{errors.name.message}</span>}
                </div>
                <div className="form-control mb-3">
                    <label className="label">Email:</label>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="input input-bordered"
                        {...register('email', { required: 'Email is required' })}
                    />
                    {errors.email && <span className="text-error text-xs">{errors.email.message}</span>}
                </div>
                <div className="form-control mb-3">
                    <label className="label">Image:</label>
                    <input
                        type="file"
                        className="file-input file-input-bordered"
                        accept="image/*"
                        {...register('image', { required: 'Image is required' })}
                    />
                    {errors.image && <span className="text-error text-xs">{errors.image.message}</span>}
                </div>
                <div className="form-control mb-3">
                    <label className="label">Password:</label>
                    <input
                        type="password"
                        placeholder="Enter your password"
                        className="input input-bordered"
                        {...register('password', { required: 'Password is required' })}
                    />
                    {errors.password && <span className="text-error text-xs">{errors.password.message}</span>}
                </div>
                <button className="btn btn-success w-full mt-4" type="submit">Register</button>
            </form>
            <p className="mt-4 text-center">Already have an account? <a href="/login" className="text-[#10B981]">Login</a></p>
        </div>
    );
};

export default Register;