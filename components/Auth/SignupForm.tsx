"use client"
import { RegisterInputProps } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import SubmitButton from "../formInputs/SubmitButton";
import { useState, useEffect } from "react";
import { UserRole } from "@prisma/client";
import { SelectUser } from "../formInputs/SelectUser";
import GoogleSignIn from "../formInputs/GoogleSignIn";
// import toast from "react-hot-toast";

async function createUser(data: RegisterInputProps): Promise<void> {
    // Simulate an API call to create a user
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simulate success or failure
            const success = true;
            if (success) {
                resolve();
            } else {
                reject(new Error("Failed to create user"));
            }
        }, 1000);
    });
}

export default function SignupForm({ role = "SERVICE_PROVIDERS", plan }: { role?: UserRole; plan?: string }) {
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const { register, handleSubmit, watch, formState: { errors }, setFocus } = useForm<RegisterInputProps>();

    const password = watch("password");

    useEffect(() => {
        if (errors.email) {
            setFocus("email");
        } else if (errors.password) {
            setFocus("password");
        } else if (errors.confirmPassword) {
            setFocus("confirmPassword");
        }
    }, [errors, setFocus]); // Added setFocus to the dependency array

    async function onSubmit(data: RegisterInputProps) {
        setIsLoading(true);
        data.role = role;
        try {
            await createUser(data);
            setMessage('Account created successfully!');
        } catch (error) {
            setMessage('Error creating account. Please try again.');
        }
        setIsLoading(false);
    }

    return (
        <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <Image src="/logo.jpg" width={34} height={34} className="mx-auto h-10 w-auto" alt="logo" />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight dark:text-white text-gray-900">
                    Create New Account
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <SelectUser />

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium dark:text-white text-gray-900">
                            Email
                        </label>
                        <input
                            {...register("email", { 
                                required: "Email is required", 
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "Invalid email address"
                                }
                            })}
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            placeholder="Enter your email"
                            className="mt-1 block w-full rounded-md dark:bg-slate-950 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                        {errors.email && <span className="text-red-600">{errors.email.message}</span>}
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium dark:text-white text-gray-900">
                            Password
                        </label>
                        <input
                            {...register("password", { 
                                required: "Password is required",
                                minLength: {
                                    value: 8,
                                    message: "Password must be at least 8 characters long"
                                }
                            })}
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            placeholder="Enter your password"
                            className="mt-1 block w-full rounded-md dark:bg-slate-950 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                        {errors.password && <span className="text-red-600">{errors.password.message}</span>}
                    </div>

                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium dark:text-white text-gray-900">
                            Confirm Password
                        </label>
                        <input
                            {...register("confirmPassword", { 
                                required: "Please confirm your password",
                                validate: value => value === password || "Passwords do not match"
                            })}
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            autoComplete="new-password"
                            placeholder="Confirm your password"
                            className="mt-1 block w-full rounded-md dark:bg-slate-950 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                        {errors.confirmPassword && <span className="text-red-600">{errors.confirmPassword.message}</span>}
                    </div>

                    <SubmitButton title="Create Account" loadingTitle="Creating, please wait..." isLoading={isLoading} />
                </form>

                <p className="mt-6 text-center text-sm text-gray-600">
                    Already have an account?{' '}
                    <Link href="/logIn" className="font-medium text-indigo-600 hover:text-indigo-500">
                        Sign In
                    </Link>
                </p>
                <GoogleSignIn text="Sign up"/>
                
                {message && <p className="mt-6 text-center text-sm text-gray-600">{message}</p>}
            </div>
        </div>
    );
}
