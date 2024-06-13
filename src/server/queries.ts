import "server-only";
import { eq, inArray } from "drizzle-orm";
import { db } from "~/server/db";
import { images, posts, users } from "~/server/db/schema";

export const getMemes = async () => {
  const memePostsQuery = await db
    .select({
      id: posts.id,
      title: posts.title,
      description: posts.description,
      author: users.fullName,
      createdAt: posts.createdAt,
    })
    .from(posts)
    .leftJoin(users, eq(posts.userId, "9305b1ad-4c32-4736-ba7d-e8428530f0e7"));

  const imagesQuery = await db
    .select({
      id: images.id,
      name: images.name,
      url: images.url,
      postId: images.postId,
    })
    .from(images)
    .where(
      inArray(
        images.postId,
        memePostsQuery.map((meme) => meme.id),
      ),
    );

  return memePostsQuery.map((meme) => ({
    ...meme,
    image: imagesQuery.filter((image) => image.postId === meme.id),
  }));
};
