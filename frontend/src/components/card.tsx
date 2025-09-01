import { cn } from "@/lib/utils";
import type { ComponentProps, ReactNode } from "react";

export interface CardProps extends ComponentProps<"div"> {
  children?: ReactNode;
}

export const Card = ({ children, className, ...props }: CardProps) => {
  return (
    <div
      className={cn(
        "p-4 border border-2 border-neutral-600 rounded-xl bg-neutral-600/20",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};
