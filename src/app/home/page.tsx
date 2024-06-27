import { LuUser } from "react-icons/lu";
import { getAllMemes } from "~/server/queries";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { type Session } from "next-auth";
import { authOptions } from "~/server/auth";
import { AvatarImage, AvatarFallback, Avatar } from "~/components/ui/avatar";

const Home = async () => {
  const session: Session | null = await getServerSession(authOptions);

  const memePostsWithImages = await getAllMemes();

  return (
    <main className="flex h-full w-full flex-col items-center ">
      {/* Post input area */}
      <div className="flex w-full items-center border-b-[1px] border-neutral-800 p-4">
        <div className="w-1/4">
          {!session ? (
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-200">
              <LuUser />
            </div>
          ) : (
            <Image
              src={session.user.image ?? ""}
              alt={session.user.name ?? ""}
              className="items-center justify-center rounded-full"
              width={64}
              height={64}
            />
          )}
        </div>
        <input
          type="text"
          placeholder="What's fun today?"
          className="mr-2 h-12 w-full border-none bg-transparent p-2 outline-none"
        />
      </div>
      {/* Memes posts list */}
      <div className="flex w-full flex-col">
        {memePostsWithImages.length === 0 ? (
          <div className="flex w-full items-center justify-center p-4">
            <span className="text-gray-400">No posts found</span>
          </div>
        ) : (
          memePostsWithImages.map((meme, i) => (
            <div
              key={meme.id + "-" + i}
              className="flex w-full flex-col items-center gap-y-2 border-b-[1px] border-neutral-800 p-2"
            >
              <div className="flex w-full items-center gap-x-2">
                <Avatar className="flex h-12 w-12 items-center justify-center rounded-full">
                  <AvatarImage src={meme.authorPicture ?? ""} />
                  <AvatarFallback>{session?.user.name ?? ""}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <div className="text-lg font-bold">
                    {meme.author}{" "}
                    <span className="text-sm font-normal text-gray-400">
                      {" "}
                      . {new Date(meme.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="text-sm">{meme.description}</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {meme.image.map((image, idx) => {
                  const isLast = idx === meme.image.length - 1;
                  return (
                    <img
                      key={image.id}
                      src={image.url ?? ""}
                      alt={image.name ?? ""}
                      className={`h-[14rem] w-full rounded-md object-cover ${(isLast && meme.image.length > 2) || meme.image.length === 1 ? "col-span-2 min-w-[256px]" : ""}`}
                    />
                  );
                })}
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
};

export default Home;
