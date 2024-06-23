import { InferSelectModel } from "drizzle-orm";
import { encode, decode } from "next-auth/jwt";
import { env } from "~/env";
import { users } from "~/server/db/schema";

export type User = InferSelectModel<typeof users>;
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface AuthUser extends Omit<User, "Password"> {
  name: string | null | undefined;
}

export const tokenOneDay = 24 * 60 * 60;
export const tokenOnWeek = tokenOneDay * 7;

const createJWT = (token: AuthUser, duration: number) =>
  encode({ token, secret: env.JWT_SECRET, maxAge: duration });

export const jwtHelper = {
  createAccessToken: (user: AuthUser) => createJWT(user, tokenOneDay),
  createRefreshToken: (user: AuthUser) => createJWT(user, tokenOnWeek),
  verifyToken: (token: string) => decode({ token, secret: env.JWT_SECRET }),
};
