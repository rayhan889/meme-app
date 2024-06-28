import { getAllMemes } from "~/server/queries";
import { getServerSession } from "next-auth";
import { type Session } from "next-auth";
import { authOptions } from "~/server/auth";
import { AvatarImage, AvatarFallback, Avatar } from "~/components/ui/avatar";
import UploadMeme from "../compose/post/page";
import Image from "next/image";

const Home = async () => {
  const session: Session | null = await getServerSession(authOptions);

  const memePostsWithImages = await getAllMemes();

  function formatDate(createdAt: Date) {
    const date = new Date(createdAt);
    const now = new Date();

    const isToday =
      date.getTime() === now.getDate() &&
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear();
    const isYesterday =
      date.getTime() === now.getDate() - 1 &&
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear();

    if (isToday) {
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    } else if (isYesterday) {
      return "Yesterday";
    } else if (date.getFullYear() === now.getFullYear()) {
      return date.toLocaleDateString(undefined, {
        day: "numeric",
        month: "long",
      });
    } else {
      return date.toLocaleDateString(undefined, {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    }
  }

  return (
    <main className="flex h-full w-full flex-col items-center ">
      {/* Post input area */}
      {session && <UploadMeme />}
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
              className={`flex w-full flex-col items-center gap-y-4 border-b-[1px] border-neutral-800 p-5 ${i === memePostsWithImages.length - 1 && "mb-[5rem] lg:mb-0"}`}
            >
              <div className="items-items-start flex w-full gap-x-2">
                <Avatar className="flex h-12 w-12 items-center justify-center rounded-full">
                  <AvatarImage src={meme.authorPicture ?? ""} />
                  <AvatarFallback>{session?.user.name ?? ""}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <div className="flex items-center gap-x-2 text-lg font-bold">
                    {meme.author}{" "}
                    <i className="h-1 w-1 rounded-full bg-neutral-400" />
                    <span className="text-sm font-normal text-gray-400">
                      {formatDate(meme.createdAt)}
                    </span>
                  </div>
                  <div className="text-sm">{meme.description}</div>
                </div>
              </div>
              <div className="grid w-full grid-cols-2 gap-2">
                {meme.image.slice(0, 4).map((image, idx) => {
                  const isLast = idx === meme.image.length - 1;
                  const rest = meme.image.length - 4;
                  return (
                    <div
                      key={image.id}
                      className={`relative inline-block max-w-full ${(isLast && meme.image.length > 2) || meme.image.length === 1 ? "col-span-2 min-w-[256px]" : ""}`}
                    >
                      {idx === meme.image.length - 2 &&
                        meme.image.length > 4 && (
                          <span className="absolute flex h-full w-full items-center justify-center rounded-md bg-slate-950/60 text-xl">
                            + {rest}
                          </span>
                        )}
                      <Image
                        src={image.url ?? ""}
                        alt={image.name ?? ""}
                        className="h-[14rem] w-full rounded-md object-cover"
                        width={256}
                        height={144}
                      />
                    </div>
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
