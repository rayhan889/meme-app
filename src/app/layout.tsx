import "~/styles/globals.css";

import { Poppins } from "next/font/google";

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${poppins.className}`}>
      <body className="h-screen bg-slate-950 text-white">
        <div className="container mx-auto h-full max-w-6xl xl:px-32">
          <div className="grid h-full grid-cols-4">
            <div className="col-span-3 border-x-[1px] border-neutral-800 lg:col-span-2">
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
