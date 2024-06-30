import { type MemeWithAuthorAndImages } from "../[username]/page";
import { AvatarImage, AvatarFallback, Avatar } from "~/components/ui/avatar";
import Image from "next/image";
import { formatDate } from "../home/page";

const PostCard = ({
  meme,
  idx,
  length,
}: {
  meme: MemeWithAuthorAndImages;
  idx?: number;
  length?: number;
}) => {
  return (
    <div
      className={`flex w-full flex-col items-center gap-y-4 border-b-[1px] border-neutral-800 p-5 ${idx === length! - 1 && "mb-[5rem] lg:mb-0"}`}
    >
      <div className="items-items-start flex w-full gap-x-2">
        <Avatar className="flex h-12 w-12 items-center justify-center rounded-full">
          <AvatarImage src={meme.authorPicture ?? ""} />
          <AvatarFallback>{meme.author ?? ""}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <div className="flex items-center gap-x-2 text-lg font-bold">
            {meme.author} <i className="h-1 w-1 rounded-full bg-neutral-400" />
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
              {idx === meme.image.length - 2 && meme.image.length > 4 && (
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
  );
};

export default PostCard;
