"use client";

import Link from "next/link";
import { LuHome, LuSearch } from "react-icons/lu";

const Sidebar = () => {
  const itemLinks = [
    {
      name: "Home",
      href: "/",
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
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center"
            >
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
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
