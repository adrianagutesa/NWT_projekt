import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import HeaderFooterLayout from "../../layouts/HeaderFooterLayout";
import useAuth from "../../hooks/useAuth";

import bg from "../../public/background.webp";
import User from "../../public/account2.png";
import BackArrow from "../../public/back-arrow.png";
import Change from "../../public/change.png";
import Password from "../../public/password.png";
import Delete from "../../public/delete.png";

const EditPage = () => {
    const { token } = useAuth();
    const router = useRouter();

    if(token !== null) {
        return (
            <HeaderFooterLayout title="BookOwl / Edit" description="This is the page where you edit your profile.">
                <main style={{background: `url(${bg.src})`,backgroundPositionX: 'center'}} className="relative h-[80vh] w-full">
                    <div className="absolute top-1/2 left-1/2 m-0 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center p-5">
                        <div className="max-w-sm">
                            <div className="bg-white shadow-xl rounded-lg py-3">
                                <Link href="/self" passHref>
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
                                    <ul className="mt-5 px-8 text-shingle-fawn text-xl">
                                        <li className="pb-2 font-bold hover:underline cursor-pointer">
                                            <Link href={`/edit/username`} className="flex gap-x-2 justify-evenly items-center">
                                                Change username
                                                <Image 
                                                    src={Change}
                                                    width={30}
                                                    height={30}
                                                    alt="Change username"
                                                />
                                            </Link>
                                        </li>
                                        <li className="pb-2 font-bold hover:underline cursor-pointer">
                                            <Link href={`/edit/password`} className="flex gap-x-2 justify-evenly items-center">
                                                Change password
                                                <Image 
                                                    src={Password}
                                                    width={30}
                                                    height={30}
                                                    alt="Change password"
                                                />
                                            </Link>
                                        </li>
                                        <li className="pb-2 font-bold hover:underline cursor-pointer">
                                            <Link href={`/edit/delete`} className="flex gap-x-2 justify-evenly items-center">
                                                Delete account
                                                <Image 
                                                    src={Delete}
                                                    width={25}
                                                    height={25}
                                                    alt="X"
                                                />
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </HeaderFooterLayout>
        );
    } 
};

export default EditPage;