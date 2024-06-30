import { getAllMemes } from "~/server/queries";
import { getServerSession } from "next-auth";
import { type Session } from "next-auth";
import { authOptions } from "~/server/auth";
import UploadMeme from "../compose/post/page";
import PostCard from "../_components/PostCard";

export function formatDate(createdAt: Date) {
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

const Home = async () => {
  const session: Session | null = await getServerSession(authOptions);

  const memePostsWithImages = await getAllMemes();

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
            <PostCard
              key={meme.id}
              meme={meme}
              idx={i}
              length={memePostsWithImages.length}
            />
          ))
        )}
      </div>
    </main>
  );
};

export default Home;
