"use client";

import { type User } from "../[username]/page";
import { LuArrowLeft, LuCalendar } from "react-icons/lu";
import { useRouter } from "next/navigation";
import { AvatarImage, AvatarFallback, Avatar } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import Image from "next/image";

const UserProfile = ({ user }: { user: User }) => {
  const router = useRouter();

  const mockBannerUrl =
    "https://utfs.io/f/f0fd9547-9d65-41bf-a5b2-d4f6ba28736f-liq6no.jpg";

  return (
    <div className="flex flex-col">
      <div className="z-50 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-slate-950/50 p-3 text-2xl">
        <LuArrowLeft onClick={() => router.back()} />
      </div>
      <Image
        width={500}
        height={300}
        src={mockBannerUrl}
        alt="banner"
        quality={100}
        className="absolute inset-0 h-[12rem] w-full object-cover"
      />
      <div className="absolute top-32 flex w-full max-w-[24rem] items-center justify-between md:max-w-[43rem] lg:max-w-[28rem]">
        <div className="flex flex-col justify-start gap-y-4">
          <Avatar className="flex h-[8rem] w-[8rem] cursor-pointer items-center justify-center rounded-full transition transition-colors hover:bg-gray-900/50">
            <AvatarImage src={user?.image ?? ""} />
            <AvatarFallback>{user?.name}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col justify-start">
            <span className="text-xl font-bold">{user?.name}</span>
            <span className="text-sm text-gray-400">{user?.email}</span>
          </div>
          <span className="flex items-center gap-x-2 text-sm text-gray-400">
            <LuCalendar />
            Joined October 2022
          </span>
        </div>
        <Button
          variant={"outline"}
          className="rounded-full border-gray-500 bg-transparent hover:bg-gray-900 hover:text-white"
        >
          Edit Profile
        </Button>
      </div>
    </div>
  );
};

export default UserProfile;
