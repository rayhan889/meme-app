"use client";

import Link from "next/link";
import { LuHome, LuSearch, LuLogOut, LuLogIn, LuUpload } from "react-icons/lu";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "~/components/ui/button";

const Sidebar = () => {
  const { data: session } = useSession();

  const itemLinks = [
    {
      name: "Home",
      href: "/home",
      icon: <LuHome />,
    },
    {
      name: "Search",
      href: "/search",
      icon: <LuSearch />,
    },
  ];

  return (
    <div className="col-span-1 mt-4 h-full pr-4 md:pr-8">
      <div className="flex flex-col items-end">
        <div className="space-y-2 lg:w-[230px]">
          {itemLinks.map((item) => (
            <Link key={item.name} href={item.href}>
              {/* mobile */}
              <div className="relative flex h-14 w-14 cursor-pointer items-center justify-center rounded-lg p-4 hover:bg-slate-300 hover:bg-opacity-10 lg:hidden">
                {item.icon}
              </div>
              {/* desktop */}
              <div className="relative hidden w-full cursor-pointer items-center gap-x-4 rounded-lg p-4 hover:bg-slate-300 hover:bg-opacity-10 lg:flex">
                {item.icon}
                <span className="hidden text-lg font-semibold lg:block">
                  {item.name}
                </span>
              </div>
            </Link>
          ))}
          {!session ? (
            <>
              <button
                className="relative flex h-14 w-14 cursor-pointer items-center justify-center rounded-lg p-4 hover:bg-slate-300 hover:bg-opacity-10 lg:hidden"
                onClick={() => signIn()}
              >
                <LuLogIn />
              </button>
              <button
                className="relative hidden w-full cursor-pointer items-center gap-x-4 rounded-lg p-4 hover:bg-slate-300 hover:bg-opacity-10 lg:flex"
                onClick={() => signIn()}
              >
                <LuLogIn />
                <span className="hidden text-lg font-semibold lg:block">
                  Sign In
                </span>
              </button>
            </>
          ) : (
            <>
              <button
                className="relative flex h-14 w-14 cursor-pointer items-center justify-center rounded-lg p-4 hover:bg-slate-300 hover:bg-opacity-10 lg:hidden"
                onClick={() => signOut()}
              >
                <LuLogOut />
              </button>
              <button
                className="relative hidden w-full cursor-pointer items-center gap-x-4 rounded-lg p-4 hover:bg-slate-300 hover:bg-opacity-10 lg:flex"
                onClick={() => signOut()}
              >
                <LuLogOut />
                <span className="hidden text-lg font-semibold lg:block">
                  Sign Out
                </span>
              </button>
            </>
          )}
          <Button className="bg-primary h-12 w-12 rounded-full text-lg font-semibold tracking-wide lg:w-full">
            <span className="hidden lg:block">Upload</span>
            <LuUpload className="h-4 w-4 lg:hidden" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
