import { getServerSession } from "next-auth";
import { authOptions } from "~/server/auth";
import { createMemePost } from "~/server/queries";
import { type MemePayload } from "~/server/queries";

export async function POST(req: Request, res: Response) {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const session = await getServerSession(authOptions);
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  /* eslint-disable @typescript-eslint/no-unsafe-assignment */
  const { description, images }: MemePayload = await req.json();

  if (!description || !images || !Array.isArray(images)) {
    return new Response("Invalid request", { status: 400 });
  }

  try {
    await createMemePost({ description, images }, session.user.userId);
    return new Response("Meme created", { status: 201 });
  } catch (error) {
    return new Response("Error creating meme", { status: 500 });
  }
}
