"use client"
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
// import { useRouter } from "next/router"; // Make sure the import is from 'next/router' not 'next/navigation'
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image"; // Uncomment this if you are using the Image component
import { signIn as nextAuthSignIn } from "next-auth/react";
import { LoginInputProps, RegisterInputProps } from "@/types/types";
import SubmitButton from "../formInputs/SubmitButton"; // Ensure this import is correct
import { Alert } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";
import { SelectUser } from "../formInputs/SelectUser";
import GoogleSignIn from "../formInputs/GoogleSignIn";

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginInputProps>();

  async function onSubmit(data: LoginInputProps) {
    try {
      setIsLoading(true);
      console.log("Attempting to sign in with credentials:", data);
      const loginData = await nextAuthSignIn("credentials", {
        ...data,
        redirect: false,
      });
      console.log("SignIn response:", loginData);
      if (loginData?.error) {
        setIsLoading(false);
        toast.error("Sign-in error: Check your credentials");
        setShowNotification(true);
      } else {
        // Sign-in was successful
        setShowNotification(false);
        reset();
        setIsLoading(false);
        toast.success("Login Successful");
        router.push("/");
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Network Error:", error);
      toast.error("Its seems something is wrong with your Network");
    }
  }

  return (
    <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Image src="/logo.jpg" width={34} height={34} className="mx-auto h-10 w-auto" alt="logo" />
        <h2 className="mt-10 text-center  text-2xl font-bold leading-9 tracking-tight dark:text-white text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {showNotification && (
            <Alert color="failure" icon={HiInformationCircle}>
              <span className="font-medium">Wrong Token!</span> Please Check the
              token and Enter again
            </Alert>
          )}

          {/* Select who you are */}
          <SelectUser />

          {/* EMAIL ADDRESS INPUT  */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 dark:text-white text-gray-900">
              Email address
            </label>
            <div className="mt-2">
              <input
                {...register("email", { required: true })}
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                className="block w-full rounded-md border-0 py-1.5 dark:bg-slate-950 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {errors.email && <span className="text-red-600">email is required</span>}
            </div>
          </div>

          {/* Password input */}

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 dark:text-white text-gray-900">
                Password
              </label>


              <div className="text-sm">
                <Link href="#" className="font-semibold dark:text-slate-300 text-blue">
                  Forgot password?
                </Link>
              </div>
            </div>
            <div className="mt-2">
              <input
                {...register("password", { required: true })}
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                className="block w-full rounded-md border-0 py-1.5 dark:bg-slate-950 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {errors.password && <span className="text-red-600">password is required</span>}
            </div>
          </div>

          {/* Submit login button */}
          <div>
            <SubmitButton title="Login"
              loadingTitle="Logging in please wait...."
              isLoading={isLoading} />
          </div>
        </form>
        {/* Don't have an account */}
        <p className="mt-4 text-center text-sm dark:text-slate-200 text-gray-500">
          Do not have an Account?{' '}
          <Link href="/signUp" className="font-semibold leading-6 dark:text-cyan text-blue hover:text-cyan">
            Sign Up
          </Link>
        </p>

          {/* Sign in with with  */}
        {/* <Link href="https://support.google.com/" className="flex justify-center mt-5">
          <div className="flex gap-5 border-1 bg-white border-black self-center text-center justify-center items-center w-full rounded-md border-0 py-1.5 dark:bg-slate-950 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300">
           <Image src="/google.jpg" width={20} height={18} alt="google-log" />
            <p className="text-center">Sign in with google</p>
          </div>
        </Link> */}
        <GoogleSignIn text="Sign in"/>


      </div>
    </div>
  );
}
