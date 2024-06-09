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
              className="flex w-full cursor-pointer items-center  justify-start gap-x-2 rounded-full p-4 text-lg font-medium hover:bg-zinc-700"
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
