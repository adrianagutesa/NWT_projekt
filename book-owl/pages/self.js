import { useState, useEffect } from 'react';
import Link from "next/link";
import Image from "next/image";

import useAuth from '../hooks/useAuth';
import api from '../api';

import HeaderFooterLayout from "../layouts/HeaderFooterLayout";
import bg from "../public/background.webp";
import User from "../public/account2.png";
import UserEdit from "../public/user-edit.png";

const Self = () => {
    const { token } = useAuth();
    const [currentUser, setCurrentUser] = useState(null);
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

    if(currentUser !== null) {
        return (
            <HeaderFooterLayout title="BookOwl / Self" description="This is the page where you end up after you logged in.">
                <main style={{background: `url(${bg.src})`,backgroundPositionX: 'center'}} className="relative h-[80vh] w-full">
                    <div className="absolute top-1/2 left-1/2 m-0 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center p-5">
                        <div className="max-w-xs">
                            <div className="bg-white shadow-xl rounded-lg py-3">
                                <Link href="/edit" passHref>
                                    <Image
                                        src={UserEdit}
                                        width={30}
                                        height={30}
                                        alt="User-edit"
                                        className="hover:scale-110 mr-0 ml-auto pr-2"                 
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
                                    <h3 className="text-center text-xl text-swamp-green font-black leading-8">My profile</h3>
            
                                    <table className="text-lg my-3">
                                        <tbody>
                                            <tr>
                                                <td className="px-2 py-2 text-shingle-fawn-dark font-semibold">Username</td>
                                                <td className="px-2 py-2 text-shingle-fawn-dark">{currentUser.username}</td>
                                            </tr>
                                            <tr>
                                                <td className="px-2 py-2 text-shingle-fawn-dark font-semibold">Email</td>
                                                <td className="px-2 py-2 text-shingle-fawn-dark">{currentUser.email}</td>
                                            </tr>
                                        </tbody>
                                    </table>

                                    <div className="text-center my-3">
                                        <Link href="/shop" passHref>
                                            <button className="uppercase text-sm sm:text-base rounded-full px-4 py-2 text-shingle-fawn-dark bg-swamp-green hover:ring hover:ring-swamp-green hover:ring-offset-2">
                                                Shop now
                                            </button>
                                        </Link>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </main>

            </HeaderFooterLayout>
        );
        
    };
    
};

export default Self;