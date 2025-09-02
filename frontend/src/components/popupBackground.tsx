import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { Card } from "./card";

export interface PopupBackgroundProps extends ComponentProps<"div"> {
  onClose: () => any;
  children?: ReactNode;
}

export const PopupBackground = ({
  onClose,
  children,
  className,
  ...props
}: PopupBackgroundProps) => {
  return (
    <div
      className={cn(
        "fixed z-100 w-screen h-screen left-0 top-0",
        "bg-neutral-800/25 backdrop-blur-xs",
        "flex justify-center items-center",
      )}
      onClick={onClose}
    >
      <Card
        className={cn(
          "relative w-11/12 max-w-3xl flex flex-col gap-4 p-8 bg-neutral-800",
          className,
        )}
        onClick={(e) => e.stopPropagation()}
        {...props}
      >
        {children}
        <X
          className={cn(
            "absolute top-8 right-8",
            "text-white cursor-pointer hover:opacity-50 transition-all",
          )}
          onClick={onClose}
        />
      </Card>
    </div>
  );
};
