"use client";

import React from "react";
import { useSession } from "next-auth/react";

const Home = () => {
  const { data: session } = useSession();

  if (!session) {
    return <div>Please log in</div>;
  }

  return <div>{session.user.name}</div>;
};

export default Home;
