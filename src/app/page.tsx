import { LuUser } from "react-icons/lu";

export default function HomePage() {
  const mockData = [
    {
      id: "1",
      title: "Meme 1",
      description: "This is a meme",
      image:
        "https://utfs.io/f/34a37097-3241-4474-ae16-b6236b52cd13-m2xtte.jpg",
      author: "@username",
      createdAt: "2022-01-01T00:00:00.000Z",
    },
    {
      id: "1",
      title: "Meme 2",
      description: "This is a meme",
      image:
        "https://utfs.io/f/139fdf3b-a171-421c-8645-79e3c4651b33-y0dyx0.jpg",
      author: "@username",
      createdAt: "2022-01-01T00:00:00.000Z",
    },
    {
      id: "1",
      title: "Meme 3",
      description: "This is a meme",
      image:
        "https://utfs.io/f/08d696f9-4b12-44ad-b615-b675d5eaa117-16py06.jpg",
      author: "@username",
      createdAt: "2022-01-01T00:00:00.000Z",
    },
  ];

  return (
    <main className="flex h-full w-full flex-col items-center ">
      {/* Post input area */}
      <div className="flex w-full items-center border-b-[1px] border-neutral-800 p-4">
        <div className="w-1/4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-200">
            <LuUser />
          </div>
        </div>
        <input
          type="text"
          placeholder="What's fun today?"
          className="mr-2 h-12 w-full border-none bg-transparent p-2 outline-none"
        />
      </div>
      {/* Memes posts list */}
      <div className="flex w-full flex-col">
        {mockData.map((meme) => (
          <div
            key={meme.id}
            className="flex w-full flex-col items-center gap-y-2 border-b-[1px] border-neutral-800 p-2"
          >
            <div className="flex w-full items-center gap-x-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-200">
                <LuUser />
              </div>
              <div className="flex flex-col">
                <div className="text-lg font-bold">
                  {meme.author}{" "}
                  <span className="text-sm font-normal text-gray-400">
                    {" "}
                    . {new Date(meme.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="text-sm">{meme.description}</div>
              </div>
            </div>
            <img
              src={meme.image}
              alt={meme.title}
              className="h-auto w-full rounded-md"
            />
          </div>
        ))}
      </div>
    </main>
  );
}
