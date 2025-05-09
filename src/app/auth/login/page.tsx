'use client';
import { AUTH_STATE } from '@/constant/auth.constant';
import { useAppDispatch } from '@/store/hooks';
import { useRouter } from 'next/navigation';

import { IAuthInitialState } from '@/types/auth';
import { ChangeEvent, FormEvent, useState } from 'react';
import { BsApple } from 'react-icons/bs';
import { FaFacebook, FaGooglePlusG } from 'react-icons/fa';
import { TfiWorld } from 'react-icons/tfi';
import { postLoginThunk } from './store/authThunk';

const LoginPage = () => {
  const [initialState, setInitialState] = useState({ ...AUTH_STATE });
  const dispatch = useAppDispatch();
  const route = useRouter();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInitialState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let payload: IAuthInitialState = {
      email: initialState?.email,
      password: initialState?.password,
    };

    let result = await dispatch(postLoginThunk(payload));
    if (postLoginThunk.fulfilled.match(result)) {
      route.push('/home');
    }
  };
  return (
    <section className="h-screen bg-[#F3F5F9] flex justify-center items-center">
      <div className="from-gray-200 bg-gradient-to-b to-transparent min-w-md rounded-2xl shadow-2xl p-5 flex flex-col gap-y-8">
        <div className="flex justify-center items-center mt-10">
          <button className="bg-white/40 px-3 py-2 rounded-lg shadow-md hover:shadow-lg">
            <TfiWorld size={30} className="text-black" />
          </button>
        </div>
        <div className="">
          <h2 className="text-black text-2xl font-sans text-center">
            Welcome back
          </h2>
          <p className="text-neutral-400 text-sm text-center mt-5 font-sans">
            Please enter your details to sign in
          </p>
        </div>
        <div className="flex justify-center items-center gap-x-3">
          <button className="bg-white/40 px-10 py-2 rounded-lg shadow-md hover:shadow-lg">
            <FaGooglePlusG size={30} className="text-black" />
          </button>
          <button className="bg-white/40 px-10 py-2 rounded-lg shadow-md hover:shadow-lg">
            <BsApple size={30} className="text-black" />
          </button>
          <button className="bg-white/40 px-10 py-2 rounded-lg shadow-md hover:shadow-lg">
            <FaFacebook size={30} className="text-black" />
          </button>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex-1 border-t border-neutral-400" />
          <span className="text-sm text-neutral-400 font-sans">or</span>
          <div className="flex-1 border-t border-neutral-400" />
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-y-8">
          <div>
            <label htmlFor="email" className="flex flex-col">
              <span className="font-sans text-lg text-black">Email adress</span>
              <input
                type="email"
                id="email"
                defaultValue={initialState?.email}
                onChange={handleChange}
                name="email"
                placeholder="Enter your email"
                className="border-neutral-400 border placeholder:text-neutral-400 font-sans text-base outline-none p-2 text-black rounded-lg"
              />
            </label>
            <label htmlFor="password" className="flex flex-col">
              <span className="font-sans text-lg text-black">Password</span>
              <input
                type="password"
                id="password"
                defaultValue={initialState?.password}
                onChange={handleChange}
                name="password"
                placeholder="Enter your password"
                className="border-neutral-400 border placeholder:text-neutral-400 font-sans text-base outline-none p-2 text-black rounded-lg"
              />
            </label>
          </div>
          <div className="flex">
            <button
              type="submit"
              className=" shadow-lg flex-1 p-2 rounded-lg bg-gradient-to-t from-gray-700 to-gray-400 font-sans hover:to-gray-500"
            >
              Sign in
            </button>
          </div>
        </form>

        <p className="text-neutral-400 font-sans text-sm text-center">
          Don't have an account?{' '}
          <span className="text-gray-700">Create account</span>
        </p>
      </div>
    </section>
  );
};

export default LoginPage;
