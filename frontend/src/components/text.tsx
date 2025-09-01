import { cn } from "@/lib/utils";
import type { ComponentProps, ReactNode } from "react";

export interface TextProps extends ComponentProps<"p"> {
  children?: ReactNode;
  size?: "t1" | "t2" | "h1" | "h2" | "h3" | "p" | "c";
}

export const Text = ({
  children,
  size = "p",
  className,
  ...props
}: TextProps) => {
  const sizeClasses: Record<NonNullable<TextProps["size"]>, string> = {
    t1: "text-[64px] font-bold",
    t2: "text-[48px] font-bold",
    h1: "text-[32px] font-bold",
    h2: "text-[24px] font-bold",
    h3: "text-[20px] font-medium",
    p: "text-[16px] font-normal",
    c: "text-[12px] font-normal",
  };

  return (
    <div
      className={cn("font-mono text-white", sizeClasses[size], className)}
      {...props}
    >
      {children}
    </div>
  );
};
