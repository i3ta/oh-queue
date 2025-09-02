import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import type { ComponentProps } from "react";
import { Toaster as Sonner, type ToasterProps } from "sonner";
import { toast as sonnerToast } from "sonner";
import { Card } from "./card";
import { Text } from "./text";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className={cn("toaster group")}
      {...props}
    />
  );
};

const CustomToast = ({ children, onClick }: ComponentProps<"div">) => (
  <Card onClick={onClick}>
    <Text size="h2">{children}</Text>
  </Card>
);

export const toast = (message: string) => {
  sonnerToast.custom((id) => (
    <CustomToast onClick={() => sonnerToast.dismiss(id)}>{message}</CustomToast>
  ));
};

export { Toaster };
