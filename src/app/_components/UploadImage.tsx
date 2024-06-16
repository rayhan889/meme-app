"use client";

import { Button } from "~/components/ui/button";
import { useRouter } from "next/navigation";
import { useUploadThing } from "~/utils/uploadthing";
import { LuImage } from "react-icons/lu";

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

export default function UploadImage() {
  const { inputProps } = useUploadThingInputProps("imageUploader");

  return (
    <label
      htmlFor="upload-file"
      className="flex cursor-pointer items-center gap-x-2 text-white"
    >
      <LuImage className="h-6 w-6 text-primary" />
      <input type="file" id="upload-file" className="sr-only" {...inputProps} />
    </label>
  );
}
