import { getUser, getMemes } from "~/server/queries";
import { type users, type posts as memes } from "~/server/db/schema";
import { type InferSelectModel } from "drizzle-orm";
import UserProfile from "../_components/UserProfile";
import PostCard from "../_components/PostCard";

export type User = InferSelectModel<typeof users>;
export type Meme = InferSelectModel<typeof memes>;
export type MemeWithAuthorAndImages = {
  image: {
    id: string;
    name: string | null;
    url: string | null;
    postId: string;
  }[];
  id: string;
  description: string;
  author: string | null;
  authorPicture: string | null;
  createdAt: Date;
};

export default async function UserPage() {
  const user: User | null | undefined = await getUser();
  const memes: MemeWithAuthorAndImages[] = await getMemes(user?.id);

  return (
    <>
      {user && (
        <main className="relative flex h-full max-w-full flex-col p-5">
          <UserProfile user={user} />
          <div className="absolute left-0 right-0 top-[24rem]">
            <span className="px-5 text-white">
              {memes.length} <span className="text-gray-400">Posts</span>
            </span>
            {memes.map((meme, idx) => (
              <PostCard
                key={meme.id}
                meme={meme}
                idx={idx}
                length={memes.length}
              />
            ))}
          </div>
        </main>
      )}
    </>
  );
}
