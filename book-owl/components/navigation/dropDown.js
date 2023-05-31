import Link from "next/link";

import useAuth from "../../hooks/useAuth";

const DropDown = () => {
    const { token } = useAuth();
    const { removeAuth } = useAuth();

    if(token) {
        return (
            <div className="relative">
                <div className="absolute md:right-0 md:left-auto left-0 z-10 w-44 mt-2 origin-top-right bg-swamp-green border border-shingle-fawn rounded-md">
                    <div className="p-2">
                        <Link
                            href="/self"
                            className="block uppercase px-4 py-2 text-base text-shingle-fawn rounded-lg hover:bg-[#ADB698] text-center hover:font-bold"
                        >
                            My page
                        </Link>
                        <Link
                            href="/"
                            className="block px-4 py-2 text-base text-shingle-fawn rounded-lg hover:bg-[#ADB698] text-center hover:font-bold"
                        >
                            <button
                                onClick={() => {
                                    removeAuth();
                                }}
                            >
                                Log out
                            </button>                    
                        </Link>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div className="relative">
                <div className="absolute md:right-0 md:left-auto left-0 z-10 w-44 mt-2 origin-top-right bg-swamp-green border border-shingle-fawn rounded-md">
                    <div className="p-2">
                        <Link
                            href="/login"
                            className="block uppercase px-4 py-2 text-base text-shingle-fawn rounded-lg hover:bg-[#ADB698] text-center hover:font-bold"
                        >
                            Log in
                        </Link>
                        <Link
                            href="/registration"
                            className="block uppercase px-4 py-2 text-base text-shingle-fawn rounded-lg hover:bg-[#ADB698] text-center hover:font-bold"
                        >
                            Sign up
                        </Link>
                    
                    </div>
                </div>
            </div>
        );
    }
};

export default DropDown;