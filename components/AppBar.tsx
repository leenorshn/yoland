import Link from "next/link";
import { useAuth } from "../utils/AuthContext";

/* This example requires Tailwind CSS v2.0+ */
export default function AppBar() {

    const { currentUser, logout } = useAuth();
    return (
        <div className="md:flex md:items-center print:hidden md:justify-between bg-black py-4 px-20">
            <div className="min-w-0 flex-1">
                <Link href="/">
                    <h2 className="text-xl cursor-pointer font-medium leading-7 text-white sm:truncate sm:text-3xl sm:tracking-tight">
                        Gestion clinique
                    </h2>
                </Link>
            </div>
            <div className="mt-4 flex md:mt-0 md:ml-4">
                <Link href="/">
                    <a
                        type="button"
                        className="inline-flex items-center rounded-md px-8 py-2 text-sm font-medium text-white"
                    >
                        facturation
                    </a>
                </Link>
                <Link href="/sortie">
                    <a
                        type="button"
                        className="ml-3 inline-flex items-center px-8 py-2 text-sm font-medium text-white "
                    >
                        Charges
                    </a>
                </Link>
                <button
                    onClick={() => logout()}
                    type="button"
                    className="ml-3 inline-flex items-center rounded-md border border-transparent bg-red-600   px-8 py-2 text-sm font-medium text-white "
                >
                    deconnexion
                </button>
            </div>
        </div>
    )
}
