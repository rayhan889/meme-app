import "~/styles/globals.css";

import { Poppins } from "next/font/google";
import Sidebar from "./_components/layout/Sidebar";
import { getServerSession } from "next-auth";
import SessionProvider from "./_components/SessionProvider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal"],
});

export const metadata = {
  title: "Meme App",
  description: "Create and share memes",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  const session = await getServerSession();
  return (
    <html lang="en" className={`${poppins.className}`}>
      <body className="h-screen bg-slate-950 text-white">
        <div className="container mx-auto h-full max-w-6xl px-0 xl:px-32">
          <div className="flex h-full justify-center lg:grid lg:grid-cols-4">
            <SessionProvider session={session}>
              <Sidebar />
              <div className="col-span-3 border-x-[1px] border-neutral-800 lg:col-span-2">
                {children}
                {modal}
                <div id="modal-root" />
              </div>
            </SessionProvider>
          </div>
        </div>
      </body>
    </html>
  );
}
