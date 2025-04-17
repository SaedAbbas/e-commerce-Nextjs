"use client";
import HeaderHook from "@/pagesHooks/headerHook";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const Header = () => {
  const { handleLogOut, user } = HeaderHook();

  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null; // نمنع الريندر لحد ما نكون على الكلينت

  return (
    <header className="border-b-2 sticky top-0 z-10 border-amber-50 bg-gradient-to-tr from-gray-300 via-gray-200 to-gray-300">
      <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-6 sm:px-8 lg:px-10">
        {/* اللوجو */}
        <Link href="/" className="relative w-[35px] h-[35px]">
          <Image
            src="/logo.svg"
            priority
            fill
            alt="logo"
            className="transition-all duration-300 hover:brightness-110"
          />
        </Link>

        {/* المحتوى */}
        <div className="flex flex-1 items-center justify-end md:justify-between">
          {/* اللينكات */}
          <nav aria-label="Global" className="hidden md:block">
            <ul className="flex items-center gap-6 text-sm">
              {["Home", "Explore", "Projects", "About us", "Contact us"].map(
                (item, index) => (
                  <li key={index}>
                    <a
                      className="text-gray-600 font-medium transition-all duration-300 hover:text-blue-600 hover:underline underline-offset-6"
                      href="#"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </nav>

          {/* معلومات المستخدم أو أزرار الدخول */}
          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-white text-sm font-semibold text-gray-700 shadow-sm border border-gray-300">
                  {user.username}
                </span>
                <AlertDialog>
                  <AlertDialogTrigger className="rounded-md cursor-pointer bg-red-500 text-white text-sm font-semibold px-4 py-2 shadow-md hover:bg-red-600 active:scale-95 transition-all duration-200">
                  Logout
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleLogOut} className='cursor-pointer'>
                        Logout
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            ) : (
              <div className="sm:flex sm:gap-4">
                <Link
                  className="block rounded-md bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:bg-blue-700 active:scale-95"
                  href="/login"
                >
                  Login
                </Link>

                <Link
                  className="hidden rounded-md border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-600 transition-all duration-300 bg-white hover:text-gray-700 active:scale-95 sm:block"
                  href="/register"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
