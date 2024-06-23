import "server-only";
import { eq, inArray } from "drizzle-orm";
import { db } from "~/server/db";
import { images, posts, users } from "~/server/db/schema";

export type MemePayload = {
  description: string;
  userId: string;
  images: {
    name: string;
    url: string;
  }[];
};

// All memes
export const getAllMemes = async () => {
  try {
    const memePostsQuery = await db
      .select({
        id: posts.id,
        description: posts.description,
        author: users.fullName,
        createdAt: posts.createdAt,
      })
      .from(posts)
      .leftJoin(users, eq(posts.userId, users.id));

    if (memePostsQuery.length === 0) {
      return [];
    }

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
  } catch (error) {
    console.error("Error fetching memes:", error);
    throw error;
  }
};

// User posted memes only
export const getMemes = async (userId?: string) => {
  try {
    const memePostsQuery = await db
      .select({
        id: posts.id,
        description: posts.description,
        author: users.fullName,
        createdAt: posts.createdAt,
      })
      .from(posts)
      .leftJoin(users, eq(posts.userId, users.id))
      .where(eq(posts.userId, userId ?? ""));

    if (memePostsQuery.length === 0) {
      return [];
    }

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
  } catch (error) {
    console.error("Error fetching memes:", error);
    throw error;
  }
};
