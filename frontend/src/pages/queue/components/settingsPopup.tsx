import { GtidPopup } from "@/components/gtidPopup";
import { Input } from "@/components/input";
import { Label } from "@/components/label";
import { PopupBackground } from "@/components/popupBackground";
import { Switch } from "@/components/switch";
import { Text } from "@/components/text";
import { getUserType } from "@/lib/api/queue";
import type { SettingOption } from "@/types/settingOption";
import { useState, type MouseEvent } from "react";
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
        toast("You do not have permission to edit the settings.");
        handleClose();
      }
    } catch (err: any) {
      handleClose();
    }
  };

  const handleClose = (e?: MouseEvent<any>) => {
    e?.stopPropagation();
    setOpen(false);
    setUnlocked(false);
  };

  return (
    open &&
    (unlocked ? (
      <PopupBackground onClose={handleClose}>
        <Text size="h1" className="mb-4">
          Settings
        </Text>
        {options.map(({ type, id, value, setValue, label }) => (
          <div className="flex flex-row gap-4" key={id}>
            {type === "boolean" ? (
              <>
                <Switch id={id} checked={value} onCheckedChange={setValue} />
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
      </PopupBackground>
    ) : (
      <GtidPopup open={open} setOpen={setOpen} onSubmit={checkUnlock} />
    ))
  );
};
