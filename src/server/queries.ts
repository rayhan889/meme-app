import "server-only";
import { eq, inArray } from "drizzle-orm";
import { db } from "~/server/db";
import { images, posts, users } from "~/server/db/schema";
import { v4 as uuidv4 } from "uuid";

export type MemePayload = {
  description: string;
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
        author: users.name,
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
        author: users.name,
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

export const createMemePost = async (data: MemePayload, userId: string) => {
  const postId = uuidv4();

  // let user = await db.select(users).where({});

  await db.insert(posts).values({
    id: postId,
    description: data.description,
    userId,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  if (data.images && data.images.length > 0) {
    await db.insert(images).values(
      data.images.map((image) => ({
        id: uuidv4(),
        name: image.name,
        url: image.url,
        postId: postId,
        createdAt: new Date(),
        updatedAt: new Date(),
      })),
    );
  }
};
