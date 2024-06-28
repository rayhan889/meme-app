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
    <>
      {session && (
        <Button
          className="fixed bottom-28 right-12 z-50 h-16 w-16 rounded-full bg-primary lg:hidden"
          asChild
        >
          <Link href={"/compose/post"}>
            <LuUpload className="h-4 w-4" />
          </Link>
        </Button>
      )}
      <div className="fixed bottom-0 left-0 right-0 z-50 h-20 w-full border-t border-neutral-800 bg-slate-950/75 p-4 backdrop-blur-md lg:hidden">
        <div className="container flex justify-center">
          {itemLinks.map((item) => (
            <Link key={item.name} href={item.href}>
              <div className="relative flex h-14 w-14 cursor-pointer items-center justify-center rounded-lg p-4 hover:bg-slate-300 hover:bg-opacity-10 lg:hidden">
                {item.icon}
              </div>
            </Link>
          ))}
          {!session ? (
            <button
              className="relative flex h-14 w-14 cursor-pointer items-center justify-center rounded-lg p-4 hover:bg-slate-300 hover:bg-opacity-10 lg:hidden"
              onClick={() => signIn()}
            >
              <LuLogIn />
            </button>
          ) : (
            <button
              className="relative flex h-14 w-14 cursor-pointer items-center justify-center rounded-lg p-4 hover:bg-slate-300 hover:bg-opacity-10 lg:hidden"
              onClick={() => signOut()}
            >
              <LuLogOut />
            </button>
          )}
        </div>
      </div>
      <div className="col-span-1 mt-4 hidden h-full pr-4 md:pr-8 lg:block">
        <div className="sticky top-4 flex flex-col items-end">
          <div className="space-y-2 lg:w-[230px]">
            {itemLinks.map((item) => (
              <Link key={item.name} href={item.href}>
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
              <button
                className="relative hidden w-full cursor-pointer items-center gap-x-4 rounded-lg p-4 hover:bg-slate-300 hover:bg-opacity-10 lg:flex"
                onClick={() => signIn()}
              >
                <LuLogIn />
                <span className="hidden text-lg font-semibold lg:block">
                  Sign In
                </span>
              </button>
            ) : (
              <button
                className="relative hidden w-full cursor-pointer items-center gap-x-4 rounded-lg p-4 hover:bg-slate-300 hover:bg-opacity-10 lg:flex"
                onClick={() => signOut()}
              >
                <LuLogOut />
                <span className="hidden text-lg font-semibold lg:block">
                  Sign Out
                </span>
              </button>
            )}
            {session && (
              <Button className="h-12 w-full rounded-full bg-primary" asChild>
                <Link href={"/compose/post"}>
                  <span className="text-lg font-semibold tracking-wide">
                    Upload
                  </span>
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
