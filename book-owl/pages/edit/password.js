import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Image from "next/image";
import Link from "next/link";

import HeaderFooterLayout from "../../layouts/HeaderFooterLayout";
import useAuth from "../../hooks/useAuth";
import api from '../../api';

import bg from "../../public/background.webp";
import User from "../../public/account2.png";
import BackArrow from "../../public/back-arrow.png";

const Password = () => {
    const { token } = useAuth();
    const [currentUser, setCurrentUser] = useState();
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [loading, isLoading] = useState(false);
    const [msg, setMsg] = useState({ message: '', isError: false });

    useEffect(() => {
      if (!token) {
          return;
      }

      api.self(token)
          .then(({ user }) => {
              setCurrentUser(user);
          })
          .catch((err) => {
              setMsg({ message: err.message, isError: true })
          });
    }, [token])

    const validationSchema = Yup.object().shape({
        oldPassword: Yup.string()
            .required('Password is required'),
        newPassword: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required'),
    });

    const formOptions = { resolver: yupResolver(validationSchema) };

    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState;

    const onSubmit = async () => {
        isLoading(true);
        
        const uri = currentUser.id + " " + oldPassword + " " + newPassword;

        const res = await fetch(`http://localhost:3000/api/${uri}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: currentUser.id, oldPassword: oldPassword, newPassword: newPassword }),
        });

        const checkPwd = await res.json();
        
        if (checkPwd.length === 1) {
            setMsg({ message: 'Password updated!' });
        } else {
            setMsg({ message: 'The old password is incorrect!', isError: true });
        }

        setTimeout(() => {isLoading(false); setNewPassword(""); setOldPassword("");}, 2000);
        setTimeout(() => setMsg(''), 4000);
      }

    if(token !== null) {
        return (
            <HeaderFooterLayout title="BookOwl / Edit" description="This is the page where you edit your profile.">
                <main style={{background: `url(${bg.src})`,backgroundPositionX: 'center'}} className="relative h-[80vh] w-full">
                    <div className="absolute top-1/2 left-1/2 m-0 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center p-5">
                        <div className="max-w-sm">
                            <div className="bg-white shadow-xl rounded-lg py-3">
                                <Link href="/edit" passHref>
                                    <Image
                                        src={BackArrow}
                                        width={35}
                                        height={35}
                                        alt="Back-arrow"
                                        className="hover:scale-110 ml-0 mr-auto pl-2"                 
                                    />
                                </Link>
                                <div className="p-2">
                                    <Image
                                        src={User}
                                        width={90}
                                        height={90}
                                        alt="User"
                                        className="w-32 h-32 rounded-full mx-auto"
                                    />
                                </div>
                                <div className="p-2">
                                    <h3 className="text-center text-xl text-swamp-green font-black leading-8">Edit profile</h3>
                                    <form onSubmit={handleSubmit(onSubmit)} className="mt-5">
                                        <div className="mb-3">
                                            <label className="px-2 py-2 text-shingle-fawn-dark font-semibold">Old Password</label>
                                            <input 
                                                type="password" 
                                                {...register('oldPassword')}
                                                value={oldPassword}
                                                onChange={(e) => setOldPassword(e.target.value)}
                                                className={`form-control ${errors.oldPassword ? 'is-invalid' : ''} px-2 text-shingle-fawn-dark rounded-xl border-2 border-shingle-fawn w-full` }
                                            />
                                            <div className="invalid-feedback text-red-500 p-2">{errors.oldPassword?.message}</div>
                                        </div>
                                        <div className="mb-3">
                                            <label className="px-2 py-2 text-shingle-fawn-dark font-semibold">New Password</label>
                                            <input 
                                                type="password" 
                                                {...register('newPassword')}
                                                value={newPassword}
                                                onChange={(e) => setNewPassword(e.target.value)}
                                                className={`form-control ${errors.newPassword ? 'is-invalid' : ''} px-2 text-shingle-fawn-dark rounded-xl border-2 border-shingle-fawn w-full` }
                                            />
                                            <div className="invalid-feedback text-red-500 p-2">{errors.newPassword?.message}</div>
                                        </div>
                                        <div className="text-center mb-3">
                                            {loading ? 
                                            <div className="mt-8 flex items-center justify-center space-x-2 animate-bounce">
                                                <div className="w-5 h-5 bg-light-brown rounded-full"></div>
                                                <div className="w-5 h-5 bg-shingle-fawn rounded-full"></div>
                                                <div className="w-5 h-5 bg-shingle-fawn-dark rounded-full"></div>
                                            </div>
                                            : 
                                            <button className={` ${msg.message ? 'hidden' : 'visible'} uppercase text-sm sm:text-base font-bold rounded-full px-4 py-2 text-shingle-fawn-dark bg-red-500 hover:ring hover:ring-red-500 hover:ring-offset-2` }>
                                                Change Password
                                            </button>
                                            } 
                                            <div className={` ${msg.message && !loading ? 'visible' : 'hidden'} ${msg.isError ? 'text-red-500' : 'text-swamp-green'} font-semibold text-base sm:text-xl`}>
                                                    {msg.message}
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </HeaderFooterLayout>
        );
    } 
};

export default Password;