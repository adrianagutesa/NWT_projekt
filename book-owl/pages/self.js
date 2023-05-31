import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Link from "next/link";
import Image from "next/image";

import useAuth from '../hooks/useAuth';
import api from '../api';

import HeaderFooterLayout from "../layouts/HeaderFooterLayout";
import bg from "../public/background.webp";
import User from "../public/account2.png";

const Self = () => {
    const { token } = useAuth();
    const { removeAuth } = useAuth();
    const [currentUser, setCurrentUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
        if (!token) {
            return;
        }

        api.self(token).then(({ user }) => {
            setCurrentUser(user);
        });
    }, [token])

    if(currentUser !== null) {
        return (
            <HeaderFooterLayout title="BookOwl / Self" description="This is the page where you end up after you logged in.">
                <main style={{background: `url(${bg.src})`,backgroundPositionX: 'center'}} className="relative h-[80vh] w-full">
                    <div class="absolute top-1/2 left-1/2 m-0 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center p-5">

                    <div class="max-w-xs">
                        <div class="bg-white shadow-xl rounded-lg py-3">
                            <div class="photo-wrapper p-2">
                                <Image
                                src={User}
                                width={90}
                                height={90}
                                alt="User"
                                className="w-32 h-32 rounded-full mx-auto"
                                />
                            </div>
                            <div class="p-2">
                                <h3 class="text-center text-xl text-swamp-green font-black leading-8">My profile</h3>
        
                                <table class="text-lg my-3">
                                    <tbody>
                                        <tr>
                                            <td class="px-2 py-2 text-shingle-fawn-dark font-semibold">Username</td>
                                            <td class="px-2 py-2">{currentUser[0].username}</td>
                                        </tr>
                                        <tr>
                                            <td class="px-2 py-2 text-shingle-fawn-dark font-semibold">Email</td>
                                            <td class="px-2 py-2">{currentUser[0].email}</td>
                                        </tr>
                                    </tbody>
                                </table>

                                <div class="text-center my-3">
                                    <Link href="/shop" passHref>
                                        <button className="uppercase text-sm sm:text-base rounded-full px-4 py-2 text-shingle-fawn-dark bg-swamp-green hover:ring hover:ring-swamp-green hover:ring-offset-2">Shop now</button>
                                    </Link>
                                </div>

                            </div>
                        </div>
                    </div>

                    </div>
                </main>

            </HeaderFooterLayout>
        );
        
    }
    
};

export default Self;




            {/* <p className="text-shingle-fawn text-lg my-2">Let us help you find something to read.</p>
            <Link href="/shop" passHref>
                <button className="animate-pulse-slow hover:animate-none transition-colors duration-300 bg-swamp-green rounded-full px-7 py-4 uppercase text-xl hover:ring hover:ring-swamp-green hover:ring-offset-2 text-shingle-fawn-dark mt-4">Shop now</button>
            </Link>
            <p className="text-shingle-fawn text-lg mt-12">If you want to log out of your account click the button below.</p>
            <button className="rounded-full px-7 py-4 uppercase text-lg hover:ring hover:ring-swamp-green hover:ring-offset-2 text-shingle-fawn-dark mt-4" 
             onClick={() => {
                            removeAuth();
                            router.push('/');
                    }}>Logout</button> */}
