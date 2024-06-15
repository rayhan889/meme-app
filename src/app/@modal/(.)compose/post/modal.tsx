"use client";

import { type ElementRef, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";
import { LuX } from "react-icons/lu";

export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const dialogRef = useRef<ElementRef<"dialog">>(null);

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
    }
  }, []);

  function onDismiss() {
    router.back();
  }

  return createPortal(
    <div className="absolute inset-0 z-50 flex bg-slate-500/35">
      <dialog
        ref={dialogRef}
        className="relative flex w-[80%] max-w-[500px] items-center justify-center rounded-lg bg-slate-950 p-6 text-white"
        onClose={onDismiss}
      >
        {children}
        <button
          onClick={onDismiss}
          className="absolute left-[10px] top-[10px] flex h-[48px] w-[48px] cursor-pointer items-center justify-center rounded-sm bg-transparent font-semibold hover:bg-slate-800"
        >
          <LuX />
        </button>
      </dialog>
    </div>,
    document.getElementById("modal-root")!,
  );
}
