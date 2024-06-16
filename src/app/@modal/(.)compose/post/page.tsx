import { Modal } from "./modal";
import { getServerSession } from "next-auth";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import UploadImage from "~/app/_components/UploadImage";

export default async function UploadMemeModal() {
  const session = await getServerSession();

  return (
    <Modal>
      <div className="mt-10 flex w-full flex-col gap-y-4">
        <div className="flex flex-row items-center justify-start gap-x-4 border-b-[1px] border-neutral-800 pb-4">
          <Avatar>
            <AvatarImage src={session?.user.image ?? ""} />
            <AvatarFallback>{session?.user.name ?? ""}</AvatarFallback>
          </Avatar>
          <input
            type="text"
            placeholder="What's fun today?"
            className="mr-2 h-12 w-full border-none bg-transparent p-2 outline-none"
          />
        </div>
        <div className="flex w-full items-center">
          <div className="flex flex-1 items-center">
            <UploadImage />
          </div>
          <Button>Post</Button>
        </div>
      </div>
    </Modal>
  );
}
