"use client";

import { Modal } from "./modal";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { useUploadThing } from "~/utils/uploadthing";
import { LuImage, LuX, LuSendHorizonal } from "react-icons/lu";
import { useState, useEffect, useRef } from "react";
import { type ClientUploadedFileData } from "uploadthing/types";
import { LoadingSpinnerSVG } from "~/components/ui/LoadingSpinner";
import { Textarea } from "~/components/ui/textarea";
import { useRouter } from "next/navigation";

// inferred input off useUploadThing
type Input = Parameters<typeof useUploadThing>;

const useUploadThingInputProps = (...args: Input) => {
  const $ut = useUploadThing(...args);

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const selectedFiles = Array.from(e.target.files);
    const result = await $ut.startUpload(selectedFiles);

    console.log("uploaded files", result);
    // TODO: persist result in state maybe?
  };

  return {
    inputProps: {
      onChange,
      multiple: ($ut.permittedFileInfo?.config?.image?.maxFileCount ?? 1) > 1,
      accept: "image/*",
    },
    isUploading: $ut.isUploading,
  };
};

export default function UploadMemeModal() {
  const pathname = usePathname();
  const router = useRouter();
  const currentRoute = pathname + "/compose/post";
  const [description, setDescription] = useState<string>("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [selectedImages, setSelectedImages] = useState<
    ClientUploadedFileData<{
      uploadedBy: string;
    }>[]
  >([]);

  const { data: session } = useSession();
  const { inputProps, isUploading: isImageUploading } =
    useUploadThingInputProps("imageUploader", {
      onClientUploadComplete: (result) => {
        setSelectedImages((prevImages) => [...prevImages, ...result]);
      },
    });

  useEffect(() => {
    if (pathname !== currentRoute) {
      setSelectedImages([]);
      setDescription("");
    }
  }, [pathname, currentRoute]);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [description]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const handleUpload = async () => {
    const payload = {
      description,
      images: selectedImages.map((image) => ({
        url: image.url,
        name: image.name,
      })),
    };

    if (!session) return;

    try {
      const response = await fetch("/api/meme", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.user.token}`,
        },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        router.back();
        router.refresh();
        setDescription("");
        setSelectedImages([]);
      }
    } catch (error) {
      console.error("error", error);
    }
  };

  return (
    <Modal>
      <div className="mt-10 flex w-full flex-col gap-y-4">
        <div className="flex flex-row items-start justify-start gap-x-4 border-b-[1px] border-neutral-800 pb-4">
          <Avatar>
            <AvatarImage src={session?.user.image ?? ""} />
            <AvatarFallback>{session?.user.name ?? ""}</AvatarFallback>
          </Avatar>
          <div className="flex flex w-full flex-col">
            <Textarea
              ref={textareaRef}
              value={description}
              onChange={handleTextChange}
              placeholder="What's fun today?"
              className="mr-2 w-full flex-grow resize-none overflow-hidden border-none bg-transparent p-2 text-lg focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-opacity-0 focus-visible:ring-offset-0"
              style={{ height: "auto" }}
            />
            {isImageUploading && selectedImages.length === 0 && (
              <div className="mt-4 flex h-64 w-full flex-col items-center justify-center gap-y-4">
                <LoadingSpinnerSVG />
                <span className="text-sm text-neutral-400">
                  Loading images...
                </span>
              </div>
            )}
            {selectedImages.length > 0 && (
              <div className="image-wrapper mt-4 flex max-w-full gap-x-3 overflow-x-auto overflow-y-hidden whitespace-nowrap">
                {selectedImages.map((image) => (
                  <div
                    key={image.key}
                    className={`relative inline-block h-64 ${selectedImages.length > 1 ? "min-w-[256px]" : "w-full"}`}
                  >
                    <button
                      className="absolute right-2 top-2 rounded-full bg-neutral-800/70 p-2 text-lg"
                      onClick={() =>
                        setSelectedImages(
                          selectedImages.filter((i) => i.key !== image.key),
                        )
                      }
                    >
                      <LuX />
                    </button>
                    <img
                      className="h-full w-full rounded-lg object-cover"
                      src={image.url}
                      alt={image.name}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="flex w-full items-center">
          <div className="flex flex-1 items-center">
            <label
              htmlFor="upload-file"
              className="flex cursor-pointer items-center gap-x-2 text-white"
            >
              <LuImage className="h-6 w-6 text-primary" />
              <input
                type="file"
                id="upload-file"
                className="sr-only"
                {...inputProps}
              />
            </label>
          </div>
          <Button
            className="flex items-center gap-x-2 rounded-full"
            onClick={handleUpload}
            disabled={isImageUploading || description === ""}
          >
            Post
            <LuSendHorizonal />
          </Button>
        </div>
      </div>
    </Modal>
  );
}
