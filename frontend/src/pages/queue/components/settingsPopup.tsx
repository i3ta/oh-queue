import { Card } from "@/components/card";
import { Input } from "@/components/input";
import { Label } from "@/components/label";
import { Switch } from "@/components/switch";
import { Text } from "@/components/text";
import { useScanner } from "@/hooks/useScanner";
import { getUserType } from "@/lib/api/queue";
import { cn } from "@/lib/utils";
import type { SettingOption } from "@/types/settingOption";
import { X } from "lucide-react";
import { useState, type MouseEventHandler } from "react";
import { toast } from "sonner";

export interface SettingsProps {
  open: boolean;
  setOpen: (val: boolean) => any;
  options: SettingOption[];
}

export const SettingsPopup = ({ open, setOpen, options }: SettingsProps) => {
  const [unlocked, setUnlocked] = useState(false);

  const checkUnlock = async (gtid: string) => {
    try {
      const type = await getUserType(gtid);
      if (type === "ta") {
        setUnlocked(true);
      } else {
        setOpen(false);
        toast("You do not have permission to edit the settings.");
      }
    } catch (err: any) {
      setOpen(false);
    }
  };

  useScanner(checkUnlock, open);

  const handleClose: MouseEventHandler = (e) => {
    e.stopPropagation();
    setOpen(false);
    setUnlocked(false);
  };

  return (
    open && (
      <div
        className={cn(
          "fixed z-100 w-screen h-screen left-0 top-0",
          "bg-neutral-800/25 backdrop-blur-xs",
          "flex justify-center items-center",
        )}
        onClick={handleClose}
      >
        <Card
          className="relative w-11/12 max-w-3xl flex flex-col gap-4 p-8 bg-neutral-800"
          onClick={(e) => e.stopPropagation()}
        >
          {unlocked ? (
            <>
              <Text size="h1" className="mb-4">
                Settings
              </Text>
              {options.map(({ type, id, value, setValue, label }) => (
                <div className="flex flex-row gap-4" key={id}>
                  {type === "boolean" ? (
                    <>
                      <Switch
                        id={id}
                        checked={value}
                        onCheckedChange={setValue}
                      />
                      <Label htmlFor={id}>
                        <Text>{label}</Text>
                      </Label>
                    </>
                  ) : type === "string" ? (
                    <>
                      <Input
                        type="text"
                        className="w-50"
                        id={id}
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                      />
                      <Label htmlFor={id}>
                        <Text>{label}</Text>
                      </Label>
                    </>
                  ) : (
                    <>
                      <Input
                        type="number"
                        className="w-50"
                        id={id}
                        value={value}
                        onChange={(e) => setValue(Number(e.target.value))}
                      />
                      <Label htmlFor={id}>
                        <Text>{label}</Text>
                      </Label>
                    </>
                  )}
                </div>
              ))}
            </>
          ) : (
            <>
              <Text>Scan your Buzzcard...</Text>
            </>
          )}
          <X
            className={cn(
              "absolute top-8 right-8",
              "text-white cursor-pointer hover:opacity-50 transition-all",
            )}
            onClick={handleClose}
          />
        </Card>
      </div>
    )
  );
};
